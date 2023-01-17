import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { AnimateCounterService } from '@fuse/services/animate-counter/animate-counter.service';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { catchError, Subject, takeUntil, throwError } from 'rxjs';
import { CategorieSocioProfessionnelle } from '../common/referentiel.types';
import { ReferentielService } from '../common/referentiel.service';
import { SimulationPersonnalisee } from './simulation.types';
import { SimulationService } from './simulation.service';

@Component({
  selector: 'simulation-personnalisee',
  templateUrl: './simulation-personnalisee.component.html',
  styleUrls: ['./simulation-personnalisee.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class SimulationPersonaliseeComponent implements OnInit, OnDestroy {

  isScreenSmall: boolean;
  queryParams: Params;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  simulationForm: UntypedFormGroup;
  simulationFormDefaults: any = {
    montant: null,
    duree: null,
    nom: null,
    prenom: null,
    cspCode: null,
    telephone: null,
    email: null,
    residentMarocain: null,
    agreements: null
  };

  simulation: SimulationPersonnalisee;
  categories: CategorieSocioProfessionnelle[];

  /**
   * Constructor
   */
  constructor(
    private _router: Router,
    private _changeDetectorRef: ChangeDetectorRef,
    private _fuseMediaWatcherService: FuseMediaWatcherService,
    private _formBuilder: UntypedFormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _animateCounterService: AnimateCounterService,
    private _referentielService: ReferentielService,
    private _simulationService: SimulationService
  ) {

    this.simulation = {
      montant: 0.00,
      duree: 0,
      mensualite: 0.00,
      totalInterets: 0.00,
      coutTotal: 0.00,
      expertiseImmobiliere: "",
      fraisDossier: "",
      droitsEnregistrement: 0.00,
      conservationFonciere: 0.00,
      fraisDivers: 0.00,
      honorairesNotaire: 0.00,

      get totalFrais() {
        return this.droitsEnregistrement + this.conservationFonciere + this.fraisDivers + this.honorairesNotaire
      }
    }

    // Prepare the form with defaults
    this.simulationForm = this._formBuilder.group(
      {
        montant: [this.simulationFormDefaults.montant, [Validators.required]],
        duree: [this.simulationFormDefaults.duree, [Validators.required]],
        nom: [this.simulationFormDefaults.nom, [Validators.required]],
        prenom: [this.simulationFormDefaults.prenom, [Validators.required]],
        cspCode: [this.simulationFormDefaults.cspCode, [Validators.required]],
        telephone: [this.simulationFormDefaults.telephone, [Validators.required]],
        email: [this.simulationFormDefaults.email, [Validators.email, Validators.required]],
        residentMarocain: [this.simulationFormDefaults.residentMarocain, [Validators.required]],
        agreements: [this.simulationFormDefaults.agreements, [Validators.required]]
      },
      // { validators: this.atLeastOne }
    );
  }

  // atLeastOne(form: FormGroup): ValidationErrors {
  //   const emailCtrl = form.get('email');
  //   const phoneCtr = form.get('telephone');
  //   if (!!emailCtrl.value || !!phoneCtr.value) {
  //     return null;
  //   }
  //   return { atLeastOne: '* Veuillez saisir émail ou téléphone' };
  // }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  ngOnInit(): void {
    // Subscribe to query params change
    this._activatedRoute.queryParams
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((queryParams) => {

        // Store the query params
        this.queryParams = queryParams;

        // Fill the form with the values from query
        // params without emitting any form events
        this.simulationForm.get('montant').setValue(queryParams?.montant ?? this.simulationFormDefaults.montant);
        this.simulationForm.get('duree').setValue(queryParams?.duree ?? this.simulationFormDefaults.duree);
      });

    // Subscribe to media changes
    this._fuseMediaWatcherService.onMediaChange$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(({ matchingAliases }) => {

        // Check if the screen is small
        this.isScreenSmall = !matchingAliases.includes('md');
      });

    // Get the categories
    this._referentielService.categoriesSocioProf$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((categories: CategorieSocioProfessionnelle[]) => {

        // Update the categories
        this.categories = categories;

        // Mark for check
        this._changeDetectorRef.markForCheck();
      });

    // console.log("+-+-+- this.categories", this.categories);

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
  @ViewChild('mensualiteId') mensualiteId: any;
  @ViewChild('dureeId') dureeId: any;
  @ViewChild('nbreMoisId') nbreMoisId: any;
  @ViewChild('montantId') montantId: any;
  @ViewChild('totalInteretsId') totalInteretsId: any;
  @ViewChild('coutTotalId') coutTotalId: any;
  @ViewChild('totalFraisId') totalFraisId: any;
  @ViewChild('droitsEnregistrementId') droitsEnregistrementId: any;
  @ViewChild('conservationFonciereId') conservationFonciereId: any;
  @ViewChild('fraisDiversId') fraisDiversId: any;
  @ViewChild('honorairesNotaireId') honorairesNotaireId: any;

  /**
   * Reset the form using the default
   */
  reset(): void {
    this.simulationForm.reset(this.simulationFormDefaults);
    this.simulation.expertiseImmobiliere = "";
    this.simulation.fraisDossier = "";
    this._animateCounterService.animateValue(this.mensualiteId, this.simulation.mensualite, 0, 600);
    this._animateCounterService.animateValue(this.dureeId, this.simulation.duree, 0, 600);
    this._animateCounterService.animateValue(this.nbreMoisId, this.simulation.duree * 12, 0, 600);
    this._animateCounterService.animateValue(this.montantId, this.simulation.montant, 0, 600);
    this._animateCounterService.animateValue(this.totalInteretsId, this.simulation.totalInterets, 0, 600);
    this._animateCounterService.animateValue(this.coutTotalId, this.simulation.coutTotal, 0, 600);
    this._animateCounterService.animateValue(this.totalFraisId, this.simulation.totalFrais, 0, 600);
    this._animateCounterService.animateValue(this.droitsEnregistrementId, this.simulation.droitsEnregistrement, 0, 600);
    this._animateCounterService.animateValue(this.conservationFonciereId, this.simulation.conservationFonciere, 0, 600);
    this._animateCounterService.animateValue(this.fraisDiversId, this.simulation.fraisDivers, 0, 600);
    this._animateCounterService.animateValue(this.honorairesNotaireId, this.simulation.honorairesNotaire, 0, 600);
  }

  resetSimulation() {
    this.totalInteretsId.nativeElement.textContent = 0.00;
    this.coutTotalId.nativeElement.textContent = 0.00;

    this.totalFraisId.nativeElement.textContent = 0.00;
    this.droitsEnregistrementId.nativeElement.textContent = 0.00;
    this.conservationFonciereId.nativeElement.textContent = 0.00;
    this.fraisDiversId.nativeElement.textContent = 0.00;
    this.honorairesNotaireId.nativeElement.textContent = 0.00;
  }

  simuler(): void {

    const critere = {
      montant: this.simulationForm.get('montant').value,
      cspCode: this.simulationForm.get('cspCode').value,
      residentMarocain: this.simulationForm.get('residentMarocain').value,
      duree: this.simulationForm.get('duree').value
    }

    // Get the product by id
    this._simulationService.simuler(critere)
      .pipe(
        // Error here means the requested is not available
        catchError((error) => {

          // Log the error
          console.error(error);

          if (error.status === 500) {
            this._router.navigateByUrl('/500-server-error');
          } else if (error.status === 400) {
            this._router.navigateByUrl('/404-not-found');
          } else {
            // Get the parent url
            const parentUrl = this._router.routerState.snapshot.url.split('/').slice(0, -1).join('/');

            // Navigate to there
            this._router.navigateByUrl(parentUrl);
          }

          // Throw an error
          return throwError(error);
        })
      ).subscribe((simulation) => {

        // this.resetSimulation();

        // Set the selected product
        this.simulation = simulation;

        this.mensualiteId.nativeElement.textContent = simulation.mensualite.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        this.dureeId.nativeElement.textContent = simulation.duree;
        this.nbreMoisId.nativeElement.textContent = simulation.duree * 12;
        this.montantId.nativeElement.textContent = simulation.montant.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

        this.totalInteretsId.nativeElement.textContent = simulation.totalInterets.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        this.coutTotalId.nativeElement.textContent = simulation.coutTotal.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

        this.totalFraisId.nativeElement.textContent = simulation.totalFrais.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        this.droitsEnregistrementId.nativeElement.textContent = simulation.droitsEnregistrement.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        this.conservationFonciereId.nativeElement.textContent = simulation.conservationFonciere.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        this.fraisDiversId.nativeElement.textContent = simulation.fraisDivers.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        this.honorairesNotaireId.nativeElement.textContent = simulation.honorairesNotaire.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

        // Mark for check
        this._changeDetectorRef.markForCheck();
      });

  }

}
