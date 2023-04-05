import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { AnimateCounterService } from '@fuse/services/animate-counter/animate-counter.service';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { catchError, Subject, takeUntil, throwError } from 'rxjs';
import { CategorieSocioProfessionnelle, Nationalite, ObjetFinancement } from 'app/core/referentiel/referentiel.types';
import { SimulationDetaillee } from './simulation-detaillee.types';
import { ReferentielService } from 'app/core/referentiel/referentiel.service';
import { SimulationDetailleeService } from './simulation-detaillee.service';
import * as moment from 'moment';
import { resize } from 'app/modules/common/resize';

@Component({
  selector: 'simulation-detaillee',
  templateUrl: './simulation-detaillee.component.html',
  styleUrls: ['./simulation-detaillee.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [fuseAnimations, resize]
})

export class SimulationDetailleeComponent implements OnInit, OnDestroy {

  isScreenSmall: boolean;
  isXsScreen: boolean;
  animationState: string;
  isVisible: boolean = false;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  categories: CategorieSocioProfessionnelle[];
  nationalites: Nationalite[];
  objetsFinancement: ObjetFinancement[];
  queryParams: Params;
  simulationStepperForm: UntypedFormGroup;
  simulationFormDefaults: any = {
    // profil
    nom: null,
    prenom: null,
    telephone: null,
    email: null,
    dateNaissance: null,
    nationalite: null,
    residantMaroc: null,
    agreements: null,
    // situation
    categorieSocioProfessionnelle: null,
    nomEmployeur: null,
    salaire: null,
    autresRevenus: null,
    creditsEnCours: null,
    // projet
    objetFinancement: null,
    montant: null,
    montantProposition: null,
    duree: null,
    typeTaux: null,
    statutProjet: null,
    nomPromoteur: null
  };

  simulationResultat: SimulationDetaillee;
  @ViewChild('resultat', { read: ElementRef }) public resultat: ElementRef<any>;
  estExpImmoNum: boolean = true;
  estFraisDossNum: boolean = true;
  @ViewChild('mensualiteId') mensualiteId: any;
  @ViewChild('dureeId') dureeId: any;
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
    private _simulationService: SimulationDetailleeService
  ) {

    this.simulationResultat = {
      id: null,
      montantProposition: 0.00,
      duree: 0,
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
        nomPromoteur: [this.simulationFormDefaults.nomPromoteur, [Validators.required]]
      })
    });

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

        // Check if the screen is xsSmall
        this.isXsScreen = !matchingAliases.includes('sm');

        if (this.isScreenSmall) {
          this.animationState = 'largeMobile'
        }
        else {
          this.animationState = 'largeDesktop'
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
  isOverdue(): boolean
  {
      return moment(this.simulationStepperForm.get('step1').get('dateNaissance').value, moment.ISO_8601).isAfter(moment(), 'days');
  }

  /**
   * Reset the form using the default
   */
  reset(): void {
    // this.isVisible = false;
    // this.simulationStepper.reset();
    this.simulationStepperForm.reset(this.simulationFormDefaults);

    // Mensualité
    this._animateCounterService.animateValue(this.mensualiteId, this.simulationResultat.mensualite, 0, 600);
    this._animateCounterService.animateValue(this.dureeId, this.simulationResultat.duree, 0, 600);
    this._animateCounterService.animateValue(this.nbreMoisId, this.simulationResultat.duree * 12, 0, 600);
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

      //     // Log the error
      //     console.error(error);

      //     // if (error.status === 500) {
      //     //   this._router.navigateByUrl('/500-server-error');
      //     // } else if (error.status === 400) {
      //     //   this._router.navigateByUrl('/404-not-found');
      //     // } else {
      //     //   // Get the parent url
      //     //   const parentUrl = this._router.routerState.snapshot.url.split('/').slice(0, -1).join('/');

      //     //   // Navigate to there
      //     //   this._router.navigateByUrl(parentUrl);
      //     // }

           // Throw an error
           return throwError(error);
         })
      )
      .subscribe((response: SimulationDetaillee[]) => {

        console.log("+-+-+- response component", response);

        let simulation = response[0];

        // Mensualité
        this.mensualiteId.nativeElement.textContent = simulation.mensualite.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        this.dureeId.nativeElement.textContent = simulation.duree;
        this.nbreMoisId.nativeElement.textContent = simulation.duree * 12;
        this.montantId.nativeElement.textContent = simulation.montantProposition.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        this.totalInteretsId.nativeElement.textContent = simulation.totalInterets.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        this.assurancesId.nativeElement.textContent = simulation.assurances.toLocaleString('fr-FR', { minimumFractionDigits: 3, maximumFractionDigits: 3 });
        this.tauxParticipationId.nativeElement.textContent = simulation.tauxParticipation.toLocaleString('fr-FR', { minimumFractionDigits: 3, maximumFractionDigits: 3 });
        this.tauxEffectifGlobalId.nativeElement.textContent = simulation.tauxEffectifGlobal.toLocaleString('fr-FR', { minimumFractionDigits: 3, maximumFractionDigits: 3 });
        this.coutTotalId.nativeElement.textContent = simulation.coutTotal.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

        if (simulation.expertiseImmobiliere && simulation.expertiseImmobiliere > 0) {
          this.expertiseImmobiliereId.nativeElement.textContent = Number(simulation.expertiseImmobiliere).toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
          this.estExpImmoNum = true;
        } else {
          simulation.expertiseImmobiliere = 0;
          this.expertiseImmobiliereId.nativeElement.textContent = "GRATUIT";
          this.estExpImmoNum = false;
        }

        if (simulation.fraisDossier && simulation.fraisDossier > 0) {
          this.fraisDossierId.nativeElement.textContent = Number(simulation.fraisDossier).toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
          this.estFraisDossNum = true;
        } else {
          simulation.fraisDossier = 0;
          this.fraisDossierId.nativeElement.textContent = "GRATUIT";
          this.estFraisDossNum = false;
        }

        // Frais
        this.totalFraisId.nativeElement.textContent = simulation.totalFrais.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        this.droitsEnregistrementId.nativeElement.textContent = simulation.droitsEnregistrement.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        this.conservationFonciereId.nativeElement.textContent = simulation.conservationFonciere.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        this.fraisDiversId.nativeElement.textContent = simulation.fraisDivers.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        this.honorairesNotaireId.nativeElement.textContent = simulation.honorairesNotaire.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

        // Set the selected simulation
        this.simulationResultat = simulation;

        if (this.isScreenSmall) {
          // Scroll to result
          this.resultat.nativeElement.scrollIntoView();
        }

        // Mark for check
        this._changeDetectorRef.markForCheck();
      });

  }

  formatMomentToString(date: moment.Moment): string {
    return date.format("DD/MM/YYYY");
  }

}
