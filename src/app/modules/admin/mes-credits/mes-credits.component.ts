import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { ReferentielService } from 'app/core/referentiel/referentiel.service';
import { OperationSAVRef } from 'app/core/referentiel/referentiel.types';
import { Subject, takeUntil } from 'rxjs';
import { OperationsSAVRefComponent } from './opeartion-sav-ref/operations-sav-ref.component';

@Component({
  selector: 'mes-credits',
  templateUrl: './mes-credits.component.html',
  styleUrls: ['./mes-credits.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class MesCreditsComponent implements OnInit, OnDestroy {

  private _unsubscribeAll: Subject<any> = new Subject<any>();
  dossiersCredits: any[] = [];
  selectedDossier: any;
  operationsSAVRef: OperationSAVRef[] = [];

  /**
   * Constructor
   */
  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _matDialog: MatDialog,
    private _referentielService: ReferentielService
  ) {
    this.dossiersCredits.push({ id: 123, montant: "2 000 000.00 Dhs", capital: "454 964,75 Dhs", impayes: null, duree: 240, dureeRestante: 78 });
    this.dossiersCredits.push({ id: 456, montant: "2 000 000.00 Dhs", capital: "454 964,75 Dhs", impayes: "37 960,35 Dhs", duree: 240, dureeRestante: 78 });
    // this.dossiersCredits.push({id: 789, montant: "2 000 000.00 Dhs", capital: "454 964,75 Dhs", impayes: null, duree: 240, dureeRestante: 78});
    // this.dossiersCredits.push({id: 987, montant: "2 000 000.00 Dhs", capital: "454 964,75 Dhs", impayes: "37 960,35 Dhs", duree: 240, dureeRestante: 78});
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
