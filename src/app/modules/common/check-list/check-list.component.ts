import { ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, OnInit, QueryList, ViewChildren, ViewEncapsulation } from '@angular/core';
import { Fichier, Piece } from 'app/core/upload-document/upload-document.types';
import { CompressImageService } from '@fuse/services/compress-image/compress-image.service';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { take } from 'rxjs';

@Component({
    selector: 'check-list',
    templateUrl: './check-list.component.html',
    encapsulation: ViewEncapsulation.None
})
export class CheckListComponent implements OnInit, OnDestroy {

    @ViewChildren('fileInput') inputFiles: QueryList<ElementRef>;
    @Input() pieces: Piece[] = [];
    existePieceAttachee: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseConfirmationService: FuseConfirmationService,
        private _compressImageService: CompressImageService
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
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
        const allowedTypesImg = ['image/jpeg', 'image/png'];
        const allowedTypes = ['image/jpeg', 'image/png', 'text/plain', 'application/pdf',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

        var fileList: FileList = event.target.files;
        // Return if canceled
        if (!fileList.length) {
            return;
        }

        const file: File = fileList[0];

        if (this.existeFileInPiece(file)) {

            // Open the dialog
            this._fuseConfirmationService.open(
                {
                    "title": "Joindre fichier",
                    "message": "Le fichier existe déjà dans la liste des pièces jointes",
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

        var estImage = allowedTypesImg.includes(file.type);

        if (this.pieces[pieceIndex].listFilesArray.length > 0 && !estImage && this.containsImage(pieceIndex)) {

            // Open the dialog
            this._fuseConfirmationService.open(
                {
                    "title": "Joindre fichier",
                    "message": "La liste doit contenir soit une liste d'images, soit un seul fichier de type pdf ou word ou excel",
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
        } else if (this.pieces[pieceIndex].listFilesArray.length > 0 && !this.containsImage(pieceIndex)) {

            // Open the dialog
            this._fuseConfirmationService.open(
                {
                    "title": "Joindre fichier",
                    "message": "Un seul fichier est autorisé, autre que image",
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

        if (estImage) {

            if (file.size > 1048576) {
                console.log(`+-+- Image size before compressed: ${file.size} bytes.`)

                this._compressImageService.compress(file)
                    .pipe(take(1))
                    .subscribe((compressedImageFile: File) => {
                        console.log(`Image size after compressed: ${compressedImageFile.size} bytes.`);

                        // upload the compressed image
                        this.addFileToPiece(compressedImageFile, pieceIndex, true);

                    });
            } else {
                // upload the image without compressing
                this.addFileToPiece(file, pieceIndex, true);
            }

        } else {
            // upload the file
            this.addFileToPiece(file, pieceIndex, false);
        }

    }

    deleteFileFromPiece(fichier: Fichier, pieceIndex: number): void {
        this.pieces[pieceIndex].listFilesArray = this.pieces[pieceIndex].listFilesArray.filter((x) => x != fichier);

        const id = 'fileInput_' + pieceIndex;
        for (const element of this.inputFiles) {
            if (element.nativeElement.id === id) {
                element.nativeElement.value = null;
                element.nativeElement.files = null;
                break;
            }
        }

        this.existePieceRempli();

        this._changeDetectorRef.detectChanges();
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

    private containsImage(pieceIndex: number): boolean {
        return this.pieces[pieceIndex].listFilesArray.some(fich => fich.isImage);
    }

    private existeFileInPiece(file: File): boolean {
        var exist: boolean = false;
        for (const piece of this.pieces) {
            exist = piece.listFilesArray.some(x => x.nom == file.name && x.extension == file.type)
            if (exist) {
                return true;
            }
        }
        return false;
    }

    private addFileToPiece(file: File, pieceIndex: number, estImage: boolean) {
        
        this._readAsDataURL(file).then((data) => {

            var strArray = data.split(',');
            // Add the file to piece
            this.pieces[pieceIndex].listFilesArray.push({
                ordre: this.pieces[pieceIndex].listFilesArray.length + 1,
                nom: file.name,
                extension: file.type,
                binaire: strArray[1],
                data: data,
                isImage: estImage,
                size: file.size
            });

            this.existePieceRempli();

            // console.log("+-+-+- file", file);
            // console.log("+-+-+- this.pieces[pieceIndex].listFilesArray", this.pieces[pieceIndex].listFilesArray);

            this._changeDetectorRef.detectChanges();
        });

    }

    /**
     * Read the given file
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

    private existePieceRempli() {
        for (const piece of this.pieces) {
            this.existePieceAttachee = piece.listFilesArray.some(fichier => fichier.nom !== undefined && fichier.nom !== null && fichier.nom !== '');
            if (this.existePieceAttachee) {
                break;
            }
        }
    }

}
