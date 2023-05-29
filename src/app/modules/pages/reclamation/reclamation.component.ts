import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { catchError, debounceTime, Subject, take, takeUntil, throwError } from 'rxjs';
import { ReclamationsService } from './reclamation.service';
import { Motif } from './reclamation.types';
import { Fichier, Piece } from 'app/core/common/common.types';
import { CompressImageService } from 'app/core/compress-image/compress-image.service';
import { FuseConfirmationService } from '@fuse/services/confirmation';

@Component({
    selector: 'reclamation',
    templateUrl: './reclamation.component.html',
    styleUrls: ['./reclamation.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ReclamationComponent implements OnInit {
    @ViewChild('reclamationNgForm') reclamationNgForm: NgForm;
    @ViewChildren('fileInput') inputFiles: QueryList<ElementRef>;
    isCaptchaValid: boolean = false;
    isScreenSmall: boolean;
    alert: any;
    reclamationForm: FormGroup;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    isAsterixVisible: boolean = true;
    motifs: Motif[];
    piecesRef: any[] = [
        { id: 1, libelle: "Justificatif de règlement de mainlevée", parent: 226 },
        { id: 2, libelle: "Relevé ou Extrait de compte", parent: 291 },
        { id: 3, libelle: "Justificatif de remboursement", parent: 209 },
        { id: 4, libelle: "Extrait de compte", parent: 209 },
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
        private _fuseConfirmationService: FuseConfirmationService,
        private _compressImageService: CompressImageService
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
            text            : ['', Validators.required]
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
                this.pieces = [...this.piecesRef.filter(e => e.parent === value).map(e => { return { ...e, files: [] } })];
                this.reclamationForm.get('nom').updateValueAndValidity();
                this.reclamationForm.get('prenom').updateValueAndValidity();
                this.reclamationForm.get('cin').updateValueAndValidity();
                this.reclamationForm.get('email').updateValueAndValidity();
                this.reclamationForm.get('telephone').updateValueAndValidity();

                this.isAsterixVisible = value !== -1;
            });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Upload file to given piece
     *
     * @param piece
     * @param event
     */
    uploadPiece(pieceIndex: number, event: any): void {

        var fileList: FileList = event.target.files;
        
        // Return if canceled
        if (!fileList.length) {
            return;
        }

        const allowedTypesImg = ['image/jpeg', 'image/png'];

        const allowedTypes = ['image/jpeg', 'image/png', 'text/plain', 'application/pdf',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        const file = fileList[0];

        // Return if the file is not allowed
        if (!allowedTypes.includes(file.type)) {

            // Open the dialog
            this._fuseConfirmationService.open(
                {
                    "title": "Joindre fichier",
                    "message": "Le type de fichier est incorrect",
                    "icon": {
                        "show": true,
                        "name": "heroicons_outline:information-circle",
                        "color": "warn"
                    },
                    "actions": {
                        "confirm": {
                            "show": true,
                            "label": "Ok",
                            "color": "warn"
                        },
                        "cancel": {
                            "show": false,
                            "label": "Cancel"
                        }
                    },
                    "dismissible": false
                }
            );

            return;
        }

        // Return if the file is big
        if (file.size > 5242880) {

            // Open the dialog
            this._fuseConfirmationService.open(
                {
                    "title": "Joindre fichier",
                    "message": "Le fichier est volumineux",
                    "icon": {
                        "show": true,
                        "name": "heroicons_outline:information-circle",
                        "color": "warn"
                    },
                    "actions": {
                        "confirm": {
                            "show": true,
                            "label": "Ok",
                            "color": "warn"
                        },
                        "cancel": {
                            "show": false,
                            "label": "Cancel"
                        }
                    },
                    "dismissible": false
                }
            );

            return;
        }

        if (allowedTypesImg.includes(file.type) && file.size > 1048576) {
            // console.log(`+-+- Image size before compressed: ${file.size} bytes.`)

            this._compressImageService.compress(file)
                .pipe(take(1))
                .subscribe((compressedImageFile: File) => {
                    // console.log(`Image size after compressed: ${compressedImageFile.size} bytes.`);

                    // upload the compressed image
                    this.addFileToPiece(compressedImageFile, pieceIndex, true);

                });

        } else {
            // upload the file
            this.addFileToPiece(file, pieceIndex, false);
        }

    }

    addFileToPiece(file: File, pieceIndex: number, estImage: boolean) {

        this._readAsDataURL(file).then((data) => {

            // Add the file to piece
            this.pieces[pieceIndex].files.push({
                fileIndex: this.pieces[pieceIndex].files.length,
                fileName: file.name,
                fileExtension: file.name,
                isImage: estImage,
                fileContent: data,
                size: file.size
            });

            this._changeDetectorRef.detectChanges();
        });

    }

    deleteFileFromPiece(fichier: Fichier, pieceIndex: number): void {
        this.pieces[pieceIndex].files = this.pieces[pieceIndex].files.filter((x) => x != fichier);

        const id = 'fileInput_' + pieceIndex;
        for (const element of this.inputFiles) {
            if (element.nativeElement.id === id) {
                element.nativeElement.value = null;
                element.nativeElement.files = null;
                break;
            }
        }

        this._changeDetectorRef.detectChanges();
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

        // Hide it after 7 seconds
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
