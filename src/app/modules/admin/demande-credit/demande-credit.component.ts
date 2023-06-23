import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { Subject, catchError, takeUntil, throwError } from 'rxjs';
import { SimulationDetaillee } from 'app/core/services/projects/projects.types';
import { Piece } from 'app/core/services/upload-document/upload-document.types';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ChangerAgenceComponent } from './changer-agence/changer-agence.component';
import { TableauAmortissementService } from '../tableau-amortissement/tableau-amortissement.service';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { STATUT_DEMANDE_CREDIT, SimulationDetailleeService } from 'app/core/services/projects/projects.service';
import { TableauAmortissementComponent } from '../tableau-amortissement/tableau-amortissement.component';
import { Agence } from 'app/core/services/referentiel/referentiel.types';
import { CheckListComponent } from 'app/modules/common/check-list/check-list.component';
import { UploadDocumentService } from 'app/core/services/upload-document/upload-document.service';

@Component({
  selector: 'demande-credit',
  templateUrl: './demande-credit.component.html',
  styleUrls: ['./demande-credit.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class DemandeCreditComponent implements OnInit, OnDestroy {

  @ViewChild(TableauAmortissementComponent) tableauAmortissementComponent: TableauAmortissementComponent;
  @ViewChild(CheckListComponent) checkList: CheckListComponent;
  openedCard: number = 1;
  drawerOpened: boolean = false;
  simulationResultat: any;

  isCaptchaValid: boolean = false;
  
  documents: [] = [];
  pieces: Piece[] = [];
  agreements: boolean;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

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
    private _uploadDocumentService: UploadDocumentService
  ) {
    let agences: Agence[] = JSON.parse(localStorage.getItem('agences'));
    let data = this._router.getCurrentNavigation()?.extras?.state as SimulationDetaillee;
    if (data) {
      this.simulationResultat = {
        ...data,
        nomAgence: agences?.find(e => e.code == data.codeApporteur)?.nom
      };
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
    //     "estConsultation": true,
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

        if (response) {
          // Update the documents
          this.documents = response;

          for (var i = 0; i < this.documents.length; i++) {
            this.pieces.push({
              libelleDocument: this.documents[i],
              listFilesArray: []
            })
          }
        }

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
    let changerAgenceDialogRef: MatDialogRef<ChangerAgenceComponent> = this._matDialog.open(ChangerAgenceComponent, {
      autoFocus: false,
      data: {
        projectId: this.simulationResultat.id
      }
    });

    changerAgenceDialogRef.afterClosed()
      .subscribe((response: Agence) => {
        this.simulationResultat = {
          ...this.simulationResultat,
          codeApporteur: response?.code,
          nomAgence: response?.nom
        };
      })
  }

  /**
   * Open tableau amortissement
   */
  openTableauAmortissement(dossierId: number): void {
    this._tableauAmortissementService.getTableauAmortissement(dossierId).subscribe((result) => {

      if (result) {
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
   * transformer en demande de crédit
   */
  transformer(): void {

    this._simulationDetailleeService.transformer(this.simulationResultat.id)
      .pipe(
        catchError((error) => {

          // Throw an error
          return throwError(() => error);
        })
      )
      .subscribe((response) => {

        if (response.codeStatut === STATUT_DEMANDE_CREDIT) {

          this.uploadCheckList();

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
                this._router.navigate(['/espace-connecte/mes-demandes-credit']);
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
  // @ private methods
  // -----------------------------------------------------------------------------------------------------
  
  private uploadCheckList() {
    this.pieces.forEach((piece, index) => {
      piece = {
        id_projet: this.simulationResultat.id,
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

        this._uploadDocumentService.uploadPiecesDemandesCredit(piece)
          .pipe(
            catchError((error) => {
              // Log the error
              console.error("+-+-+-+ demande crédit document error", error);
              // Throw an error
              return throwError(() => error);
            }))
          .subscribe((response) => {
            console.log("+-+-+- demande crédit document success", response);
          });

      }

    });
  }

}
