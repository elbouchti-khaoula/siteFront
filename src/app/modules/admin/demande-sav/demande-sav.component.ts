import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { Subject, catchError, takeUntil, throwError } from 'rxjs';
import { Piece } from 'app/core/upload-document/upload-document.types';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { CheckListComponent } from 'app/modules/common/check-list/check-list.component';
import { UploadDocumentService } from 'app/core/upload-document/upload-document.service';
import { OperationSAVDocument, OperationSAVRef } from 'app/core/referentiel/referentiel.types';
import { ReferentielService } from 'app/core/referentiel/referentiel.service';
import { CreditEnCours } from 'app/core/records-in-progress/records-in-progress.types';

@Component({
  selector: 'demande-sav',
  templateUrl: './demande-sav.component.html',
  styleUrls: ['./demande-sav.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class DemandeSAVComponent implements OnInit, OnDestroy {

  @ViewChild(CheckListComponent) checkList: CheckListComponent;

  operationSAVRef: OperationSAVRef;
  documents: OperationSAVDocument[] = [];
  pieces: Piece[] = [];
  agreements: boolean;
  dossierCredit: CreditEnCours;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   */
  constructor(
    private _router: Router,
    private _changeDetectorRef: ChangeDetectorRef,
    private _fuseConfirmationService: FuseConfirmationService,
    private _referentielService: ReferentielService,
    private _uploadDocumentService: UploadDocumentService
  ) 
  {
    let data = this._router.getCurrentNavigation()?.extras?.state;
    if (data) {
      this.operationSAVRef = data.operation;
      this.dossierCredit = data.dossierCredit;
    }
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  ngOnInit(): void {

    // Get the documents
    this._referentielService.operationSAVDocuments$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((response: any) => {

        if (response) {
          // Update the documents
          this.documents = response;
          console.log("+-+-+- operationSAVDocuments",response)

          for (var i = 0; i < this.documents.length; i++) {
            this.pieces.push({
              libelleDocument: this.documents[i].libelle,
              listFilesArray: []
            })
          }
        }

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
   * transformer en demande de crédit
   */
  creerOperationSAV(): void {

    // this._simulationDetailleeService.transformer(this.simulationResultat.id)
    //   .pipe(
    //     catchError((error) => {

    //       // Throw an error
    //       return throwError(() => error);
    //     })
    //   )
    //   .subscribe((response) => {

    //     if (response.codeStatut === "DINS") {

    //       this.uploadCheckList();

    //       // Open the confirmation dialog
    //       const confirmation = this._fuseConfirmationService.open(
    //         {
    //           "title": "Demande de crédit",
    //           "message": "Votre demande de crédit à été validée avec succès",
    //           "icon": {
    //             "show": true,
    //             "name": "heroicons_outline:check-circle",
    //             "color": "success"
    //           },
    //           "actions": {
    //             "confirm": {
    //               "show": true,
    //               "label": "Ok",
    //               "color": "primary"
    //             },
    //             "cancel": {
    //               "show": false,
    //               "label": "Cancel"
    //             }
    //           },
    //           "dismissible": false
    //         }
    //       );

    //       confirmation.afterClosed().subscribe((result) => {

    //         // If the confirm button pressed...
    //         if (result === 'confirmed') {
    //           setTimeout(() => {
    //             this._router.navigate(['/espace-connecte']);
    //           }, 200);
    //         }
    //       });
    //     }

    //   });

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
        id_projet: 1,
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

      console.log("+-+-+- piece index", piece, index);

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
