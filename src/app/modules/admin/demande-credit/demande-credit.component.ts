import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { Subject, catchError, take, takeUntil, throwError } from 'rxjs';
import { SimulationDetaillee } from 'app/core/projects/simulation-detaillee.types';
import { Fichier, Piece } from 'app/core/common/common.types';
import { MatDialog } from '@angular/material/dialog';
import { ChangerAgenceComponent } from './changer-agence/changer-agence.component';
import { TableauAmortissementService } from '../tableau-amortissement/tableau-amortissement.service';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { SimulationDetailleeService } from 'app/core/projects/simulation-detaillee.service';
import { CompressImageService } from 'app/core/compress-image/compress-image.service';
import { TableauAmortissementComponent } from '../tableau-amortissement/tableau-amortissement.component';

@Component({
  selector: 'demande-credit',
  templateUrl: './demande-credit.component.html',
  styleUrls: ['./demande-credit.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class DemandeCreditComponent implements OnInit, OnDestroy {

  @ViewChild(TableauAmortissementComponent) tableauAmortissementComponent;
  openedCard: number = 1;
  drawerOpened: boolean = false;
  simulationResultat: any;

  @ViewChildren('fileInput') inputFiles: QueryList<ElementRef>;
  documents: any;
  pieces: Piece[] = [];
  existePieceAttachee: boolean = false;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  allowedTypesImg = ['image/jpeg', 'image/png'];
  allowedTypes = ['image/jpeg', 'image/png', 'text/plain', 'application/pdf',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

  /**
   * Constructor
   */
  constructor(
    private _router: Router,
    private _changeDetectorRef: ChangeDetectorRef,
    private _matDialog: MatDialog,
    private _simulationDetailleeService: SimulationDetailleeService,
    private _tableauAmortissementService: TableauAmortissementService,
    private _fuseConfirmationService: FuseConfirmationService,
    private _compressImageService: CompressImageService
  ) {
    let data = this._router.getCurrentNavigation()?.extras?.state as SimulationDetaillee;
    if (data) {
      this.simulationResultat = data;
    }
    // else {
    //   this.simulationResultat = {
    //     "nom": "TEST",
    //     "prenom": "TEST",
    //     "dateNaissance": "02/01/1990",
    //     "nationalite": "MAROCAINE",
    //     "residantMaroc": "Oui",
    //     "salaire": "300 000.00",
    //     "autresRevenus": 0,
    //     "segment": "NV",
    //     "creditsEnCours": "0.00",
    //     "nomEmployeur": "WAFA immobilier",
    //     "email": "a.kadmiri@outlook.fr",
    //     "telephone": "0612345678",
    //     "proprietaireMaroc": false,
    //     "capital": 0,
    //     "objetFinancement": "ACQUISITION",
    //     "nomPromoteur": "KETTANI IMMO",
    //     "typeTaux": "Valeur Fixe",
    //     "newSimulation": false,
    //     "id": 675141,
    //     "montant": "2 500 000.00",
    //     "montantProposition": "2 000 000.00",
    //     "duree": 240,
    //     "statut": "NPRO",
    //     "tauxNominalPondere": 2.409015,
    //     "tauxEffectifGlobalPondere": 3.0459165,
    //     "tauxAssurancePondere": 0.3959999999999999,
    //     "tauxInteretsClientTtc": 2.6499165,
    //     "dossiers": [
    //         {
    //             "id": 805628,
    //             "montant": "1 300 000.00",
    //             "duree": 240,
    //             "echeance": 7470.13,
    //             "tauxNominal": 2.7272,
    //             "tauxEffectifGlobal": "3.396",
    //             "tauxParticipation": "0.000",
    //             "fraisDossier": "GRATUIT",
    //             "assurances": "57 469.46",
    //             "totalInterets": "435 361.74",
    //             "coutTotal": "1 792 831.20",
    //             "mensualite": "7 470.13",
    //             "expertiseImmobiliere": "GRATUIT",
    //             "estExpImmoNum": false,
    //             "estFraisDossNum": false,
    //             "nbreAnnee": 20,
    //             "nbreMois": 0
    //         },
    //         {
    //             "id": 805627,
    //             "montant": "700 000.00",
    //             "duree": 240,
    //             "echeance": 3673.93,
    //             "tauxNominal": 1.8181,
    //             "tauxEffectifGlobal": "2.396",
    //             "tauxParticipation": "0.000",
    //             "fraisDossier": "GRATUIT",
    //             "assurances": "30 038.67",
    //             "totalInterets": "151 704.53",
    //             "coutTotal": "881 743.20",
    //             "mensualite": "3 673.93",
    //             "expertiseImmobiliere": "GRATUIT",
    //             "estExpImmoNum": false,
    //             "estFraisDossNum": false,
    //             "nbreAnnee": 20,
    //             "nbreMois": 0
    //         }
    //     ],
    //     "droitsEnregistrement": "100 000.00",
    //     "conservationFonciere": "37 500.00",
    //     "honorairesNotaire": "25 000.00",
    //     "fraisDivers": "1 500.00",
    //     "totalFrais": "164 000.00",
    //     "mensualite": "11 144.06",
    //     "tauxEffectifGlobal": "3.046"
    //   }
    // }
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  ngOnInit(): void {

    // Get the documents
    this._simulationDetailleeService.documents$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((response: any) => {

        let res = [];

        if (response && response.length > 0) {
          // Update the documents
          res = response;

          Object.keys(res).forEach(key => {
            for (var i = 0; i < res[key].length; i++) {
              if (res[key][i] !== 'PV de montage Agence' && !this.pieces.some(piece => piece.libelle === res[key][i])) {
                this.pieces.push({
                  id: i + 1,
                  libelle: res[key][i],
                  parent: 0,
                  files: []
                })
              }
            }
          });
        }

        this.documents = res;

        this._changeDetectorRef.detectChanges();
      });

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
   * Open agence dialog
   */
  openChangerAgenceDialog(): void {
    this._matDialog.open(ChangerAgenceComponent, {
      autoFocus: false,
      data: {
        simulationId: this.simulationResultat.id
      }
    });
  }

  /**
   * Open tableau amortissement
   */
  openTableauAmortissement(dossierId: number): void {
    this._tableauAmortissementService.getTableauAmortissement(dossierId).subscribe((result) => {

      if (result) {
        // console.log("+-+-+- result tableau", result);
        this.tableauAmortissementComponent.setTableauAmortissementData(result);

        setTimeout(() => {
          this.drawerOpened = true;
        }, 200);
      }

      // Mark for check
      this._changeDetectorRef.markForCheck();

    });
  }

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

    const file = fileList[0];

    // Return if the file is not allowed
    if (!this.allowedTypes.includes(file.type)) {

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

    if (this.allowedTypesImg.includes(file.type)) {
      
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

  containsImage(pieceIndex: number) : boolean {
    return this.pieces[pieceIndex].files.some(fich => fich.isImage);
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

      this.updatePiecesAttachees();

      // console.log("+-+-+- file", file);
      // console.log("+-+-+- this.pieces[pieceIndex].files", this.pieces[pieceIndex].files);

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

    this.updatePiecesAttachees();

    this._changeDetectorRef.detectChanges();
  }

  /**
   * transformer en demande de crédit
   */
  transformer(): void {

    this._simulationDetailleeService.transformer(this.simulationResultat.id)
      .pipe(
        catchError((error) => {

          // Throw an error
          return throwError(error);
        })
      )
      .subscribe((response) => {

        if (response.codeStatut === "DINS") {

          // Open the confirmation dialog
          const confirmation = this._fuseConfirmationService.open(
            {
              "title": "Demande de crédit",
              "message": "Votre demande de crédit à été validée avec succès",
              "icon": {
                "show": true,
                "name": "heroicons_outline:check-circle",
                "color": "success"
              },
              "actions": {
                "confirm": {
                  "show": true,
                  "label": "Ok",
                  "color": "primary"
                },
                "cancel": {
                  "show": false,
                  "label": "Cancel"
                }
              },
              "dismissible": false
            }
          );

          confirmation.afterClosed().subscribe((result) => {

            // If the confirm button pressed...
            if (result === 'confirmed') {
              setTimeout(() => {
                this._router.navigate(['/espace-connecte']);
              }, 200);
            }
          });
        }

      });


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

  private updatePiecesAttachees() {
    for (const piece of this.pieces) {
      this.existePieceAttachee = piece.files.some(fichier => fichier.fileName !== undefined && fichier.fileName !== null && fichier.fileName !== '');
      if (this.existePieceAttachee) {
        break;
      }
    }
  }

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
