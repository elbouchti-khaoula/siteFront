import { ChangeDetectorRef, Component, EventEmitter, ElementRef, Input, OnDestroy, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { CategorieSocioProfessionnelle, Nationalite, ObjetFinancement } from 'app/core/services/referentiel/referentiel.types';
import { EmployeurConventionne, PromoteurConventionne, SimulationDetaillee } from 'app/core/services/projects/projects.types';
import { CSP_PRIVE, CSP_PUBLIC, ReferentielService } from 'app/core/services/referentiel/referentiel.service';
import { SimulationDetailleeService } from 'app/core/services/projects/projects.service';
import * as moment from 'moment';
import { resize } from 'app/core/animations/resize';
import { DetailsSimulationComponent } from 'app/modules/common/details-simulation/details-simulation.component';
import { FuseUtilsService } from '@fuse/services/utils';
import { MatSelectChange } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { Observable, debounceTime, filter, map, Subject, takeUntil, catchError, throwError } from 'rxjs';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { SalesForceService } from 'app/core/services/salesforce/salesforce.service';
import { AuthenticationService } from 'app/core/auth/authentication.service';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { User } from 'app/core/user/user.types';
import { UserService } from 'app/core/user/user.service';

@Component({
  selector: 'simulation-detaillee',
  templateUrl: './simulation-detaillee.component.html',
  styleUrls: ['./simulation-detaillee.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [fuseAnimations, resize]
})

export class SimulationDetailleeComponent implements OnInit, OnDestroy {

  user: User;

  @Input() debounce: number = 300;
  @Input() minLength: number = 3;
  @Output() search: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('matAutocompletePromoteur') matAutocompletePromoteur: MatAutocomplete;
  @ViewChild('matAutocompleteEmployeur') matAutocompleteEmployeur: MatAutocomplete;
  isCaptchaValid: boolean = false;

  resultEmployeurs: any[];
  searchEmployeurControl: UntypedFormControl = new UntypedFormControl();

  resultPromoteurs: any[];
  searchPromoteurControl: UntypedFormControl = new UntypedFormControl();

  employeurs: EmployeurConventionne[];
  employeurs$: Observable<EmployeurConventionne[]>;
  promoteurs: PromoteurConventionne[];
  promoteurs$: Observable<PromoteurConventionne[]>;
  listEmployeurs: EmployeurConventionne[];
  listPromoteurs: PromoteurConventionne[];

  countSimulation: number;

  @ViewChild(DetailsSimulationComponent) detailsSimulation;
  isScreenSmall: boolean;
  isXsScreen: boolean;
  animationState: string;
  isVisible: boolean = false;
  showEmployeur: boolean = true;

  categories: CategorieSocioProfessionnelle[];
  nationalites: Nationalite[];
  objetsFinancement: ObjetFinancement[];
  queryParams: Params;
  simulationStepperForm: UntypedFormGroup;
  simulationFormDefaults: any = {
    // profil
    nom: null, // 'test1',
    prenom: null, // 'test1',
    telephone: null, // '0522111111',
    email: null, // 'test1@test1.com',
    dateNaissance: null,
    nationalite: null, // 'MA',
    residantMaroc: null, // 'true',
    agreements: null, // true,
    // situation
    categorieSocioProfessionnelle: null, // 'SASP',
    nomEmployeur: null, // 'WAFA SALAF',
    // anciennete: 12,
    salaire: null, // 500000,
    autresRevenus: null, // 200000,
    creditsEnCours: null, // 3000,
    // projet
    objetFinancement: null, // 'ACQU',
    montant: null, // 500000,
    montantProposition: null, // 500000,
    duree: null, // 240,
    typeTaux: null, // 'FIXE',
    statutProjet: 'statut1',
    nomPromoteur: null, // 'Promoteur'
  };
  tab = ['step1', 'step2', 'step3'];

  @ViewChild('resultat', { read: ElementRef }) public resultat: ElementRef<any>;
  simulationResultat: any;
  simulationDetaillee: SimulationDetaillee
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  selectedStatutProjetLabel: string;

  /**
   * Constructor
   */
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _changeDetectorRef: ChangeDetectorRef,
    private _fuseMediaWatcherService: FuseMediaWatcherService,
    private _formBuilder: UntypedFormBuilder,
    private _referentielService: ReferentielService,
    private _simulationService: SimulationDetailleeService,
    private _salesForceService: SalesForceService,
    private _fuseUtilsService: FuseUtilsService,
    private _authenticationService: AuthenticationService,
    private _fuseConfirmationService: FuseConfirmationService,
    private _userService: UserService
  ) {

    // Horizontal stepper form
    this.simulationStepperForm = this._formBuilder.group({
      step1: this._formBuilder.group({
        nom           : [this.simulationFormDefaults.nom, [Validators.required]],
        prenom        : [this.simulationFormDefaults.prenom, [Validators.required]],
        telephone     : [this.simulationFormDefaults.telephone, [Validators.required]],
        email         : [this.simulationFormDefaults.email, [Validators.email, Validators.required]],
        dateNaissance : [this.simulationFormDefaults.dateNaissance, [this.olderThanValidator(18), Validators.required]],
        nationalite   : [this.simulationFormDefaults.nationalite, [Validators.required]],
        residantMaroc : [this.simulationFormDefaults.residantMaroc, [Validators.required]],
        agreements    : [this.simulationFormDefaults.agreements, [Validators.required]],
      }),
      step2: this._formBuilder.group({
        categorieSocioProfessionnelle : [this.simulationFormDefaults.categorieSocioProfessionnelle, [Validators.required]],
        nomEmployeur                  : [this.simulationFormDefaults.nomEmployeur],
        // anciennete                 : [this.simulationFormDefaults.anciennete, [Validators.required]],
        salaire                       : [this.simulationFormDefaults.salaire, [Validators.required]],
        autresRevenus                 : [this.simulationFormDefaults.autresRevenus],
        creditsEnCours                : [this.simulationFormDefaults.creditsEnCours]
      }),
      step3: this._formBuilder.group({
        objetFinancement    : [this.simulationFormDefaults.objetFinancement, [Validators.required]],
        montant             : [this.simulationFormDefaults.montant, [Validators.required]],
        montantProposition  : [this.simulationFormDefaults.montantProposition, [Validators.required]],
        duree               : [this.simulationFormDefaults.duree, [Validators.required]],
        typeTaux            : [this.simulationFormDefaults.typeTaux, [Validators.required]],
        statutProjet        : [this.simulationFormDefaults.statutProjet, [Validators.required]],
        nomPromoteur        : [this.simulationFormDefaults.nomPromoteur]
      })
    });

  }

  olderThanValidator = (minAge: number): ValidatorFn => control =>
    (new Date()).getFullYear() - (new Date(control.value)).getFullYear() < minAge
      ? { younger: { minAge } }
      : null;

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  ngOnInit(): void {
    // this.isVisible = true;

    // get count mes simulations
    this.countSimulation = this._activatedRoute.snapshot.data.countSimulation;

    this._simulationService.getEmployeursConventionnes()
      .pipe(
        takeUntil(this._unsubscribeAll))
      .subscribe((employeur: EmployeurConventionne[]) => {
        this.listEmployeurs = employeur;

        this._changeDetectorRef.markForCheck();
      });
    this.employeurs$ = this._simulationService.employeurs$;

    this._simulationService.getPromoteursConventionnes()
      .pipe(
        takeUntil(this._unsubscribeAll))
      .subscribe((promoteur: PromoteurConventionne[]) => {
        this.listPromoteurs = promoteur;

        this._changeDetectorRef.markForCheck();
      });
    this.promoteurs$ = this._simulationService.promoteurs$;

    this.searchEmployeurControl.valueChanges
      .pipe(
        debounceTime(this.debounce),
        takeUntil(this._unsubscribeAll),
        map((value) => {
          if (!value || value.length < this.minLength) {
            this.resultEmployeurs = null;
          }
          return value;
        }),
        filter(value => value && value.length >= this.minLength)
      ).subscribe((value) => {
        this.getEmployeurs(value).subscribe((employeurs) => {
          this.employeurs = employeurs;

          this.resultEmployeurs = [...employeurs];
          this._changeDetectorRef.markForCheck();
          this.search.next(this.resultEmployeurs);
        });
      });

    this.searchPromoteurControl.valueChanges
      .pipe(
        debounceTime(this.debounce),
        takeUntil(this._unsubscribeAll),
        map((value) => {
          if (!value || value.length < this.minLength) {
            this.resultPromoteurs = null;
          }
          return value;
        }),
        filter(value => value && value.length >= this.minLength)
      ).subscribe((value) => {
        this.getPromoteurs(value).subscribe((promoteurs) => {
          this.promoteurs = promoteurs;

          this.resultPromoteurs = [...promoteurs];
          this._changeDetectorRef.markForCheck();
          this.search.next(this.resultPromoteurs);
        });
      });

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
        this.simulationStepperForm.get('step1').get('nationalite').setValue(queryParams?.nationaliteCode ?? this.simulationFormDefaults.nationalite);
        this.simulationStepperForm.get('step1').get('residantMaroc').setValue(queryParams?.residentMarocain ?? this.simulationFormDefaults.residantMaroc);
        this.simulationStepperForm.get('step1').get('agreements').setValue(queryParams?.agreements ?? this.simulationFormDefaults.agreements);
        // ma situation
        this.simulationStepperForm.get('step2').get('categorieSocioProfessionnelle').setValue(queryParams?.cspCode ?? this.simulationFormDefaults.categorieSocioProfessionnelle);
        // Mon projet
        this.simulationStepperForm.get('step3').get('montantProposition').setValue(queryParams?.montant ?? this.simulationFormDefaults.montantProposition);
        this.simulationStepperForm.get('step3').get('duree').setValue(queryParams?.duree ?? this.simulationFormDefaults.duree);
        this.simulationStepperForm.get('step3').get('objetFinancement').setValue(queryParams?.objetFinancement ?? this.simulationFormDefaults.objetFinancement);
      });

    this._initInfosConnectedUser();

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

    // Subscribe to motif change
    this.simulationStepperForm.get('step2').get('categorieSocioProfessionnelle').valueChanges
      .pipe(
        debounceTime(100),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((value) => {
        this.showEmployeur = value === CSP_PRIVE || value === CSP_PUBLIC;
      });

    this.showEmployeur = this.simulationStepperForm.get('step2').get('categorieSocioProfessionnelle').value === CSP_PRIVE
      || this.simulationStepperForm.get('step2').get('categorieSocioProfessionnelle').value === CSP_PUBLIC;
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

  getEmployeurs(search: string = ''): Observable<EmployeurConventionne[]> {
    return this.employeurs$.pipe(
      map((response) => {
        let employeurs = response;
        if (search) {
          employeurs = employeurs.filter(employeur => employeur.libelle && employeur.libelle.toLowerCase().includes(search.toLowerCase()));
        }
        return employeurs;
      })
    );
  }

  getPromoteurs(search: string = ''): Observable<PromoteurConventionne[]> {
    return this.promoteurs$.pipe(
      map((response) => {
        let promoteurs = response;
        if (search) {
          promoteurs = promoteurs.filter(promoteur => promoteur.libelle && promoteur.libelle.toLowerCase().includes(search.toLowerCase()));
        }
        return promoteurs;
      })
    );
  }

  selectedStatutProjet(event: MatSelectChange) {
    this.selectedStatutProjetLabel = (event.source.selected as MatOption).viewValue;
  }

  /**
   * Reset the form using the default
   */
  // newSimulation(): void {
  //   // this.simulationStepperForm.reset(this.simulationFormDefaults);
  //   this.simulationStepperForm.get('step3').get('montant').reset();
  //   this.simulationStepperForm.get('step3').get('duree').reset();

  //   this.detailsSimulation.viderSimulation();
  // }

  /**
   * Simuler le crédit
   */
  simuler(): void {

    const critere = {
      provenance: "SITE",
      type: "personnePhysique",
      codeApporteur: "100",
      codeUtilisateur: "WEB",
      objetFinancement: this.simulationStepperForm.get('step3').get('objetFinancement').value,
      montant: Number(this.simulationStepperForm.get('step3').get('montant').value.toString().replace(/\D/g, '')),
      montantProposition: Number(this.simulationStepperForm.get('step3').get('montantProposition').value.toString().replace(/\D/g, '')),
      duree: Number(this.simulationStepperForm.get('step3').get('duree').value),
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
        salaire: Number(this.simulationStepperForm.get('step2').get('salaire').value.toString().replace(/\D/g, '')),
        autresRevenus: this.simulationStepperForm.get('step2').get('autresRevenus').value ? Number(this.simulationStepperForm.get('step2').get('autresRevenus').value.toString().replace(/\D/g, '')) : null,
        creditsEnCours: this.simulationStepperForm.get('step2').get('creditsEnCours').value ? Number(this.simulationStepperForm.get('step2').get('creditsEnCours').value.toString().replace(/\D/g, '')) : null,
        telephone: this.simulationStepperForm.get('step1').get('telephone').value.replace(/-/g, '').substring(0, 10),
        email: this.simulationStepperForm.get('step1').get('email').value,
        nomEmployeur: this.simulationStepperForm.get('step2').get('nomEmployeur').value,
      }
    }

    // simuler crédit
    this._simulationService.simuler(critere)
      .pipe(
        // Error here means the requested is not available
        catchError((error) => {

          // Log the error
          console.error(error);

          if (error.status === 500) {
            this._router.navigateByUrl('/500-server-error');
          } else if (error.status === 404) {
            // Open the confirmation dialog
            this._fuseConfirmationService.open(
              {
                "title": "Simulation détaillée",
                "message": error.message, //"Nous vous invitons à vérifier les informations saisies",
                "icon": {
                  "show": true,
                  "name": "heroicons_outline:information-circle",
                  "color": "warn"
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
          } else {
            // Get the parent url
            const parentUrl = this._router.routerState.snapshot.url.split('/').slice(0, -1).join('/');

            // Navigate to there
            this._router.navigateByUrl(parentUrl);
          }

          // Throw an error
          return throwError(() => error);
        })
      )
      .subscribe((response: SimulationDetaillee) => {

        this.simulationDetaillee = response;

        // Set the selected simulation
        this.simulationResultat = {
          codeApporteur: "100",
          codeUtilisateur: "WEB",
          // Mon profil
          nom: this.simulationStepperForm.get('step1').get('nom').value,
          prenom: this.simulationStepperForm.get('step1').get('prenom').value,
          telephone: this.simulationStepperForm.get('step1').get('telephone').value.replace(/-/g, '').substring(0, 10),
          email: this.simulationStepperForm.get('step1').get('email').value,
          dateNaissance: this.formatMomentToString(this.simulationStepperForm.get('step1').get('dateNaissance').value),
          nationalite: this.nationalites?.find((e) => e.code === this.simulationStepperForm.get('step1').get('nationalite').value)?.libelle ?? "",
          residantMaroc: this.simulationStepperForm.get('step1').get('residantMaroc').value ? "Oui" : "Non",
          // ma situation
          categorieSocioProfessionnelle: this.categories?.find((e) => e.code === this.simulationStepperForm.get('step2').get('categorieSocioProfessionnelle').value)?.libelle ?? "",
          nomEmployeur: this.simulationStepperForm.get('step2').get('nomEmployeur').value,
          // anciennete: this.simulationStepperForm.get('step2').get('anciennete').value,
          salaire: this._fuseUtilsService.numberFormat(this.simulationStepperForm.get('step2').get('salaire').value + this.simulationStepperForm.get('step2').get('autresRevenus').value, 2, '.', ' '),
          creditsEnCours: this._fuseUtilsService.numberFormat(this.simulationStepperForm.get('step2').get('creditsEnCours').value, 2, '.', ' '),
          // Mon projet
          objetFinancement: this.objetsFinancement?.find((e) => e.code === this.simulationStepperForm.get('step3').get('objetFinancement').value)?.libelle ?? "",
          nomPromoteur: this.simulationStepperForm.get('step3').get('nomPromoteur').value,
          statutProjet: this.selectedStatutProjetLabel,
          typeTaux: this.simulationStepperForm.get('step3').get('typeTaux').value ? "Valeur Fixe" : "Valeur variable",
          estConsultation: false,
          ...this._simulationService.convertSimulationToString(this.simulationDetaillee)
        };

        if (!this.isScreenSmall && this.animationState !== 'smallDesktop') {
          this.animationState = 'smallDesktop';
        }
        this.isVisible = true;

        if (this.isScreenSmall) {
          setTimeout(() => {
            // Scroll to result
            this.resultat.nativeElement.scrollIntoView({ behavior: "smooth" });
          }, 200);
        }

        // Mark for check
        this._changeDetectorRef.markForCheck();

        // Appel update dateNaissance userKeycloak
        if (this.user.dateNaissance == null || this.user.dateNaissance === "") {
          this.user = {
            ...this.user,
            dateNaissance: this.formatMomentToString(this.simulationStepperForm.get('step1').get('dateNaissance').value)
          }
          this._userService.updateUser(this.user)
            .pipe(
              catchError((error) => {
                // Log the error
                console.error("+-+-+- update date naissance of user keyCloak error", error);
                // Throw an error
                return throwError(() => error);
              }))
            .subscribe((response: User) => {

              console.log("+-+-+- update date naissance of user keyCloak  success: ", response);
            });
        }

        // Appel SalesForce
        this.createLeadAccountOpportunity();
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
  private _initInfosConnectedUser() {
    this.user = this._authenticationService.connectedUser;

    if (this.queryParams?.email) {
      this.simulationStepperForm.get('step1').get('email').setValue(this.queryParams?.email);
    } else if (this.user?.email) {
      this.simulationStepperForm.get('step1').get('email').setValue(this.user?.email);
    }

    if (this.queryParams?.nom) {
      this.simulationStepperForm.get('step1').get('nom').setValue(this.queryParams?.nom);
    } else if (this.user?.lastName) {
      this.simulationStepperForm.get('step1').get('nom').setValue(this.user?.lastName);
    }

    if (this.queryParams?.prenom) {
      this.simulationStepperForm.get('step1').get('prenom').setValue(this.queryParams?.prenom);
    } else if (this.user?.firstName) {
      this.simulationStepperForm.get('step1').get('prenom').setValue(this.user?.firstName);
    }

    if (this.queryParams?.telephone) {
      this.simulationStepperForm.get('step1').get('telephone').setValue(this.queryParams?.telephone);
    } else if (this.user?.telephone) {
      this.simulationStepperForm.get('step1').get('telephone').setValue(this.user?.telephone);
    }

    var dateNaiss;
    if (this.queryParams?.dateNaissance) {
      dateNaiss = this.queryParams?.dateNaissance;
    } else if (this.user?.dateNaissance) {
      dateNaiss = this.user?.dateNaissance;
    }
    if (dateNaiss) {
      var momentObj = moment(dateNaiss, "DD-MM-YYYY");
      this.simulationStepperForm.get('step1').get('dateNaissance').setValue(momentObj);
    }

    this._changeDetectorRef.detectChanges();
  }

  private formatMomentToString(date: moment.Moment): string {
    return date.format("DD/MM/YYYY");
  }

  private createLeadAccountOpportunity() {
    console.log("_____________________simulation__________________________________", this.simulationDetaillee);
    const dossiers = this.simulationDetaillee.dossiers.map(dossier => {
      return {
        assurances: dossier.assurances,
        coutTotal: dossier.coutTotal,
        duree: dossier.duree,
        echeance: dossier.echeance,
        fraisDossier: dossier.fraisDossier,
        id: dossier.id,
        montant: dossier.montant,
        tauxEffectifGlobal: dossier.tauxEffectifGlobal,
        tauxNominal: dossier.tauxNominal,
        tauxParticipation: dossier.tauxParticipation,
        totalInterets: dossier.totalInterets
      };
    });
    /*
    [{
        assurances: simulation.dossiers[0].assurances,
        coutTotal: simulation.dossiers[0].assurances,
        duree: simulation.dossiers[0].assurances,
        echeance: simulation.dossiers[0].assurances,
        fraisDossier: simulation.dossiers[0].assurances,
        id: simulation.dossiers[0].assurances,
        montant: simulation.dossiers[0].assurances,
        tauxEffectifGlobal: simulation.dossiers[0].assurances,
        tauxNominal: simulation.dossiers[0].assurances,
        tauxParticipation: simulation.dossiers[0].assurances,
        totalInterets: simulation.dossiers[0].assurances
      }],
    */
    let result = {
      codeApporteur: "100",
      codeUtilisateur: "WEB",
      nom: this.simulationStepperForm.get('step1').get('nom').value,
      prenom: this.simulationStepperForm.get('step1').get('prenom').value,
      telephone: this.simulationStepperForm.get('step1').get('telephone').value.replace(/-/g, '').substring(0, 10),
      email: this.simulationStepperForm.get('step1').get('email').value,
      dateNaissance: this.simulationStepperForm.get('step1').get('dateNaissance').value.format(),
      nationalite: this.nationalites?.find((e) => e.code === this.simulationStepperForm.get('step1').get('nationalite').value)?.code,
      residantMaroc: this.simulationStepperForm.get('step1').get('residantMaroc').value ? true : false,
      categorieSocioProfessionnelle: this.categories?.find((e) => e.code === this.simulationStepperForm.get('step2').get('categorieSocioProfessionnelle').value)?.code,
      nomEmployeur: this.simulationStepperForm.get('step2').get('nomEmployeur').value,
      salaire: Number(this.simulationStepperForm.get('step2').get('salaire').value.toString().replace(/\D/g, '')),
      autresRevenus: this.simulationStepperForm.get('step2').get('autresRevenus').value ? Number(this.simulationStepperForm.get('step2').get('autresRevenus').value.toString().replace(/\D/g, '')) : null,
      creditsEnCours: this.simulationStepperForm.get('step2').get('creditsEnCours').value ? Number(this.simulationStepperForm.get('step2').get('creditsEnCours').value.toString().replace(/\D/g, '')) : null,
      objetFinancement: this.objetsFinancement?.find((e) => e.code === this.simulationStepperForm.get('step3').get('objetFinancement').value)?.code,
      nomPromoteur: this.simulationStepperForm.get('step3').get('nomPromoteur').value,
      statutProjet: this.selectedStatutProjetLabel,
      typeTaux: this.simulationStepperForm.get('step3').get('typeTaux').value ? "Valeur Fixe" : "Valeur variable",
      estConsultation: false,
      conservationFonciere: this.simulationDetaillee.conservationFonciere,
      dossiers: dossiers,
      droitsEnregistrement: this.simulationDetaillee.droitsEnregistrement,
      duree: this.simulationDetaillee.duree,
      fraisDivers: this.simulationDetaillee.fraisDivers,
      honorairesNotaire: this.simulationDetaillee.honorairesNotaire,
      id: this.simulationDetaillee.id,
      montant: this.simulationDetaillee.montant,
      montantProposition: this.simulationDetaillee.montantProposition,
      statut: this.simulationDetaillee.statut,
      tauxAssurancePondere: this.simulationDetaillee.tauxAssurancePondere,
      tauxEffectifGlobalPondere: this.simulationDetaillee.tauxEffectifGlobalPondere,
      tauxInteretsClientTtc: this.simulationDetaillee.tauxInteretsClientTtc,
      tauxNominalPondere: this.simulationDetaillee.tauxNominalPondere,
      totalFrais: this.simulationDetaillee.totalFrais
    };
    console.log("_____________________result__________________________________", result);
    // affectationFunction
    this._salesForceService.affectationFunction(
      this.simulationResultat.cin,
      result.montant,
      result.duree,
      result.objetFinancement,
      result.nomPromoteur,
      result.nom,
      result.prenom,
      result.categorieSocioProfessionnelle,
      result.residantMaroc,
      result.nationalite,
      result.dateNaissance,
      result.salaire,
      result.autresRevenus,
      result.creditsEnCours,
      result.telephone,
      result.email,
      result.nomEmployeur,
      this.selectedStatutProjetLabel,
      result.typeTaux,
      //mensualite
      result.dossiers[0].echeance,
      result.dossiers[0].totalInterets,
      result.dossiers[0].tauxParticipation,
      result.dossiers[0].tauxEffectifGlobal,
      result.dossiers[0].coutTotal,
      result.dossiers[0].fraisDossier

    ).subscribe();
  }

}
