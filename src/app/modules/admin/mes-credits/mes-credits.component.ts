import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { Subject } from 'rxjs';

@Component({
  selector: 'mes-credits',
  templateUrl: './mes-credits.component.html',
  styleUrls: ['./mes-credits.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class MesCreditsComponent implements OnInit, OnDestroy {
  
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  credits: any[] = [];

  /**
   * Constructor
   */
  constructor() {
    this.credits.push({id: 123, montant: "2 000 000.00 Dhs", capital: "454 964,75 Dhs", impayes: null, duree: 240, dureeRestante: 78});
    this.credits.push({id: 456, montant: "2 000 000.00 Dhs", capital: "454 964,75 Dhs", impayes: "37 960,35 Dhs", duree: 240, dureeRestante: 78});
    // this.credits.push({id: 789, montant: "2 000 000.00 Dhs", capital: "454 964,75 Dhs", impayes: null, duree: 240, dureeRestante: 78});
    // this.credits.push({id: 987, montant: "2 000 000.00 Dhs", capital: "454 964,75 Dhs", impayes: "37 960,35 Dhs", duree: 240, dureeRestante: 78});
            
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
