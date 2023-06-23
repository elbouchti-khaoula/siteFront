import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { Subject, catchError, takeUntil, throwError } from 'rxjs';
import { STATUT_SIMULATION_ANNULLEE, SimulationDetailleeService } from 'app/core/services/projects/projects.service';
import { SimulationDetaillee } from 'app/core/services/projects/projects.types';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { AuthenticationService } from 'app/core/auth/authentication.service';

@Component({
  selector: 'mes-simulations',
  templateUrl: './mes-simulations.component.html',
  styleUrls: ['./mes-simulations.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class MesSimulationsComponent implements OnInit, OnDestroy {

  private _unsubscribeAll: Subject<any> = new Subject<any>();
  simulations: any[] = [];

  /**
   * Constructor
   */
  constructor(
    private _router: Router,
    private _changeDetectorRef: ChangeDetectorRef,
    private _simulationService: SimulationDetailleeService,
    private _fuseConfirmationService: FuseConfirmationService,
    private _authenticationService: AuthenticationService
  ) {
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  ngOnInit(): void {

    // Get simulations
    this._simulationService.simulations$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((response: SimulationDetaillee[]) => {

        this.convertSimulations(response);

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
   * Perform navigate
   */
  navigateToDemandeCredit(selectedSimulation: any): void {

    this.addInfosTiers(selectedSimulation, '/espace-connecte/demande-credit');

  }

  /**
   * Perform navigate
   */
  navigateToConsulterSimulation(selectedSimulation: any): void {

    this.addInfosTiers(selectedSimulation, '/espace-connecte/consulter-simulation');

  }

  /**
   * Abandonner une simulation
   */
  abandonner(selectedSimulation: any): void {

    // Open the confirmation dialog
    const confirmation1 = this._fuseConfirmationService.open(
      {
        "title": "Abandonner simulation",
        "message": `Êtes-vous sûr de vouloir abandonner la simulation N° ${selectedSimulation.id} ?`,
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
            "show": true,
            "label": "Non"
          }
        },
        "dismissible": false
      }
    );

    confirmation1.afterClosed().subscribe((result) => {

      // If the confirm button pressed...
      if (result === 'confirmed') {

        this._simulationService.abandonner(selectedSimulation.id)
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
                  "message": "Votre simulation a été abaandonnée avec succès",
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
                    // this.simulations.splice(this.simulations.findIndex(element => element.id === selectedSimulation.id) , 1);
                    
                    let user = this._authenticationService.connectedUser;
                    this._simulationService.search(user.email)
                      .subscribe((response) => {

                        this.convertSimulations(response);
                      });
                  }, 100);
                }
              });
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
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------
  private addInfosTiers(selectedSimulation: any, routeLink: string): any {

    // Get the information of tiers by simulation
    this._simulationService.getInfoTiers(selectedSimulation)
      .pipe(
        catchError((error) => {

          // Throw an error
          return throwError(() => error);
        })
      )
      .subscribe((response: any) => {

        setTimeout(() => {
          const navigationExtras: NavigationExtras = {
            state: {
              ...response
            }
          };
          this._router.navigate([routeLink], navigationExtras);
        }, 300);

      });

  }
  
  private convertSimulations(response: SimulationDetaillee[]) {
    let res = [];
    if (response && response.length > 0) {
      res = response.map(
        e => {
          return this._simulationService.convertSimulationToString(e);
        }
      );
    }
    this.simulations = res;
  }

}
