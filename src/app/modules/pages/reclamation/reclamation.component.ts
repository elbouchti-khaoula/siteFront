import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { catchError, debounceTime, Subject, takeUntil, throwError } from 'rxjs';
import { ReclamationsService } from './reclamation.service';
import { Motif, Reclamation } from './reclamation.types';
import { Piece } from 'app/core/services/upload-document/upload-document.types';
import { UploadDocumentService } from 'app/core/services/upload-document/upload-document.service';
import { AuthenticationService } from 'app/core/auth/authentication.service';
import { ReferentielService } from 'app/core/services/referentiel/referentiel.service';

@Component({
    selector: 'reclamation',
    templateUrl: './reclamation.component.html',
    styleUrls: ['./reclamation.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ReclamationComponent implements OnInit, OnDestroy {

    @ViewChild('reclamationTag', { read: ElementRef }) public reclamationTag: ElementRef<any>;
    @ViewChild('reclamationNgForm') reclamationNgForm: NgForm;

    isCaptchaValid: boolean = false;
    isScreenSmall: boolean;
    alert: any;
    reclamationForm: FormGroup;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    notAlerteEthique: boolean = true;
    selectedMotifLabel: string;
    motifs: Motif[];
    piecesRef: any[] = [
        { libelleDocument: "Justificatif de règlement de mainlevée", parent: 226 },
        { libelleDocument: "Relevé ou Extrait de compte", parent: 291 },
        { libelleDocument: "Justificatif de remboursement", parent: 209 },
        { libelleDocument: "Extrait de compte", parent: 209 },
    ];
    pieces: Piece[] = [];

    /**
     * Constructor
     */
    constructor(
        private _router: Router,
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _reclamationsService: ReclamationsService,
        private _referentielService: ReferentielService,
        private _uploadDocumentService: UploadDocumentService,
        private _authenticationService: AuthenticationService
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
            motif       : ['', Validators.required],
            nom         : ['', this.requiredIfValidator(() => this.reclamationForm.get('motif').value !== -1)],
            prenom      : ['', this.requiredIfValidator(() => this.reclamationForm.get('motif').value !== -1)],
            cin         : ['', this.requiredIfValidator(() => this.reclamationForm.get('motif').value !== -1)],
            // numeroDossier   : [''],
            email       : ['', [this.requiredIfValidator(() => this.reclamationForm.get('motif').value !== -1), Validators.email]],
            telephone   : ['', this.requiredIfValidator(() => this.reclamationForm.get('motif').value !== -1)],
            text        : ['', Validators.required],
            bonneFoi    : ['', [this.requiredIfValidator(() => this.reclamationForm.get('motif').value === -1)]],
        });

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
                this.selectedMotifLabel = this.motifs?.find(e => e.id === value)?.libelleselfcare;
                this.pieces = [...this.piecesRef.filter(e => e.parent === value).map(e => { return { ...e, listFilesArray: [] } })];
                this.reclamationForm.get('nom').updateValueAndValidity();
                this.reclamationForm.get('prenom').updateValueAndValidity();
                this.reclamationForm.get('cin').updateValueAndValidity();
                this.reclamationForm.get('email').updateValueAndValidity();
                this.reclamationForm.get('telephone').updateValueAndValidity();
                this.reclamationForm.get('bonneFoi').updateValueAndValidity();

                this.notAlerteEthique = value !== -1;
            });

        this._initInfosConnectedUser();
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

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
        var telephonbeReplace = this.reclamationForm.get('telephone').value.replace(/-/g, '').substring(0, 10);

        this._reclamationsService.createReclamationEtStatut(
            this.notAlerteEthique ?
                {
                    nom: this.reclamationForm.get('nom').value,
                    prenom: this.reclamationForm.get('prenom').value,
                    cin: this.reclamationForm.get('cin').value,
                    email: this.reclamationForm.get('email').value,
                    telephone: telephonbeReplace,
                    motif: this.reclamationForm.get('motif').value,
                    motifLibelle: this.selectedMotifLabel,
                    text: this.reclamationForm.get('text').value,
                    commentaire: this.reclamationForm.get('text').value,
                    statut: 'publié',
                    canal: 7,
                    initiateur: 'siteweb',
                    dateReception: new Date(),
                    type: "Reclamation"
                }
                :
                {
                    nom: this.reclamationForm.get('nom').value,
                    prenom: this.reclamationForm.get('prenom').value,
                    cin: this.reclamationForm.get('cin').value,
                    email: this.reclamationForm.get('email').value,
                    telephone: telephonbeReplace,
                    text: this.reclamationForm.get('text').value,
                    dateReception: new Date(),
                    type: "AlerteEthique"
                }
        )
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
                        // + error.error?.errors[0].field + ' : ' + error.error?.errors[0].defaultMessage
                        this._showAlertMessage('error', 'Erreur champ de saisie');
                    }

                    // Throw an error
                    return throwError(() => error);
                }))
            .subscribe((response: Reclamation) => {

                if (response && response.id) {

                    // Send Mail : accusé de réception au client
                    this._referentielService.sendMailReclamation(response)
                        .pipe(
                            catchError((error) => {
                                // Log the error
                                console.error("+-+-+-+ Envoi mail accusé réception réclamation error", error);
                                // Throw an error
                                return throwError(() => error);
                            }))
                        .subscribe((response) => {
                            console.log("+-+-+- Envoi mail accusé réception réclamation success", response);
                        });

                    // Upload documents
                    this.uploadCheckList(response.id);

                    this._showAlertMessage(
                        'success',
                        'Votre réclamation est enregistrée avec succès, nous vous contacterons dans les plus brefs délais'
                    );

                    // Reset the element's scroll position to the top
                    this.reclamationTag.nativeElement.scrollTo({
                        top: 0,
                        behavior: 'smooth',
                    });

                    // Clear the form
                    this.clearForm();
                }

            });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ private methods
    // -----------------------------------------------------------------------------------------------------

    private uploadCheckList(reclamationId: number) {

        this.pieces.forEach((piece, index) => {
            piece = {
                idReclamation: reclamationId,
                libelleDocument: piece.libelleDocument,
                listFilesArray:
                    [...piece.listFilesArray.map(e => {
                        return {
                            nom: e.nom,
                            extension: e.extension,
                            binaire: e.binaire,
                            ordre: e.ordre
                        }
                    })]
            }

            // console.log("+-+-+- piece index", piece, index);

            if (piece.listFilesArray.length > 0) {

                this._uploadDocumentService.uploadPiecesReclamation(piece)
                    .pipe(
                        catchError((error) => {
                            // Log the error
                            console.error("+-+-+-+ GRC document error", error);
                            // Throw an error
                            return throwError(() => error);
                        }))
                    .subscribe((response) => {
                        console.log("+-+-+- GRC document success", response);
                    });

            }
        });

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

        // Hide it after 10 seconds
        setTimeout(() => {

            this.alert = null;

            // Mark for check
            this._changeDetectorRef.markForCheck();
        }, 10000);
    }

    private _initInfosConnectedUser() {
        let currentUser = this._authenticationService.connectedUser;

        if (currentUser?.email) {
            this.reclamationForm.get('email').setValue(currentUser?.email);
        }

        if (currentUser?.lastName) {
            this.reclamationForm.get('nom').setValue(currentUser?.lastName);
        }

        if (currentUser?.firstName) {
            this.reclamationForm.get('prenom').setValue(currentUser?.firstName);
        }

        if (currentUser?.telephone) {
            this.reclamationForm.get('telephone').setValue(currentUser?.telephone);
        }

        if (currentUser?.cin) {
            this.reclamationForm.get('cin').setValue(currentUser?.cin);
        }

        this._changeDetectorRef.detectChanges();
    }

}
