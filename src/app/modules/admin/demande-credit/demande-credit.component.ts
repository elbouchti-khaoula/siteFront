import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { Subject, catchError, takeUntil, throwError } from 'rxjs';
import { SimulationDetaillee } from 'app/core/projects/simulation-detaillee.types';
import { Piece } from 'app/core/common/common.types';
import { MatDialog } from '@angular/material/dialog';
import { ChangerAgenceComponent } from './changer-agence/changer-agence.component';
import { TableauAmortissementService } from '../tableau-amortissement/tableau-amortissement.service';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { SimulationDetailleeService } from 'app/core/projects/simulation-detaillee.service';

@Component({
  selector: 'demande-credit',
  templateUrl: './demande-credit.component.html',
  styleUrls: ['./demande-credit.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class DemandeCreditComponent implements OnInit, OnDestroy {

  openedCard: number = 1;
  drawerOpened: boolean = false;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  simulationResultat: any;

  @ViewChildren('fileInput') inputFiles: QueryList<ElementRef>;
  documents: any;
  pieceChanged: Subject<Piece> = new Subject<Piece>();
  pieces: Piece[] = [];
  estRempli: boolean = false;

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
  )
  {
    let data = this._router.getCurrentNavigation()?.extras?.state as SimulationDetaillee;
    if (data) {
      this.simulationResultat = data;
    }
    // else {
    //   this.simulationResultat = {
    //     "nom": "test1",
    //     "prenom": "test1",
    //     "telephone": "0522111111",
    //     "email": "test1@test1.com",
    //     "dateNaissance": "01/01/2000",
    //     "nationalite": "MA",
    //     "residantMaroc": true,
    //     "categorieSocioProfessionnelle": "SALA",
    //     "nomEmployeur": "Employeur",
    //     "salaire": "500 000.00",
    //     "autresRevenus": "200 000.00",
    //     "creditsEnCours": "3 000.00",
    //     "montant": "500 000.00",
    //     "objetFinancement": "ACQU",
    //     "montantProposition": "500 000.00",
    //     "duree": 240,
    //     "nomPromoteur": "Promoteur",
    //     "statutProjet": "active",
    //     "typeTaux": "FIXE",

    //     "id": 674335,
    //     "statut": "NPRO",
    //     "dossierId": 803757,
    //     "dossierMontant": "700 000.00",
    //     "dossierDuree": 240,
    //     "mensualite": "5 201.31",
    //     "tauxNominal": "5.450",
    //     "tauxEffectifGlobal": "6.457",
    //     "tauxParticipation": "0.000",
    //     "assurances": "39 231.82",
    //     "totalInterets": "509 082.58",
    //     "coutTotal": "587 546.22",
    //     "expertiseImmobiliere": "GRATUIT",
    //     "estExpImmoNum" : false,
    //     "fraisDossier": "770.00",
    //     "estFraisDossNum": true,
    //     "droitsEnregistrement": "20 000.00",
    //     "conservationFonciere": "7 700.00",
    //     "honorairesNotaire": "5 000.00",
    //     "fraisDivers": "1 500.00",
    //     "totalFrais": "34 200.00",
    //     "nbreAnnee": 20,
    //     "nbreMois": 0
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

        // Update the documents
        this.documents = response;

        Object.keys(this.documents).forEach(key => {
          // console.log(key);
          // console.log(this.documents[key]);
          for (var i = 0; i < this.documents[key].length; i++) {
            this.pieces.push({
              id: i + 1,
              libelle: this.documents[key][i],
              parent: 0,
              file: null,
              fileName: null
            })
          }
        });

        // Mark for check
        this._changeDetectorRef.markForCheck();
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
    this.drawerOpened = true;

    this._tableauAmortissementService.getTableauAmortissement(dossierId).subscribe();

    // Mark for check
    this._changeDetectorRef.markForCheck();
  }

  /**
   * Upload file to given piece
   *
   * @param piece
   * @param fileList
   */
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

    setTimeout(() => {
      this.updatePiecesRempli();
    }, 300);

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

    setTimeout(() => {
      this.updatePiecesRempli();
    }, 300);

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
                "name": "heroicons_outline:information-circle",
                "color": "success"
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

  private updatePiecesRempli() {
    this.estRempli = this.pieces.some(element => element.fileName !== undefined && element.fileName !== null && element.fileName !== '');
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
