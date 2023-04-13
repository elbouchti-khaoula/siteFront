import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { Subject, takeUntil } from 'rxjs';
import { SimulationDetaillee } from '../simulation-detaillee/simulation-detaillee.types';
import { Piece } from 'app/core/common/common.types';
import { MatDialog } from '@angular/material/dialog';
import { ChangerAgenceComponent } from './changer-agence/changer-agence.component';
import { DemandeCreditService } from './demande-credit.service';
import { TableauAmortissementService } from '../tableau-amortissement/tableau-amortissement.service';

@Component({
  selector: 'demande-credit',
  templateUrl: './demande-credit.component.html',
  styleUrls: ['./demande-credit.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class DemandeCreditComponent implements OnInit, OnDestroy {

  drawerOpened: boolean = false;

  @ViewChildren('fileInput') inputFiles: QueryList<ElementRef>;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  demandeForm: UntypedFormGroup;
  // simulationResultat: SimulationDetaillee;
  recapitulatif : any;
  estExpImmoNum: boolean = true;
  estFraisDossNum: boolean = true;

  documents: any;
  pieceChanged: Subject<Piece> = new Subject<Piece>();
  pieces: Piece[] = [];

  /**
   * Constructor
   */
  constructor(
    private _router: Router,
    private _changeDetectorRef: ChangeDetectorRef,
    private _formBuilder: UntypedFormBuilder,
    private _matDialog: MatDialog,
    private _demandeCreditService: DemandeCreditService,
    private _tableauAmortissementService: TableauAmortissementService
  ) {
    let data = this._router.getCurrentNavigation()?.extras?.state as SimulationDetaillee;
    if (data) {
      this.recapitulatif = data;
    } else {
      this.recapitulatif = {
        "nom": "test1",
        "prenom": "test1",
        "telephone": "0522111111",
        "email": "test1@test1.com",
        "dateNaissance": "01/01/2000",
        "nationalite": "MA",
        "residantMaroc": "true",
        "categorieSocioProfessionnelle": "SALA",
        "nomEmployeur": "Employeur",
        "salaire": 500000,
        "autresRevenus": 200000,
        "creditsEnCours": 3000,
        "montant": 500000,
        "objetFinancement": "ACQU",
        "montantProposition": 500000,
        "duree": 240,
        "nomPromoteur": "Promoteur",
        "statutProjet": "active",
        "typeTaux": "FIXE",
        "id": 674335,
        "statut": "NPRO",
        "dossierId": 803757,
        "dossierMontant": 700000,
        "dossierDuree": 240,
        "mensualite": 5201.31,
        "tauxNominal": 5.45,
        "tauxEffectifGlobal": 6.457,
        "tauxParticipation": 0,
        "assurances": 39231.82,
        "totalInterets": 509082.58,
        "coutTotal": 587546.22,
        "fraisDossier": 770,
        "expertiseImmobiliere": 0,
        "droitsEnregistrement": 20000,
        "conservationFonciere": 7700,
        "honorairesNotaire": 5000,
        "fraisDivers": 1500,
        "totalFrais": 34200,
        "nbreAnnee": 20,
        "nbreMois": 0
    }
      // this.simulationResultat = {
      //   "id": 674266,
      //   "montant": 500000,
      //   "montantProposition": 500000,
      //   "duree": 240,
      //   "statut": "NPRO",
      //   "dossierId": 803618,
      //   "dossierMontant": 700000,
      //   "dossierDuree": 240,
      //   "mensualite": 5201.31,
      //   "tauxNominal": 5.45,
      //   "tauxEffectifGlobal": 6.457,
      //   "tauxParticipation": 0,
      //   "assurances": 39231.82,
      //   "totalInterets": 509082.58,
      //   "coutTotal": 587546.22,
      //   "fraisDossier": 770,
      //   "expertiseImmobiliere": 0,
      //   "droitsEnregistrement": 20000,
      //   "conservationFonciere": 7700,
      //   "honorairesNotaire": 5000,
      //   "fraisDivers": 1500,
      //   "totalFrais": 34200,
      //   "nbreAnnee": 20,
      //   "nbreMois": 0
      // }
    }
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  ngOnInit(): void {

    // Get the documents
    this._demandeCreditService.documents$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((response: any) => {

        // Update the documents
        this.documents = response;
        // console.log("+-+-+- documents", this.documents);

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

    // Prepare the form
    this.demandeForm = this._formBuilder.group({
      files: [[], [Validators.required]]
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
        simulationId: this.recapitulatif.id
      }
    });
  }

  /**
   * Open tableau amortissement
   */
  openTableauAmortissement(): void {
    this.drawerOpened = true;

    this._tableauAmortissementService.getTableauAmortissement(this.recapitulatif.dossierId).subscribe();

    // Mark for check
    this._changeDetectorRef.markForCheck();
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
