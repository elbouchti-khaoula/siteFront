import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { catchError, Subject, takeUntil, throwError } from 'rxjs';
import { STATUT_SIMULATION_ANNULLEE, SimulationDetailleeService } from 'app/core/services/projects/projects.service';
import { TableauAmortissementService } from '../../admin/tableau-amortissement/tableau-amortissement.service';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { TableauAmortissementComponent } from 'app/modules/admin/tableau-amortissement/tableau-amortissement.component';

@Component({
  selector: 'details-simulation',
  templateUrl: './details-simulation.component.html',
  encapsulation: ViewEncapsulation.None
})

export class DetailsSimulationComponent implements OnInit, OnDestroy {

  @Input() simulationResultat: any;
  @ViewChild(TableauAmortissementComponent) tableauAmortissementComponent;

  drawerOpened: boolean = false;
  isScreenSmall: boolean;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   */
  constructor(
    private _router: Router,
    private _changeDetectorRef: ChangeDetectorRef,
    private _fuseMediaWatcherService: FuseMediaWatcherService,
    private _simulationService: SimulationDetailleeService,
    private _tableauAmortissementService: TableauAmortissementService,
    private _fuseConfirmationService: FuseConfirmationService
  )
  {
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  ngOnInit(): void {

    // Subscribe to media changes
    this._fuseMediaWatcherService.onMediaChange$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(({ matchingAliases }) => {

        // Check if the screen is small
        this.isScreenSmall = !matchingAliases.includes('md');

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

  // setSimulation(simulation: any): void {
  //   this.simulationResultat = simulation;
  // }

  /**
   * Abandonner une simulation
   */
  abandonner(): void {

    // Open the confirmation dialog
    const confirmation1 = this._fuseConfirmationService.open(
      {
        "title": "Abandonner simulation",
        "message": `Êtes-vous sûr de vouloir abandonner la simulation N° ${this.simulationResultat.id} ?`,
        "icon": {
          "show": true,
          "name": "heroicons_outline:check-circle",
          "color": "success"
        },
        "actions": {
          "confirm": {
            "show": true,
            "label": "Oui",
            "color": "primary"
          },
          "cancel": {
            "show": false,
            "label": "Non"
          }
        },
        "dismissible": false
      }
    );

    confirmation1.afterClosed().subscribe((result) => {

      // If the confirm button pressed...
      if (result === 'confirmed') {

        this._simulationService.abandonner(this.simulationResultat.id)
          .pipe(
            // Error here means the requested is not available
            catchError((error) => {

              // Throw an error
              return throwError(() => error);
            })
          )
          .subscribe((response) => {

            if (response.codeStatut === STATUT_SIMULATION_ANNULLEE) {

              // Open the confirmation dialog
              const confirmation = this._fuseConfirmationService.open(
                {
                  "title": "Abandonner simulation",
                  "message": "Votre simulation est abandonnée avec succès",
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
                    this._router.navigate(['/espace-connecte/mes-simulations']);
                  }, 200);
                }
              });
            }

          });
      }
    });

  }

  /**
   * Open tableau amortissement
   */
  openTableauAmortissement(dossierId: number): void {
    this._tableauAmortissementService.getTableauAmortissement(dossierId).subscribe((result) => {

      if (result) {
        this.tableauAmortissementComponent.setTableauAmortissementData(result);

        setTimeout(() => {
          this.drawerOpened = true;
        }, 200);
      }

      // Mark for check
      this._changeDetectorRef.markForCheck();

    });
  }

  /**
   * Perform navigate
   */
  navigateToDemandeCredit(): void {
    const navigationExtras: NavigationExtras = {
      state: {
        ...this.simulationResultat
      }
    };
    this._router.navigate(['/espace-connecte/demande-credit'], navigationExtras);
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
