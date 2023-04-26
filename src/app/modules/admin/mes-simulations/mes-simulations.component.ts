import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'mes-simulations',
  templateUrl: './mes-simulations.component.html',
  styleUrls: ['./mes-simulations.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class MesSimulationsComponent implements OnInit, OnDestroy {
  
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  simulations$: Observable<any[]>;
  simulations: any[] = [];

  /**
   * Constructor
   */
  constructor() {
    this.simulations.push({id: 123, montant: 300000, mensualites: 3652, duree: 240, teg: 4.2});
    this.simulations.push({id: 456, montant: 400000, mensualites: 5421, duree: 240, teg: 5.2});
    this.simulations.push({id: 789, montant: 500000, mensualites: 9652, duree: 240, teg: 6.2});

    this.simulations.push({id: 456, montant: 400000, mensualites: 5421, duree: 240, teg: 5.2});
    this.simulations.push({id: 789, montant: 500000, mensualites: 9652, duree: 240, teg: 6.2});
        
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
