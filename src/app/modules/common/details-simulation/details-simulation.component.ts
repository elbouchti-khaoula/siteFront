import { ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { catchError, Subject, takeUntil, throwError } from 'rxjs';
import { SimulationDetailleeService } from 'app/core/projects/simulation-detaillee.service';
import { TableauAmortissementService } from '../../admin/tableau-amortissement/tableau-amortissement.service';
// import { AnimateCounterService } from '@fuse/services/animate-counter';
import { FuseConfirmationService } from '@fuse/services/confirmation';

@Component({
  selector: 'details-simulation',
  templateUrl: './details-simulation.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})

export class DetailsSimulationComponent implements OnInit, OnDestroy {

  drawerOpened: boolean = false;
  isScreenSmall: boolean;

  @Input() simulationResultat: any;

  @ViewChild('resultat', { read: ElementRef }) public resultat: ElementRef<any>;
  // @ViewChild('mensualiteId') mensualiteId: any;
  // @ViewChild('nbreAnneeId') nbreAnneeId: any;
  // @ViewChild('nbreMoisId') nbreMoisId: any;
  // @ViewChild('montantId') montantId: any;
  // @ViewChild('totalInteretsId') totalInteretsId: any;
  // @ViewChild('coutTotalId') coutTotalId: any;
  // @ViewChild('assurancesId') assurancesId: any;
  // @ViewChild('tauxParticipationId') tauxParticipationId: any;
  // @ViewChild('tauxEffectifGlobalId') tauxEffectifGlobalId: any;
  // @ViewChild('expertiseImmobiliereId') expertiseImmobiliereId: any;
  // @ViewChild('fraisDossierId') fraisDossierId: any;
  // @ViewChild('totalFraisId') totalFraisId: any;
  // @ViewChild('droitsEnregistrementId') droitsEnregistrementId: any;
  // @ViewChild('conservationFonciereId') conservationFonciereId: any;
  // @ViewChild('fraisDiversId') fraisDiversId: any;
  // @ViewChild('honorairesNotaireId') honorairesNotaireId: any;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   */
  constructor(
    private _router: Router,
    private _changeDetectorRef: ChangeDetectorRef,
    private _fuseMediaWatcherService: FuseMediaWatcherService,
    // private _animateCounterService: AnimateCounterService,
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

  // viderSimulation(): void {

  //   this._animateCounterService.animateValue(this.mensualiteId, this.simulation.mensualite, 0, 600);
  //   this._animateCounterService.animateValue(this.nbreAnneeId, this.simulation.nbreAnnee, 0, 600);
  //   this._animateCounterService.animateValue(this.nbreMoisId, this.simulation.nbreMois, 0, 600);
  //   this._animateCounterService.animateValue(this.montantId, this.simulation.montant, 0, 600);
  //   this._animateCounterService.animateValue(this.totalInteretsId, this.simulation.totalInterets, 0, 600);
  //   this._animateCounterService.animateValue(this.coutTotalId, this.simulation.coutTotal, 0, 600);
  //   this._animateCounterService.animateValue(this.assurancesId, this.simulation.assurances, 0, 600);
  //   this._animateCounterService.animateValue(this.tauxParticipationId, this.simulation.tauxParticipation, 0, 600);
  //   this._animateCounterService.animateValue(this.tauxEffectifGlobalId, this.simulation.tauxEffectifGlobal, 0, 600);

  //   let nbExp = 0;
  //   if (this.simulation.expertiseImmobiliere && this.simulation.expertiseImmobiliere > 0) {
  //     nbExp = this.simulation.expertiseImmobiliere;
  //   }
  //   this.estExpImmoNum = true;
  //   this._animateCounterService.animateValue(this.expertiseImmobiliereId, nbExp, 0, 600);

  //   let nbFrai = 0;
  //   if (this.simulation.fraisDossier && this.simulation.fraisDossier > 0) {
  //     nbFrai = this.simulation.fraisDossier;
  //   }
  //   this.estFraisDossNum = true;
  //   this._animateCounterService.animateValue(this.fraisDossierId, nbFrai, 0, 600);

  //   // Frais
  //   this._animateCounterService.animateValue(this.totalFraisId, this.simulation.totalFrais, 0, 600);
  //   this._animateCounterService.animateValue(this.droitsEnregistrementId, this.simulation.droitsEnregistrement, 0, 600);
  //   this._animateCounterService.animateValue(this.conservationFonciereId, this.simulation.conservationFonciere, 0, 600);
  //   this._animateCounterService.animateValue(this.fraisDiversId, this.simulation.fraisDivers, 0, 600);
  //   this._animateCounterService.animateValue(this.honorairesNotaireId, this.simulation.honorairesNotaire, 0, 600);
  
  // }

  getSimulation(simulation: any): void {
    this.simulationResultat = simulation;

    // this.mensualiteId.nativeElement.textContent = this.simulationResultat.mensualite;
    // this.nbreAnneeId.nativeElement.textContent = this.simulationResultat.nbreAnnee;
    // this.nbreMoisId.nativeElement.textContent = this.simulationResultat.nbreMois;
    // this.montantId.nativeElement.textContent = this.simulationResultat.montantProposition;
    // this.totalInteretsId.nativeElement.textContent = this.simulationResultat.totalInterets;
    // this.assurancesId.nativeElement.textContent = this.simulationResultat.assurances;
    // this.tauxParticipationId.nativeElement.textContent = this.simulationResultat.tauxParticipation;
    // this.tauxEffectifGlobalId.nativeElement.textContent = this.simulationResultat.tauxEffectifGlobal;
    // this.coutTotalId.nativeElement.textContent = this.simulationResultat.coutTotal;
    // this.expertiseImmobiliereId.nativeElement.textContent = expertiseImmobiliereStr;
    // this.fraisDossierId.nativeElement.textContent = fraisDossierStr;
    // // Frais
    // this.totalFraisId.nativeElement.textContent = this.simulationResultat.totalFrais;
    // this.droitsEnregistrementId.nativeElement.textContent = this.simulationResultat.droitsEnregistrement;
    // this.conservationFonciereId.nativeElement.textContent = this.simulationResultat.conservationFonciere;
    // this.fraisDiversId.nativeElement.textContent = this.simulationResultat.fraisDivers;
    // this.honorairesNotaireId.nativeElement.textContent = this.simulationResultat.honorairesNotaire;
  }

  scrollToResultat() : void {
    setTimeout(() => {
      // Scroll to result
      this.resultat.nativeElement.scrollIntoView({ behavior: "smooth" });
    }, 200);
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
  openTableauAmortissement(): void {
    this.drawerOpened = true;

    this._tableauAmortissementService.getTableauAmortissement(this.simulationResultat.dossierId).subscribe();

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

}
