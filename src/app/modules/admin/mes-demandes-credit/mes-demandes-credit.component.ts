import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'mes-demandes-credit',
  templateUrl: './mes-demandes-credit.component.html',
  styleUrls: ['./mes-demandes-credit.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class MesDemandesCreditComponent implements OnInit, OnDestroy {
  
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  demandes$: Observable<any[]>;
  demandes: any[] = [];
  statuts: any[] = [];

  /**
   * Constructor
   */
  constructor() {
    this.statuts.push({id: 1, libelle: 'Instruction'});
    this.statuts.push({id: 2, libelle: 'Autorisation'});
    this.statuts.push({id: 3, libelle: 'Déblocage'});

    this.demandes.push({id: 123, montant: "300 000.00", mensualites: 3652, duree: 240, teg: 4.2, statut: 1});
    this.demandes.push({id: 456, montant: "400 000.00", mensualites: 5421, duree: 240, teg: 5.2, statut: 2});
    this.demandes.push({id: 789, montant: "500 000.00", mensualites: 9652, duree: 240, teg: 6.2, statut: 3});
    this.demandes.push({id: 987, montant: "400 000.00", mensualites: 4564, duree: 240, teg: 5.0, statut: 1});
    // this.demandes.push({id: 789, montant: "500000.00", mensualites: 9652, duree: 240, teg: 6.2, statut: 2});
        
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
