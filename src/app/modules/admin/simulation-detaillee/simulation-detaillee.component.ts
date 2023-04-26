import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { catchError, Subject, takeUntil, throwError } from 'rxjs';
import { CategorieSocioProfessionnelle, Nationalite, ObjetFinancement } from 'app/core/referentiel/referentiel.types';
import { SimulationDetaillee } from './simulation-detaillee.types';
import { ReferentielService } from 'app/core/referentiel/referentiel.service';
import { SimulationDetailleeService } from './simulation-detaillee.service';
import * as moment from 'moment';
import { resize } from 'app/modules/common/resize';
import { DetailsSimulationComponent } from 'app/modules/common/details-simulation/details-simulation.component';

@Component({
  selector: 'simulation-detaillee',
  templateUrl: './simulation-detaillee.component.html',
  styleUrls: ['./simulation-detaillee.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [fuseAnimations, resize]
})

export class SimulationDetailleeComponent implements OnInit, OnDestroy {

  @ViewChild(DetailsSimulationComponent) detailsSimulation;

  drawerOpened: boolean = false;

  isScreenSmall: boolean;
  isXsScreen: boolean;
  animationState: string;
  isVisible: boolean = false;

  categories: CategorieSocioProfessionnelle[];
  nationalites: Nationalite[];
  objetsFinancement: ObjetFinancement[];
  queryParams: Params;
  simulationStepperForm: UntypedFormGroup;
  simulationFormDefaults: any = {
    // profil
    nom: 'test1',
    prenom: 'test1',
    telephone: '0522111111',
    email: 'test1@test1.com',
    dateNaissance: null,
    nationalite: 'MA',
    residantMaroc: 'true',
    agreements: true,
    // situation
    categorieSocioProfessionnelle: null, // 'SASP',
    nomEmployeur: 'Employeur',
    salaire: 500000,
    autresRevenus: 200000,
    creditsEnCours: 3000,
    // projet
    objetFinancement: 'ACQU',
    montant: 500000,
    montantProposition: 500000,
    duree: 240,
    typeTaux: null, // 'FIXE',
    statutProjet: 'statut1',
    nomPromoteur: 'Promoteur'
  };
  tab = ['step1', 'step2', 'step3'];

  simulationResultat: SimulationDetaillee;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   */
  constructor(
    private _router: Router,
    private _changeDetectorRef: ChangeDetectorRef,
    private _fuseMediaWatcherService: FuseMediaWatcherService,
    private _formBuilder: UntypedFormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _referentielService: ReferentielService,
    private _simulationService: SimulationDetailleeService
  ) {

    this.simulationResultat = {
      id: null,
      montantProposition: 0.00,
      duree: 0,
      nbreAnnee: 0,
      nbreMois: 0,
      mensualite: 0.00,
      tauxEffectifGlobal: 0,
      tauxParticipation: 0,
      assurances: 0,
      totalInterets: 0.00,
      coutTotal: 0.00,
      fraisDossier: 0.00,
      expertiseImmobiliere: 0.00,

      droitsEnregistrement: 0.00,
      conservationFonciere: 0.00,
      fraisDivers: 0.00,
      honorairesNotaire: 0.00,

      get totalFrais() {
        return this.droitsEnregistrement + this.conservationFonciere + this.fraisDivers + this.honorairesNotaire
      }
    }

    // Horizontal stepper form
    this.simulationStepperForm = this._formBuilder.group({
      step1: this._formBuilder.group({
        nom: [this.simulationFormDefaults.nom, [Validators.required]],
        prenom: [this.simulationFormDefaults.prenom, [Validators.required]],
        telephone: [this.simulationFormDefaults.telephone, [Validators.required]],
        email: [this.simulationFormDefaults.email, [Validators.email, Validators.required]],
        dateNaissance: [this.simulationFormDefaults.dateNaissance, [Validators.required]],
        nationalite: [this.simulationFormDefaults.nationalite, [Validators.required]],
        residantMaroc: [this.simulationFormDefaults.residantMaroc, [Validators.required]],
        agreements: [this.simulationFormDefaults.agreements, [Validators.required]],
      }),
      step2: this._formBuilder.group({
        categorieSocioProfessionnelle: [this.simulationFormDefaults.categorieSocioProfessionnelle, [Validators.required]],
        nomEmployeur: [this.simulationFormDefaults.nomEmployeur, [Validators.required]],
        salaire: [this.simulationFormDefaults.salaire, [Validators.required]],
        autresRevenus: [this.simulationFormDefaults.autresRevenus, [Validators.required]],
        creditsEnCours: [this.simulationFormDefaults.creditsEnCours, [Validators.required]]
      }),
      step3: this._formBuilder.group({
        objetFinancement: [this.simulationFormDefaults.objetFinancement, [Validators.required]],
        montant: [this.simulationFormDefaults.montant, [Validators.required]],
        montantProposition: [this.simulationFormDefaults.montantProposition, [Validators.required]],
        duree: [this.simulationFormDefaults.duree, [Validators.required]],
        typeTaux: [this.simulationFormDefaults.typeTaux, [Validators.required]],
        statutProjet: [this.simulationFormDefaults.statutProjet, [Validators.required]],
        nomPromoteur: [this.simulationFormDefaults.nomPromoteur]
      })
    });
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  ngOnInit(): void {

    // this.isVisible = true;
    
    // Subscribe to media changes
    this._fuseMediaWatcherService.onMediaChange$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(({ matchingAliases }) => {

        // Check if the screen is small
        this.isScreenSmall = !matchingAliases.includes('md');

        // Check if the screen is xsSmall
        this.isXsScreen = !matchingAliases.includes('sm');

        if (this.isScreenSmall) {
          this.animationState = 'largeMobile'
        }
        else {
          this.animationState = this.isVisible ? 'smallDesktop' : 'largeDesktop'
        }
      });

    // Subscribe to query params change
    this._activatedRoute.queryParams
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((queryParams) => {

        // Store the query params
        this.queryParams = queryParams;

        // Fill the form with the values from query
        // params without emitting any form events
        this.simulationStepperForm.get('step1').get('nom').setValue(queryParams?.nom ?? this.simulationFormDefaults.nom);
        this.simulationStepperForm.get('step1').get('prenom').setValue(queryParams?.prenom ?? this.simulationFormDefaults.prenom);
        this.simulationStepperForm.get('step1').get('telephone').setValue(queryParams?.telephone ?? this.simulationFormDefaults.telephone);
        this.simulationStepperForm.get('step1').get('email').setValue(queryParams?.email ?? this.simulationFormDefaults.email);
        this.simulationStepperForm.get('step1').get('nationalite').setValue(queryParams?.nationaliteCode ?? this.simulationFormDefaults.nationalite);
        this.simulationStepperForm.get('step1').get('residantMaroc').setValue(queryParams?.residentMarocain ?? this.simulationFormDefaults.residantMaroc);
        this.simulationStepperForm.get('step1').get('agreements').setValue(queryParams?.agreements ?? this.simulationFormDefaults.agreements);
        this.simulationStepperForm.get('step2').get('categorieSocioProfessionnelle').setValue(queryParams?.cspCode ?? this.simulationFormDefaults.categorieSocioProfessionnelle);
        this.simulationStepperForm.get('step3').get('montantProposition').setValue(queryParams?.montant ?? this.simulationFormDefaults.montantProposition);
        this.simulationStepperForm.get('step3').get('duree').setValue(queryParams?.duree ?? this.simulationFormDefaults.duree);
      });

    // Get the categories
    this._referentielService.categoriesSocioProf$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((response: CategorieSocioProfessionnelle[]) => {

        // Update the categories
        this.categories = response;

        // Mark for check
        this._changeDetectorRef.markForCheck();
      });

    // Get the nationalites
    this._referentielService.nationalites$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((response: Nationalite[]) => {

        // Update the nationalites
        this.nationalites = response;

        // Mark for check
        this._changeDetectorRef.markForCheck();
      });

    // Get the objets de financement
    this._referentielService.objetsFinancement$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((response: ObjetFinancement[]) => {

        // Update the objets de financement
        this.objetsFinancement = response;

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
   * Check if the task is overdue or not
   */
  isOverdue(): boolean {
    return moment(this.simulationStepperForm.get('step1').get('dateNaissance').value, moment.ISO_8601).isAfter(moment(), 'days');
  }

  /**
   * Reset the form using the default
   */
  newSimulation(): void {
    // this.simulationStepperForm.reset(this.simulationFormDefaults);
    this.simulationStepperForm.get('step3').get('montant').reset();
    this.simulationStepperForm.get('step3').get('duree').reset();

    this.detailsSimulation.viderSimulation();
  }

  /**
   * Simuler le crédit
   */
  simuler(): void {

    this.animationState = 'smallDesktop';
    this.isVisible = true;

    const critere = {
      provenance: "SITE",
      type: "personnePhysique",
      codeApporteur: "100",
      codeUtilisateur: "WEB",
      // statutProjet: this.simulationStepperForm.get('step3').get('statutProjet').value,
      objetFinancement: this.simulationStepperForm.get('step3').get('objetFinancement').value,
      montant: this.simulationStepperForm.get('step3').get('montant').value,
      montantProposition: this.simulationStepperForm.get('step3').get('montantProposition').value,
      duree: this.simulationStepperForm.get('step3').get('duree').value,
      typeTaux: this.simulationStepperForm.get('step3').get('typeTaux').value,
      nomPromoteur: this.simulationStepperForm.get('step3').get('nomPromoteur').value,
      tiers: {
        nom: this.simulationStepperForm.get('step1').get('nom').value,
        prenom: this.simulationStepperForm.get('step1').get('prenom').value,
        categorieSocioProfessionnelle: this.simulationStepperForm.get('step2').get('categorieSocioProfessionnelle').value,
        // numIdentite: this.simulationStepperForm.get('step3').get('cin').value,
        residantMaroc: this.simulationStepperForm.get('step1').get('residantMaroc').value,
        nationalite: this.simulationStepperForm.get('step1').get('nationalite').value,
        segment: "NV",
        dateNaissance: this.formatMomentToString(this.simulationStepperForm.get('step1').get('dateNaissance').value),
        salaire: this.simulationStepperForm.get('step2').get('salaire').value,
        autresRevenus: this.simulationStepperForm.get('step2').get('autresRevenus').value,
        creditsEnCours: this.simulationStepperForm.get('step2').get('creditsEnCours').value,
        telephone: this.simulationStepperForm.get('step1').get('telephone').value,
        email: this.simulationStepperForm.get('step1').get('email').value,
        nomEmployeur: this.simulationStepperForm.get('step2').get('nomEmployeur').value,
      }
    }

    // Get the product by id
    this._simulationService.simuler(critere)
      .pipe(
        // Error here means the requested is not available
        catchError((error) => {
          // Throw an error
          return throwError(error);
        })
      )
      .subscribe((response: SimulationDetaillee[]) => {

        let simulation = response[0];
        simulation.nbreAnnee = Math.trunc(simulation.duree / 12);
        simulation.nbreMois = simulation.duree % 12;

        // Set the selected simulation
        this.simulationResultat = {
          // Mon profil
          nom: this.simulationStepperForm.get('step1').get('nom').value,
          prenom: this.simulationStepperForm.get('step1').get('prenom').value,
          telephone: this.simulationStepperForm.get('step1').get('telephone').value,
          email: this.simulationStepperForm.get('step1').get('email').value,
          dateNaissance: this.formatMomentToString(this.simulationStepperForm.get('step1').get('dateNaissance').value),
          nationalite: this.simulationStepperForm.get('step1').get('nationalite').value,
          residantMaroc: this.simulationStepperForm.get('step1').get('residantMaroc').value,
          // ma situation
          categorieSocioProfessionnelle: this.simulationStepperForm.get('step2').get('categorieSocioProfessionnelle').value,
          nomEmployeur: this.simulationStepperForm.get('step2').get('nomEmployeur').value,
          salaire: this.simulationStepperForm.get('step2').get('salaire').value,
          autresRevenus: this.simulationStepperForm.get('step2').get('autresRevenus').value,
          creditsEnCours: this.simulationStepperForm.get('step2').get('creditsEnCours').value,
          // Mon projet
          objetFinancement: this.simulationStepperForm.get('step3').get('objetFinancement').value,
          nomPromoteur: this.simulationStepperForm.get('step3').get('nomPromoteur').value,
          statutProjet: this.simulationStepperForm.get('step3').get('statutProjet').value,
          typeTaux: this.simulationStepperForm.get('step3').get('typeTaux').value,
          newSimulation: true,
          ...simulation
        };

        this.detailsSimulation.remplirSimulation(this.simulationResultat);

        if (this.isScreenSmall) {
          this.detailsSimulation.scrollToResultat();
        }

        // Add query params using the router
        this._router.navigate([], {
          // fragment: '',
          queryParams: {
            // Mon profil
            nom: this.simulationStepperForm.get('step1').get('nom').value,
            prenom: this.simulationStepperForm.get('step1').get('prenom').value,
            telephone: this.simulationStepperForm.get('step1').get('telephone').value,
            email: this.simulationStepperForm.get('step1').get('email').value,
            dateNaissance: this.formatMomentToString(this.simulationStepperForm.get('step1').get('dateNaissance').value),
            nationalite: this.simulationStepperForm.get('step1').get('nationalite').value,
            residantMaroc: this.simulationStepperForm.get('step1').get('residantMaroc').value,
            // ma situation
            categorieSocioProfessionnelle: this.simulationStepperForm.get('step2').get('categorieSocioProfessionnelle').value,
            nomEmployeur: this.simulationStepperForm.get('step2').get('nomEmployeur').value,
            salaire: this.simulationStepperForm.get('step2').get('salaire').value,
            autresRevenus: this.simulationStepperForm.get('step2').get('autresRevenus').value,
            creditsEnCours: this.simulationStepperForm.get('step2').get('creditsEnCours').value,
            // Mon projet
            montant: this.simulationStepperForm.get('step3').get('montant').value,
            objetFinancement: this.simulationStepperForm.get('step3').get('objetFinancement').value,
            montantProposition: this.simulationStepperForm.get('step3').get('montantProposition').value,
            duree: this.simulationStepperForm.get('step3').get('duree').value,
            nomPromoteur: this.simulationStepperForm.get('step3').get('nomPromoteur').value,
            statutProjet: this.simulationStepperForm.get('step3').get('statutProjet').value,
            typeTaux: this.simulationStepperForm.get('step3').get('typeTaux').value,
          },
          relativeTo: this._activatedRoute
        });

        // Mark for check
        this._changeDetectorRef.markForCheck();
      });

  }

  formatMomentToString(date: moment.Moment): string {
    return date.format("DD/MM/YYYY");
  }

}
