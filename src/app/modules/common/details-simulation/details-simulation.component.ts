import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { catchError, Subject, takeUntil, throwError } from 'rxjs';
import { SimulationDetailleeService } from 'app/core/projects/projects.service';
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

    // this.simulationResultat = {
    //   "nom": "TEST",
    //   "prenom": "TEST",
    //   "dateNaissance": "02/01/1990",
    //   "nationalite": "MAROCAINE",
    //   "residantMaroc": "Oui",
    //   "salaire": "300 000.00",
    //   "autresRevenus": 0,
    //   "segment": "NV",
    //   "creditsEnCours": "0.00",
    //   "nomEmployeur": "WAFA immobilier",
    //   "email": "a.kadmiri@outlook.fr",
    //   "telephone": "0612345678",
    //   "proprietaireMaroc": false,
    //   "capital": 0,
    //   "objetFinancement": "ACQUISITION",
    //   "nomPromoteur": "KETTANI IMMO",
    //   "typeTaux": "Valeur Fixe",
    //   "newSimulation": false,
    //   "id": 675141,
    //   "montant": "2 500 000.00",
    //   "montantProposition": "2 000 000.00",
    //   "duree": 240,
    //   "statut": "NPRO",
    //   "tauxNominalPondere": 2.409015,
    //   "tauxEffectifGlobalPondere": 3.0459165,
    //   "tauxAssurancePondere": 0.3959999999999999,
    //   "tauxInteretsClientTtc": 2.6499165,
    //   "dossiers": [
    //     {
    //       "id": 805628,
    //       "montant": "1 300 000.00",
    //       "duree": 240,
    //       "echeance": 7470.13,
    //       "tauxNominal": 2.7272,
    //       "tauxEffectifGlobal": "3.396",
    //       "tauxParticipation": "0.000",
    //       "fraisDossier": "GRATUIT",
    //       "assurances": "57 469.46",
    //       "totalInterets": "435 361.74",
    //       "coutTotal": "1 792 831.20",
    //       "mensualite": "7 470.13",
    //       "expertiseImmobiliere": "GRATUIT",
    //       "estExpImmoNum": false,
    //       "estFraisDossNum": false,
    //       "nbreAnnee": 20,
    //       "nbreMois": 0
    //     },
    //     {
    //       "id": 805627,
    //       "montant": "700 000.00",
    //       "duree": 240,
    //       "echeance": 3673.93,
    //       "tauxNominal": 1.8181,
    //       "tauxEffectifGlobal": "2.396",
    //       "tauxParticipation": "0.000",
    //       "fraisDossier": "GRATUIT",
    //       "assurances": "30 038.67",
    //       "totalInterets": "151 704.53",
    //       "coutTotal": "881 743.20",
    //       "mensualite": "3 673.93",
    //       "expertiseImmobiliere": "GRATUIT",
    //       "estExpImmoNum": false,
    //       "estFraisDossNum": false,
    //       "nbreAnnee": 20,
    //       "nbreMois": 0
    //     }
    //   ],
    //   "droitsEnregistrement": "100 000.00",
    //   "conservationFonciere": "37 500.00",
    //   "honorairesNotaire": "25 000.00",
    //   "fraisDivers": "1 500.00",
    //   "totalFrais": "164 000.00",
    //   "mensualite": "11 144.06",
    //   "tauxEffectifGlobal": "3.046"
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

  // setSimulation(simulation: any): void {
  //   this.simulationResultat = simulation;
  // }

  /**
   * Abandonner une simulation
   */
  abandonner(): void {

    this._simulationService.abandonner(this.simulationResultat.id)
      .pipe(
        // Error here means the requested is not available
        catchError((error) => {

          // Throw an error
          return throwError(() => error);
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
