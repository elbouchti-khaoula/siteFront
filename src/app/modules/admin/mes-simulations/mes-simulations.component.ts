import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { Subject, catchError, takeUntil, throwError } from 'rxjs';
import { SimulationDetailleeService } from 'app/core/projects/simulation-detaillee.service';
import { SimulationDetaillee } from 'app/core/projects/simulation-detaillee.types';
import { FuseUtilsService } from '@fuse/services/utils';
import { FuseConfirmationService } from '@fuse/services/confirmation';

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
  selectedSimulation: SimulationDetaillee;
  simulationResultat: any;

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

    // Get simulations
    this._simulationService.simulations$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((response: SimulationDetaillee[]) => {

        this.simulations = response.map(
          e => {
            return this._fuseUtilsService.convertSimulationToString(e)
          }
        );

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

    this._simulationService.abandonner(selectedSimulation.id)
      .pipe(
        // Error here means the requested is not available
        catchError((error) => {

          // Throw an error
          return throwError(error);
        })
      )
      .subscribe((response) => {

        if (response.codeStatut === "PABA") {

          // Open the confirmation dialog
          const confirmation = this._fuseConfirmationService.open(
            {
              "title": "Abandonner simulation",
              "message": "Votre simulation a été abaandonnée avec succès",
              "icon": {
                "show": true,
                "name": "heroicons_outline:information-circle",
                "color": "success"
              },
              "actions": {
                "confirm": {
                  "show": true,
                  "label": "Ok",
                  "color": "warn"
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
                this._router.navigate(['/espace-connecte']);
              }, 200);
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
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------
  private addInfosTiers(selectedSimulation: any, routeLink: string): any {

    // Get the information of tiers by simulation
    this._simulationService.getInfoTiers(selectedSimulation)
      .pipe(
        catchError((error) => {
          // Throw an error
          return throwError(error);
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

}
