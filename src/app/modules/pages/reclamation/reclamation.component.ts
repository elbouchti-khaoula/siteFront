import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { catchError, debounceTime, Observable, of, Subject, takeUntil, throwError } from 'rxjs';
// import { ReferentielService } from '../common/referentiel.service';
// import { Ville } from '../common/referentiel.types';
import { ReclamationsService } from './reclamation.service';
import { Piece } from './reclamation.types';

@Component({
    selector: 'reclamation',
    templateUrl: './reclamation.component.html',
    styleUrls: ['./reclamation.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReclamationComponent implements OnInit {
    @ViewChild('reclamationNgForm') reclamationNgForm: NgForm;
    @ViewChildren('fileInput') inputFiles: QueryList<ElementRef>;

    // villes: Ville[];
    isScreenSmall: boolean;
    alert: any;
    reclamationForm: FormGroup;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    objetsReclamation: any[] = [
        { id: 1, libelle: "Contestation Délai: Décision Crédit" },
        { id: 2, libelle: "Contestation Délai: Déblocage / réception chèque" },
        { id: 3, libelle: "Contestation Délai: Mainlevée" },
        { id: 4, libelle: "Contestation Délai: Restitution solde" },
        { id: 5, libelle: "Contestation Prélèvement: Sur le compte" },
        { id: 6, libelle: "Contestation Prélèvement: à la source (sur salaire)" },
        { id: 7, libelle: "Contestation Prélèvement: Post remboursement anticipé (total ou partiel)" },
        { id: 8, libelle: "Contestation Prélèvement: non mise à jour du solde" },
    ];

    piecesRef: any[] = [
        { id: 1, libelle: "N° AFFAIRE ou N° CNIE", parent: 1 },
        { id: 2, libelle: "N° AFFAIRE ou N° CNIE", parent: 2 },
        { id: 3, libelle: "N° AFFAIRE ou N° CNIE", parent: 3 },
        { id: 4, libelle: "Justificatif de règlement des frais de mainlevée", parent: 3 },
        { id: 5, libelle: "Relevé ou Extrait de compte", parent: 4 },
        { id: 6, libelle: "Relevé ou Extrait de compte", parent: 5 },
        { id: 7, libelle: "Relevé ou Extrait de compte", parent: 6 },
        { id: 8, libelle: "Justificatif de remboursement", parent: 7 },
        { id: 9, libelle: "Extrait de compte", parent: 7 },
        { id: 10, libelle: "N° AFFAIRE ou N° CNIE", parent: 8 },
    ];

    // piecesByObjet: Piece[];
    piecesByObjet$: Observable<Piece[]>;
    pieceChanged: Subject<Piece> = new Subject<Piece>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder,
        // private _referentielService: ReferentielService,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _reclamationsService: ReclamationsService,
        private _router: Router
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Create the reclamation form
        this.reclamationForm = this._formBuilder.group({
            nom: ['', Validators.required],
            prenom: ['', Validators.required],
            cin: ['', Validators.required],
            numeroDossier: [''],
            email: ['', [Validators.required, Validators.email]],
            telephone: ['', Validators.required],
            // codeVille    : ['', Validators.required],
            // adresse      : ['', Validators.required],
            motif: ['', Validators.required],
            text: ['', Validators.required]
        });

        // // Get the villes
        // this._referentielService.villes$
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe((response: Ville[]) => {

        //         // Update the villes
        //         this.villes = response;

        //         // Mark for check
        //         this._changeDetectorRef.markForCheck();
        //     });

        // Subscribe to media changes
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({ matchingAliases }) => {

                // Check if the screen is small
                this.isScreenSmall = !matchingAliases.includes('md');
            });

        this.reclamationForm.get('motif').valueChanges
            .pipe(
                debounceTime(100),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe((value) => {
                this.piecesByObjet$ = of(this.piecesRef.filter(e => e.parent === value));
            });

        // Subscribe to note updates
        this.pieceChanged
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(500),
                // switchMap(note => this._notesService.updateNote(note))
            )
            .subscribe(() => {

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Upload file to given piece
     *
     * @param piece
     * @param fileList
     */
    // #imageFileInput
    uploadPiece(piece: Piece, fileList: FileList): void {

        // Return if canceled
        if (!fileList.length) {
            return;
        }

        const allowedTypes = ['image/jpeg', 'image/png'];
        const file = fileList[0];

        // Return if the file is not allowed
        if (!allowedTypes.includes(file.type)) {
            return;
        }

        this._readAsDataURL(file).then((data) => {

            // Update the file
            piece.fileName = file.name;
            piece.file = data;

            // Update the piece
            this.pieceChanged.next(piece);
        });

        // console.log("+-+-+- piece", piece);
    }

    deletePiece(piece: Piece, index: number): void {
        piece.fileName = null;
        piece.file = null;

        // Update the piece
        this.pieceChanged.next(piece);
        
        const id = 'file-input' + index;
        this.inputFiles.map (e => {
            if (e.nativeElement.id === id) {
                e.nativeElement.value = null;
                e.nativeElement.files = null;
            }
        });
    }

    /**
     * Clear the form
     */
    clearForm(): void {
        // Reset the form
        this.reclamationNgForm.resetForm();
    }

    /**
     * Send the form
     */
    sendForm(): void {
        this._reclamationsService.createReclamationEtStatut({
            nom: this.reclamationForm.get('nom').value,
            prenom: this.reclamationForm.get('prenom').value,
            cin: this.reclamationForm.get('cin').value,
            numeroDossier: this.reclamationForm.get('numeroDossier').value,
            email: this.reclamationForm.get('email').value,
            telephone: this.reclamationForm.get('telephone').value,
            motif: this.reclamationForm.get('motif').value,
            // adresse: this.reclamationForm.get('adresse').value,
            // ville: this.villes?.length > 0 ? this.villes?.find((e) => e.codeVille == this.reclamationForm.get('codeVille').value)?.description : "",
            text: this.reclamationForm.get('text').value,
            statut: 'publié',
            canal: 7,
            initiateur: 'siteweb',
            dateReception: new Date()
        })
            .pipe(
                // Error here means the requested is not available
                catchError((error: HttpErrorResponse) => {
                    // Log the error
                    console.error(error);

                    if (error.status === 500) {
                        this._router.navigateByUrl('/500-server-error');
                    } else if (error.status === 404) {
                        this._router.navigateByUrl('/404-not-found');
                    } else {
                        this._showAlertMessage('error', 'Erreur champ ' + error.error?.errors[0].field + ' : ' + error.error?.errors[0].defaultMessage);
                    }

                    // Throw an error
                    return throwError(error);
                }))
            .subscribe((response) => {
                this._showAlertMessage('success', 'Votre demande sera traitée et notre équipe vous reviendra dans les 24 heures');
            });

        // Clear the form
        this.clearForm();
    }

    /**
     * Show Alert message
     */
    _showAlertMessage(typeP: string, msgP: string): void {
        // Show the message
        this.alert = {
            type: typeP,
            message: msgP
        };

        // Mark for check
        this._changeDetectorRef.markForCheck();

        // Hide it after 3 seconds
        setTimeout(() => {

            this.alert = null;

            // Mark for check
            this._changeDetectorRef.markForCheck();
        }, 7000);
    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Read the given file for demonstration purposes
     *
     * @param file
     */
    private _readAsDataURL(file: File): Promise<any> {
        // Return a new promise
        return new Promise((resolve, reject) => {

            // Create a new reader
            const reader = new FileReader();

            // Resolve the promise on success
            reader.onload = (): void => {
                resolve(reader.result);
            };

            // Reject the promise on error
            reader.onerror = (e): void => {
                reject(e);
            };

            // Read the file as the
            reader.readAsDataURL(file);
        });
    }

}
