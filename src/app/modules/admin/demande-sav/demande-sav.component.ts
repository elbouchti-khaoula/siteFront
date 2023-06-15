import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { Subject, catchError, takeUntil, throwError } from 'rxjs';
import { Piece } from 'app/core/services/upload-document/upload-document.types';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { CheckListComponent } from 'app/modules/common/check-list/check-list.component';
import { UploadDocumentService } from 'app/core/services/upload-document/upload-document.service';
import { OperationSAVDocument, OperationSAVRef } from 'app/core/services/referentiel/referentiel.types';
import { ReferentielService } from 'app/core/services/referentiel/referentiel.service';
import { CreditEnCours } from 'app/core/services/records-in-progress/records-in-progress.types';
import { DemandeSAVService } from 'app/core/services/demandes-sav/demandes-sav.service';
import { CritereDemandeSAV, DemandeSAV } from 'app/core/services/demandes-sav/demandes-sav.types';
import { User } from 'app/core/user/user.types';
import { AuthenticationService } from 'app/core/auth/authentication.service';

@Component({
  selector: 'demande-sav',
  templateUrl: './demande-sav.component.html',
  styleUrls: ['./demande-sav.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class DemandeSAVComponent implements OnInit, OnDestroy {

  @ViewChild(CheckListComponent) checkList: CheckListComponent;
  user: User;
  operationSAVRef: OperationSAVRef;
  documents: OperationSAVDocument[] = [];
  pieces: Piece[] = [];
  agreements: boolean;
  motif: string
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
    private _uploadDocumentService: UploadDocumentService,
    private _demandeSAVService: DemandeSAVService,
    private _authenticationService: AuthenticationService
  ) 
  {
    let data = this._router.getCurrentNavigation()?.extras?.state;
    if (data) {
      this.operationSAVRef = data?.operation;
      this.dossierCredit = data?.dossierCredit;
    }
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  ngOnInit(): void {

    this.user = this._authenticationService.connectedUser;

    // Get the documents
    this._referentielService.operationSAVDocuments$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((response: any) => {

        if (response) {
          // Update the documents
          this.documents = response;

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

  creerDemandeSAV() {

    const critereDemandeSAV: CritereDemandeSAV = {
      codeOperation: this.operationSAVRef.codeOperation,
      dossierId: this.dossierCredit.id,
      mode: null,
      cin: this.user.cin,
      mail: this.user.email,
      motifRemboursement: this.motif,
      origineFonds: null
    }

    this._demandeSAVService.createDemandeSAV(critereDemandeSAV)
      .pipe(
        catchError((error) => {

          // Throw an error
          return throwError(() => error);
        })
      )
      .subscribe((response: DemandeSAV) => {
        if (response !== null && response !== undefined && response.demandeSavId != null) {

          this.uploadCheckList(response.demandeSavId);

          // Open the dialog
          const confirmation = this._fuseConfirmationService.open(
            {
              "title": "Demande opération SAV",
              "message": "La demande a été créée avec succès",
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
                this._router.navigate(['/espace-connecte/mes-credits']);
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

  private uploadCheckList(demandeSAVId: number) {
    this.pieces.forEach((piece, index) => {
      piece = {
        id_Demande: demandeSAVId,
        code_Operation: this.operationSAVRef.codeOperation,
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

        this._uploadDocumentService.uploadPiecesDemandeSAV(piece)
          .pipe(
            catchError((error) => {
              // Log the error
              console.error("+-+-+- demande SAV document error", error);
              // Throw an error
              return throwError(() => error);
            }))
          .subscribe((response) => {
            console.log("+-+-+- demande SAV document success", response);
          });

      }

    });
  }

}
