import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { catchError, Subject, takeUntil, throwError } from 'rxjs';
import { SimulationDetailleeService } from 'app/core/projects/simulation-detaillee.service';
import { TableauAmortissementService } from '../../admin/tableau-amortissement/tableau-amortissement.service';
import { FuseConfirmationService } from '@fuse/services/confirmation';

@Component({
  selector: 'details-simulation',
  templateUrl: './details-simulation.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})

export class DetailsSimulationComponent implements OnInit, OnDestroy {

  @Input() simulationResultat: any;

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

      // this.simulationResultat = {
      //   "nom": "test1",
      //   "prenom": "test1",
      //   "telephone": "0522111111",
      //   "email": "test1@test1.com",
      //   "dateNaissance": "01/01/2000",
      //   "nationalite": "MA",
      //   "residantMaroc": true,
      //   "categorieSocioProfessionnelle": "SALA",
      //   "nomEmployeur": "Employeur",
      //   "salaire": "500 000.00",
      //   "autresRevenus": "200 000.00",
      //   "creditsEnCours": "3 000.00",
      //   "montant": "500 000.00",
      //   "objetFinancement": "ACQU",
      //   "montantProposition": "500 000.00",
      //   "duree": 240,
      //   "nomPromoteur": "Promoteur",
      //   "statutProjet": "active",
      //   "typeTaux": "FIXE",

      //   "id": 674335,
      //   "statut": "NPRO",
      //   dossiers: [
      //     {
      //       "id": 803757,
      //       "montant": "700 000.00",
      //       "duree": 240,
      //       "mensualite": "5 201.31",
      //       "tauxNominal": "5.450",
      //       "tauxEffectifGlobal": "6.457",
      //       "tauxParticipation": "0.000",
      //       "assurances": "39 231.82",
      //       "totalInterets": "509 082.58",
      //       "coutTotal": "587 546.22",
      //       "expertiseImmobiliere": "GRATUIT",
      //       "estExpImmoNum" : false,
      //       "fraisDossier": "770.00",
      //       "estFraisDossNum": true,
      //       "nbreAnnee": 20,
      //       "nbreMois": 0,
      //     },
      //     {
      //       "id": 803757,
      //       "montant": "700 000.00",
      //       "duree": 240,
      //       "mensualite": "5 201.31",
      //       "tauxNominal": "5.450",
      //       "tauxEffectifGlobal": "6.457",
      //       "tauxParticipation": "0.000",
      //       "assurances": "39 231.82",
      //       "totalInterets": "509 082.58",
      //       "coutTotal": "587 546.22",
      //       "expertiseImmobiliere": "GRATUIT",
      //       "estExpImmoNum" : false,
      //       "fraisDossier": "770.00",
      //       "estFraisDossNum": true,
      //       "nbreAnnee": 20,
      //       "nbreMois": 0,
      //     }
      //   ],
      //   "droitsEnregistrement": "20 000.00",
      //   "conservationFonciere": "7 700.00",
      //   "honorairesNotaire": "5 000.00",
      //   "fraisDivers": "1 500.00",
      //   "totalFrais": "34 200.00",
      //   newSimulation: true
      // }
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

  getSimulation(simulation: any): void {
    this.simulationResultat = simulation;
  }

  /**
   * Abandonner une simulation
   */
  abandonner(): void {

    this._simulationService.abandonner(this.simulationResultat.id)
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
   * Open tableau amortissement
   */
  openTableauAmortissement(dossierId: number): void {
    this.drawerOpened = true;

    this._tableauAmortissementService.getTableauAmortissement(dossierId).subscribe();

    // Mark for check
    this._changeDetectorRef.markForCheck();
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
