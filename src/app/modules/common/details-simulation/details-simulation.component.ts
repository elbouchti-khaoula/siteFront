import { ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { catchError, Subject, takeUntil, throwError } from 'rxjs';
import { resize } from 'app/modules/common/resize';
import { SimulationDetailleeService } from '../../admin/simulation-detaillee/simulation-detaillee.service';
import { TableauAmortissementService } from '../../admin/tableau-amortissement/tableau-amortissement.service';
import { AnimateCounterService } from '@fuse/services/animate-counter';
import { SimulationDetaillee } from 'app/modules/admin/simulation-detaillee/simulation-detaillee.types';

@Component({
  selector: 'details-simulation',
  templateUrl: './details-simulation.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: [fuseAnimations, resize]
})

export class DetailsSimulationComponent implements OnInit, OnDestroy {

  drawerOpened: boolean = false;
  isScreenSmall: boolean;

  @Input() simulationResultat: SimulationDetaillee;
  estExpImmoNum: boolean = true;
  estFraisDossNum: boolean = true;

  @ViewChild('resultat', { read: ElementRef }) public resultat: ElementRef<any>;
  @ViewChild('mensualiteId') mensualiteId: any;
  @ViewChild('nbreAnneeId') nbreAnneeId: any;
  @ViewChild('nbreMoisId') nbreMoisId: any;
  @ViewChild('montantId') montantId: any;
  @ViewChild('totalInteretsId') totalInteretsId: any;
  @ViewChild('coutTotalId') coutTotalId: any;
  @ViewChild('assurancesId') assurancesId: any;
  @ViewChild('tauxParticipationId') tauxParticipationId: any;
  @ViewChild('tauxEffectifGlobalId') tauxEffectifGlobalId: any;
  @ViewChild('expertiseImmobiliereId') expertiseImmobiliereId: any;
  @ViewChild('fraisDossierId') fraisDossierId: any;
  @ViewChild('totalFraisId') totalFraisId: any;
  @ViewChild('droitsEnregistrementId') droitsEnregistrementId: any;
  @ViewChild('conservationFonciereId') conservationFonciereId: any;
  @ViewChild('fraisDiversId') fraisDiversId: any;
  @ViewChild('honorairesNotaireId') honorairesNotaireId: any;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   */
  constructor(
    private _router: Router,
    private _changeDetectorRef: ChangeDetectorRef,
    private _fuseMediaWatcherService: FuseMediaWatcherService,
    private _animateCounterService: AnimateCounterService,
    private _simulationService: SimulationDetailleeService,
    private _tableauAmortissementService: TableauAmortissementService
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

  viderSimulation(): void {

    this._animateCounterService.animateValue(this.mensualiteId, this.simulationResultat.mensualite, 0, 600);
    this._animateCounterService.animateValue(this.nbreAnneeId, this.simulationResultat.nbreAnnee, 0, 600);
    this._animateCounterService.animateValue(this.nbreMoisId, this.simulationResultat.nbreMois, 0, 600);
    this._animateCounterService.animateValue(this.montantId, this.simulationResultat.montant, 0, 600);
    this._animateCounterService.animateValue(this.totalInteretsId, this.simulationResultat.totalInterets, 0, 600);
    this._animateCounterService.animateValue(this.coutTotalId, this.simulationResultat.coutTotal, 0, 600);
    this._animateCounterService.animateValue(this.assurancesId, this.simulationResultat.assurances, 0, 600);
    this._animateCounterService.animateValue(this.tauxParticipationId, this.simulationResultat.tauxParticipation, 0, 600);
    this._animateCounterService.animateValue(this.tauxEffectifGlobalId, this.simulationResultat.tauxEffectifGlobal, 0, 600);

    let nbExp = 0;
    if (this.simulationResultat.expertiseImmobiliere && this.simulationResultat.expertiseImmobiliere > 0) {
      nbExp = this.simulationResultat.expertiseImmobiliere;
    }
    this.estExpImmoNum = true;
    this._animateCounterService.animateValue(this.expertiseImmobiliereId, nbExp, 0, 600);

    let nbFrai = 0;
    if (this.simulationResultat.fraisDossier && this.simulationResultat.fraisDossier > 0) {
      nbFrai = this.simulationResultat.fraisDossier;
    }
    this.estFraisDossNum = true;
    this._animateCounterService.animateValue(this.fraisDossierId, nbFrai, 0, 600);

    // Frais
    this._animateCounterService.animateValue(this.totalFraisId, this.simulationResultat.totalFrais, 0, 600);
    this._animateCounterService.animateValue(this.droitsEnregistrementId, this.simulationResultat.droitsEnregistrement, 0, 600);
    this._animateCounterService.animateValue(this.conservationFonciereId, this.simulationResultat.conservationFonciere, 0, 600);
    this._animateCounterService.animateValue(this.fraisDiversId, this.simulationResultat.fraisDivers, 0, 600);
    this._animateCounterService.animateValue(this.honorairesNotaireId, this.simulationResultat.honorairesNotaire, 0, 600);
  
  }

  remplirSimulation(simulation : SimulationDetaillee) : void {
    
    this.mensualiteId.nativeElement.textContent = simulation.mensualite.toLocaleString('es-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    this.nbreAnneeId.nativeElement.textContent = simulation.nbreAnnee;
    this.nbreMoisId.nativeElement.textContent = simulation.nbreMois;
    this.montantId.nativeElement.textContent = simulation.montantProposition.toLocaleString('es-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    this.totalInteretsId.nativeElement.textContent = simulation.totalInterets.toLocaleString('es-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    this.assurancesId.nativeElement.textContent = simulation.assurances.toLocaleString('es-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    this.tauxParticipationId.nativeElement.textContent = simulation.tauxParticipation.toLocaleString('es-US', { minimumFractionDigits: 3, maximumFractionDigits: 3 });
    this.tauxEffectifGlobalId.nativeElement.textContent = simulation.tauxEffectifGlobal.toLocaleString('es-US', { minimumFractionDigits: 3, maximumFractionDigits: 3 });
    this.coutTotalId.nativeElement.textContent = simulation.coutTotal.toLocaleString('es-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    if (simulation.expertiseImmobiliere && simulation.expertiseImmobiliere > 0) {
      this.expertiseImmobiliereId.nativeElement.textContent = Number(simulation.expertiseImmobiliere).toLocaleString('es-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      this.estExpImmoNum = true;
    } else {
      simulation.expertiseImmobiliere = 0;
      this.expertiseImmobiliereId.nativeElement.textContent = "GRATUIT";
      this.estExpImmoNum = false;
    }

    if (simulation.fraisDossier && simulation.fraisDossier > 0) {
      this.fraisDossierId.nativeElement.textContent = Number(simulation.fraisDossier).toLocaleString('es-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      this.estFraisDossNum = true;
    } else {
      simulation.fraisDossier = 0;
      this.fraisDossierId.nativeElement.textContent = "GRATUIT";
      this.estFraisDossNum = false;
    }

    // Frais
    this.totalFraisId.nativeElement.textContent = simulation.totalFrais.toLocaleString('es-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    this.droitsEnregistrementId.nativeElement.textContent = simulation.droitsEnregistrement.toLocaleString('es-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    this.conservationFonciereId.nativeElement.textContent = simulation.conservationFonciere.toLocaleString('es-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    this.fraisDiversId.nativeElement.textContent = simulation.fraisDivers.toLocaleString('es-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    this.honorairesNotaireId.nativeElement.textContent = simulation.honorairesNotaire.toLocaleString('es-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  }

  scrollToResultat() : void {
    setTimeout(() => {
      // Scroll to result
      this.resultat.nativeElement.scrollIntoView({ behavior: "smooth" });
    }, 200);
  }

  /**
   * Abandonner simulation
   */
  abandonner(): void {

    console.log("+-+-+-", this.simulationResultat);

    this._simulationService.abandonner(this.simulationResultat.id)
      .pipe(
        // Error here means the requested is not available
        catchError((error) => {

          // Throw an error
          return throwError(error);
        })
      )
      .subscribe((response) => {
        console.log("+-+-+- response", response);

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
