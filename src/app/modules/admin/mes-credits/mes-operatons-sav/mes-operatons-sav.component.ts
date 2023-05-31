import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { OperationSAVRef } from 'app/core/referentiel/referentiel.types';
import { Subject} from 'rxjs';
import { OperationSav } from './mes-operations-sav.types';

@Component({
  selector: 'mes-operatons-sav',
  templateUrl: './mes-operatons-sav.component.html',
  styleUrls: ['./mes-operatons-sav.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class MesOperationsSavsComponent implements OnInit, OnDestroy {

  private _unsubscribeAll: Subject<any> = new Subject<any>();
  operationsSavs: OperationSav[] = [];
  selectedDossier: any;
  operationsSAVRef: OperationSAVRef[] = [];

  /**
   * Constructor
   */
  constructor(

  )
  {
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  ngOnInit(): void {

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
