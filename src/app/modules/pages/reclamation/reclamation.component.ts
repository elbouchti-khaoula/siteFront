import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { catchError, debounceTime, Observable, of, Subject, takeUntil, throwError } from 'rxjs';
// import { ReferentielService } from '../common/referentiel.service';
// import { Ville } from '../common/referentiel.types';
import { ReclamationsService } from './reclamation.service';
import { Motif } from './reclamation.types';
import { Piece } from 'app/core/common/common.types';

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

    motifs: Motif[];
    // villes: Ville[];
    isScreenSmall: boolean;
    alert: any;
    reclamationForm: FormGroup;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    piecesRef: any[] = [
        { id: 1, libelle: "Justificatif de règlement de mainlevée", parent: 226 },
        { id: 2, libelle: "Relevé ou Extrait de compte", parent: 291 },
        { id: 3, libelle: "Justificatif de remboursement", parent: 209 },
        { id: 4, libelle: "Extrait de compte", parent: 209 },
    ];

    piecesByMotif$: Observable<Piece[]>;
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

    requiredIfValidator(predicate): ValidatorFn {
        return (formControl => {
            if (!formControl.parent) {
                return null;
            }
            if (predicate()) {
                return Validators.required(formControl);
            }
            return null;
        })
    }

    /**
     * On init
     */
    ngOnInit(): void {
        // Create the reclamation form
        this.reclamationForm = this._formBuilder.group({
            motif           : ['', Validators.required],
            nom             : ['', this.requiredIfValidator(() => this.reclamationForm.get('motif').value !== -1)],
            prenom          : ['', this.requiredIfValidator(() => this.reclamationForm.get('motif').value !== -1)],
            cin             : ['', this.requiredIfValidator(() => this.reclamationForm.get('motif').value !== -1)],
            numeroDossier   : [''],
            email           : ['', [this.requiredIfValidator(() => this.reclamationForm.get('motif').value !== -1), Validators.email]],
            telephone       : ['', this.requiredIfValidator(() => this.reclamationForm.get('motif').value !== -1)],
            // codeVille    : ['', Validators.required],
            // adresse      : ['', Validators.required],
            text            : ['', Validators.required]
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

        // Get the motifs
        this._reclamationsService.motifs$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((response: Motif[]) => {

                // Update the motifs
                this.motifs = response;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Subscribe to media changes
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({ matchingAliases }) => {

                // Check if the screen is small
                this.isScreenSmall = !matchingAliases.includes('md');
            });

        // Subscribe to motif change
        this.reclamationForm.get('motif').valueChanges
            .pipe(
                debounceTime(100),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe((value) => {
                this.piecesByMotif$ = of(this.piecesRef.filter(e => e.parent === value).map(e => { return { ...e, file: null, fileName: null } }));
                this.reclamationForm.get('nom').updateValueAndValidity();
                this.reclamationForm.get('prenom').updateValueAndValidity();
                this.reclamationForm.get('cin').updateValueAndValidity();
                this.reclamationForm.get('email').updateValueAndValidity();
                this.reclamationForm.get('telephone').updateValueAndValidity();
            });

        this.pieceChanged
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(300),
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

    }

    deletePiece(piece: Piece, index: number): void {
        piece.fileName = null;
        piece.file = null;

        // Update the piece
        this.pieceChanged.next(piece);
        
        const id = 'file-input' + index;
        this.inputFiles.map(e => {
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
        this._reclamationsService.createReclamationEtStatut(
            {
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
            }
        ).pipe(
            // Error here means the requested is not available
            catchError((error: HttpErrorResponse) => {
                // Log the error
                console.error(error);

                if (error.status === 500) {
                    this._router.navigateByUrl('/500-server-error');
                } else if (error.status === 404) {
                    this._router.navigateByUrl('/404-not-found');
                } else {
                    // + error.error?.errors[0].field + ' : ' + error.error?.errors[0].defaultMessage
                    this._showAlertMessage('error', 'Erreur champ de saisie');
                }

                // Throw an error
                return throwError(error);
            }))
            .subscribe((response) => {
                this._showAlertMessage(
                    'success', 
                    'Nous avons bien reçu votre message. Nous le traiterons dans les plus bref délais'
                );
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
