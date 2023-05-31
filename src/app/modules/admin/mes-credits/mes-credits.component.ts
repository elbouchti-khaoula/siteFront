import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { ReferentielService } from 'app/core/referentiel/referentiel.service';
import { OperationSAVRef } from 'app/core/referentiel/referentiel.types';
import { Subject, takeUntil } from 'rxjs';
import { OperationsSAVRefComponent } from './opeartion-sav-ref/operations-sav-ref.component';
import { CreditEnCours } from 'app/core/records-in-progress/records-in-progress.types';
import { RecordsInProgressService } from 'app/core/records-in-progress/records-in-progress.service';
import { FuseUtilsService } from '@fuse/services/utils';

@Component({
  selector: 'mes-credits',
  templateUrl: './mes-credits.component.html',
  styleUrls: ['./mes-credits.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class MesCreditsComponent implements OnInit, OnDestroy {

  private _unsubscribeAll: Subject<any> = new Subject<any>();
  creditsEnCours: CreditEnCours[] = [];
  selectedDossier: any;
  operationsSAVRef: OperationSAVRef[] = [];

  /**
   * Constructor
   */
  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _matDialog: MatDialog,
    private _referentielService: ReferentielService,
    private _recordsInProgressService: RecordsInProgressService,
    private _fuseUtilsService: FuseUtilsService
  )
  {
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  ngOnInit(): void {
    this._referentielService.operationsSAVRef$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((response: OperationSAVRef[]) => {

        this.operationsSAVRef = response;

        // Mark for check
        this._changeDetectorRef.markForCheck();
      });

    this._recordsInProgressService.creditsEnCours$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((response: CreditEnCours[]) => {

        let res = [];
        if (response && response.length > 0) {
          res = response.map(
            e => {
              return {
                ...e,
                montant: this._fuseUtilsService.numberFormat(e.montant, 2, '.', ' '),
                crd: this._fuseUtilsService.numberFormat(e.crd, 2, '.', ' '),
                mensualite: this._fuseUtilsService.numberFormat(e.mensuaite, 2, '.', ' '),
                existeImpaye: e.impayes !== null && e.impayes !== 0,
                estCTX: e.statut == 'CTX',
                estEchu: e.statut == 'ECHU',
                // statutAS: 1,
                // existeImpaye: true
                // estCTX: true,
                // estEchu: true,
              }
            }
          );
        }
        this.creditsEnCours = res;

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
  openOperationsSAVRefDialog(dossierCredit: any): void {
    this.selectedDossier = dossierCredit;
    this._matDialog.open(OperationsSAVRefComponent, {
      autoFocus: false,
      data: {
        dossierId: dossierCredit.id
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

}
