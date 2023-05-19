import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { Subject, catchError, takeUntil, throwError } from 'rxjs';
import { SimulationDetailleeService } from 'app/core/projects/simulation-detaillee.service';
import { SimulationDetaillee } from 'app/core/projects/simulation-detaillee.types';
import { FuseUtilsService } from '@fuse/services/utils';
import { FuseConfirmationService } from '@fuse/services/confirmation';

@Component({
  selector: 'mes-projets-favoris',
  templateUrl: './mes-projets-favoris.component.html',
  styleUrls: ['./mes-projets-favoris.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class MesProjetsFavorisComponent implements OnInit, OnDestroy {

  private _unsubscribeAll: Subject<any> = new Subject<any>();
  projetsFavoris: any[] = [];

  /**
   * Constructor
   */
  constructor(
    private _router: Router,
    private _changeDetectorRef: ChangeDetectorRef,
    private _simulationService: SimulationDetailleeService,
    private _fuseUtilsService: FuseUtilsService,
    private _fuseConfirmationService: FuseConfirmationService
  )
  {
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  ngOnInit(): void {

    this.projetsFavoris.push({
      id: 123,
      image: "assets/images/pages/marketplace/projet1/salon.jpg",
      image2: "assets/images/pages/marketplace/projet1/kitchen.jpeg",
      image3: "assets/images/pages/marketplace/projet1/childroom.jpg",
      logo: "assets/images/pages/marketplace/projet1/promoteur.png",
      name: "Projets 1",
      address: "adresse 1"
    });
    this.projetsFavoris.push({
      id: 123,
      image: "assets/images/pages/marketplace/projet2/salon.jpg",
      image2: "assets/images/pages/marketplace/projet2/kitchen.jpg",
      image3: "assets/images/pages/marketplace/projet2/childroom.jpg",
      logo: "assets/images/pages/marketplace/projet2/promoteur.jpeg",
      name: "Projets 2",
      address: "adresse 2"
    });
    this.projetsFavoris.push({
      id: 123,
      image: "assets/images/pages/marketplace/projet3/salon.jpg",
      image2: "assets/images/pages/marketplace/projet3/kitchen.jpg",
      image3: "assets/images/pages/marketplace/projet3/childroom.jpg",
      logo: "assets/images/pages/marketplace/projet3/promoteur.png",
      name: "Projets 3",
      address: "adresse 3"
    });
    this.projetsFavoris.push({
      id: 123,
      image: "assets/images/pages/marketplace/projet4/salon.jpg",
      image2: "assets/images/pages/marketplace/projet4/kitchen.jpg",
      image3: "assets/images/pages/marketplace/projet4/childroom.jpg",
      logo: "assets/images/pages/marketplace/projet4/promoteur.png",
      name: "Projets 4",
      address: "adresse 4"
    });
    // this.projetsFavoris.push({
    //   id: 123,
    //   image: "assets/images/pages/marketplace/projet5/salon.jpg",
    //   logo: "assets/images/pages/marketplace/projet5/promoteur.png",
    //   name: "Projets 5",
    //   address: "adresse 5"
    // });
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
