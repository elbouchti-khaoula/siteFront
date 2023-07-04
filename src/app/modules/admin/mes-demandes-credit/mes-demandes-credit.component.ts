import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { FuseUtilsService } from '@fuse/services/utils';
import { RecordsInProgressService } from 'app/core/services/records-in-progress/records-in-progress.service';
import { DemandeCredit } from 'app/core/services/records-in-progress/records-in-progress.types';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'mes-demandes-credit',
  templateUrl: './mes-demandes-credit.component.html',
  styleUrls: ['./mes-demandes-credit.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class MesDemandesCreditComponent implements OnInit, OnDestroy {

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  demandes: DemandeCredit[] = [];
  steps: any[] = [];

  /**
   * Constructor
   */
  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _fuseUtilsService: FuseUtilsService,
    private _recordsInProgressService: RecordsInProgressService
  )
  {
    this.steps.push({ id: 1, libelle: 'Instruction' });
    this.steps.push({ id: 2, libelle: 'Autorisation' });
    this.steps.push({ id: 3, libelle: 'Mise à disposition des fonds' });
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  ngOnInit(): void {
    this._recordsInProgressService.demandesCredit$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((response: DemandeCredit[]) => {

        let res = [];
        if (response && response.length > 0) {
          res = response.map(
            e => {
              return {
                ...e,
                mtProjet: this._fuseUtilsService.numberFormat(e.mtProjet, 2, '.', ' '),
                phaseId: this.steps.find(step => step.libelle === e.phase).id
              }
            }
          );
        }
        this.demandes = res;

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
   * Track by function for ngFor loops
   *
   * @param index
   * @param item
   */
  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

}
