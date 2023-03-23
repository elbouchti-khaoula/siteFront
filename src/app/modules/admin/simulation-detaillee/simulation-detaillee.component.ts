import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { AnimateCounterService } from '@fuse/services/animate-counter/animate-counter.service';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { catchError, Subject, takeUntil, throwError } from 'rxjs';
import { CategorieSocioProfessionnelle, Nationalite, ObjetFinancement } from 'app/modules/pages/common/referentiel.types';
import { SimulationPersonnalisee } from 'app/modules/pages/simulation-personnalisee/simulation.types';
import { ReferentielService } from 'app/modules/pages/common/referentiel.service';
import { SimulationService } from 'app/modules/pages/simulation-personnalisee/simulation.service';
import * as moment from 'moment';

@Component({
  selector: 'simulation-detaillee',
  templateUrl: './simulation-detaillee.component.html',
  styleUrls: ['./simulation-detaillee.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class SimulationDetailleeComponent implements OnInit, OnDestroy {

  isScreenSmall: boolean;
  isXsScreen: boolean;
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
    nationaliteCode: null,
    residentMarocain: null,
    agreements: null,
    // situation
    cspCode: null,
    employeur: null,
    salaireAnnuelNet: null,
    autresRevenus: null,
    mensualitesCreditsEnCours: null,
    // projet
    objetFinancementCode: null,
    prixBien: null,
    montant: null,
    duree: null,
    typeTaux: null,
    statutProjet: null,
    promoteur: null
  };

  simulationResultat: SimulationPersonnalisee;
  @ViewChild('resultat', { read: ElementRef }) public resultat: ElementRef<any>;
  isVisible: boolean = false;
  estExpImmoNum: boolean = true;
  estFraisDossNum: boolean = true;
  @ViewChild('mensualiteId') mensualiteId: any;
  @ViewChild('dureeId') dureeId: any;
  @ViewChild('nbreMoisId') nbreMoisId: any;
  @ViewChild('montantId') montantId: any;
  @ViewChild('totalInteretsId') totalInteretsId: any;
  @ViewChild('coutTotalId') coutTotalId: any;
  @ViewChild('tauxMoyenId') tauxMoyenId: any;
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
    private _simulationService: SimulationService
  ) {

    this.simulationResultat = {
      montant: 0.00,
      duree: 0,
      mensualite: 0.00,
      tauxMoyen: 0.00,
      totalInterets: 0.00,
      coutTotal: 0.00,
      expertiseImmobiliere: 0.00,
      fraisDossier: 0.00,

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
        nationaliteCode: [this.simulationFormDefaults.nationaliteCode, [Validators.required]],
        residentMarocain: [this.simulationFormDefaults.residentMarocain, [Validators.required]],
        agreements: [this.simulationFormDefaults.agreements, [Validators.required]],
      }),
      step2: this._formBuilder.group({
        cspCode: [this.simulationFormDefaults.cspCode, [Validators.required]],
        employeur: [this.simulationFormDefaults.employeur, [Validators.required]],
        salaireAnnuelNet: [this.simulationFormDefaults.salaireAnnuelNet, [Validators.required]],
        autresRevenus: [this.simulationFormDefaults.autresRevenus, [Validators.required]],
        mensualitesCreditsEnCours: [this.simulationFormDefaults.mensualitesCreditsEnCours, [Validators.required]]
      }),
      step3: this._formBuilder.group({
        objetFinancementCode: [this.simulationFormDefaults.objetFinancementCode, [Validators.required]],
        prixBien: [this.simulationFormDefaults.prixBien, [Validators.required]],
        montant: [this.simulationFormDefaults.montant, [Validators.required]],
        duree: [this.simulationFormDefaults.duree, [Validators.required]],
        typeTaux: [this.simulationFormDefaults.typeTaux, [Validators.required]],
        statutProjet: [this.simulationFormDefaults.statutProjet, [Validators.required]],
        promoteur: [this.simulationFormDefaults.promoteur, [Validators.required]]
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
        this.simulationStepperForm.get('step1').get('nationaliteCode').setValue(queryParams?.nationaliteCode ?? this.simulationFormDefaults.nationaliteCode);
        this.simulationStepperForm.get('step1').get('residentMarocain').setValue(queryParams?.residentMarocain ?? this.simulationFormDefaults.residentMarocain);
        this.simulationStepperForm.get('step1').get('agreements').setValue(queryParams?.agreements ?? this.simulationFormDefaults.agreements);
        this.simulationStepperForm.get('step2').get('cspCode').setValue(queryParams?.cspCode ?? this.simulationFormDefaults.cspCode);
        this.simulationStepperForm.get('step3').get('montant').setValue(queryParams?.montant ?? this.simulationFormDefaults.montant);
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

    // Get the categories
    this._referentielService.nationalites$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((response: Nationalite[]) => {

        // Update the categories
        this.nationalites = response;

        // Mark for check
        this._changeDetectorRef.markForCheck();
      });

    // Get the objets de financement
    this._referentielService.objetsFinancement$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((response: ObjetFinancement[]) => {

        // Update the categories
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
    this._animateCounterService.animateValue(this.tauxMoyenId, this.simulationResultat.tauxMoyen, 0, 600);

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

    this.isVisible = true;

    const critere = {
      montant: this.simulationStepperForm.get('step3').get('montant').value,
      duree: this.simulationStepperForm.get('step3').get('duree').value,
      cspCode: this.simulationStepperForm.get('step2').get('cspCode').value,
      nationaliteCode: this.simulationStepperForm.get('step1').get('nationaliteCode').value,
      residentMarocain: this.simulationStepperForm.get('step1').get('residentMarocain').value,
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
      ).subscribe((response) => {

        // Mensualité
        this.mensualiteId.nativeElement.textContent = response.mensualite.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        this.dureeId.nativeElement.textContent = response.duree;
        this.nbreMoisId.nativeElement.textContent = response.duree * 12;
        this.montantId.nativeElement.textContent = response.montant.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        this.totalInteretsId.nativeElement.textContent = response.totalInterets.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        this.coutTotalId.nativeElement.textContent = response.coutTotal.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        this.tauxMoyenId.nativeElement.textContent = response.tauxMoyen.toLocaleString('fr-FR', { minimumFractionDigits: 3, maximumFractionDigits: 3 });

        if (this.simulationResultat.expertiseImmobiliere && this.simulationResultat.expertiseImmobiliere > 0) {
          this.expertiseImmobiliereId.nativeElement.textContent = Number(response.expertiseImmobiliere).toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
          this.estExpImmoNum = true;
        } else {
          response.expertiseImmobiliere = 0;
          this.expertiseImmobiliereId.nativeElement.textContent = "GRATUIT";
          this.estExpImmoNum = false;
        }

        if (this.simulationResultat.fraisDossier && this.simulationResultat.fraisDossier > 0) {
          this.fraisDossierId.nativeElement.textContent = Number(response.fraisDossier).toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
          this.estFraisDossNum = true;
        } else {
          response.fraisDossier = 0;
          this.fraisDossierId.nativeElement.textContent = "GRATUIT";
          this.estFraisDossNum = false;
        }

        // Frais
        this.totalFraisId.nativeElement.textContent = response.totalFrais.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        this.droitsEnregistrementId.nativeElement.textContent = response.droitsEnregistrement.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        this.conservationFonciereId.nativeElement.textContent = response.conservationFonciere.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        this.fraisDiversId.nativeElement.textContent = response.fraisDivers.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        this.honorairesNotaireId.nativeElement.textContent = response.honorairesNotaire.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

        // Set the selected simulation
        this.simulationResultat = response;

        if (this.isScreenSmall) {
          // Scroll to result
          this.resultat.nativeElement.scrollIntoView();
        }

        // Mark for check
        this._changeDetectorRef.markForCheck();
      });

  }

}
