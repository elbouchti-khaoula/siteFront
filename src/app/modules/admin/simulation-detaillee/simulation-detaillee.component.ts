import { ChangeDetectorRef, Component, EventEmitter, ElementRef, Input, OnDestroy, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { CategorieSocioProfessionnelle, EmployeursConventionnes, Nationalite, ObjetFinancement, PromoteursConventionnes } from 'app/core/referentiel/referentiel.types';
import { SimulationDetaillee } from 'app/core/projects/projects.types';
import { ReferentielService } from 'app/core/referentiel/referentiel.service';
import { SimulationDetailleeService } from 'app/core/projects/projects.service';
import * as moment from 'moment';
import { resize } from 'app/modules/common/resize';
import { DetailsSimulationComponent } from 'app/modules/common/details-simulation/details-simulation.component';
import { BienvenueComponent } from 'app/modules/common/bienvenue/bienvenue.component';
import { FuseUtilsService } from '@fuse/services/utils';
import { MatSelectChange } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { DecimalPipe, CurrencyPipe } from '@angular/common';

import { Observable, debounceTime, filter, map, Subject, takeUntil, catchError, throwError } from 'rxjs';
import { MatAutocomplete } from '@angular/material/autocomplete';

@Component({
  selector: 'simulation-detaillee',
  templateUrl: './simulation-detaillee.component.html',
  styleUrls: ['./simulation-detaillee.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [fuseAnimations, resize]
})

export class SimulationDetailleeComponent implements OnInit, OnDestroy {

  @Input() debounce: number = 300;
  @Input() minLength: number = 3;
  @Output() search: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('matAutocompletePromoteur') matAutocompletePromoteur: MatAutocomplete;
  @ViewChild('matAutocompleteEmployeur') matAutocompleteEmployeur: MatAutocomplete;

  resultEmployeurs: any[];
  searchEmployeurControl: UntypedFormControl = new UntypedFormControl();

  resultPromoteurs: any[];
  searchPromoteurControl: UntypedFormControl = new UntypedFormControl();

  employeurs: EmployeursConventionnes[];
  employeurs$: Observable<EmployeursConventionnes[]>;
  promoteurs: PromoteursConventionnes[];
  promoteurs$: Observable<PromoteursConventionnes[]>;
  listEmployeurs: EmployeursConventionnes[];
  listPromoteurs: PromoteursConventionnes[];


  @ViewChild(DetailsSimulationComponent) detailsSimulation;
  @ViewChild(BienvenueComponent) bienvenueComponent;
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
    nomEmployeur: 'WAFA SALAF',
    // anciennete: 12,
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

  @ViewChild('resultat', { read: ElementRef }) public resultat: ElementRef<any>;
  simulationResultat: any;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  selectedStatutProjetLabel: string;

  /**
   * Constructor
   */
  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _fuseMediaWatcherService: FuseMediaWatcherService,
    private _formBuilder: UntypedFormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _referentielService: ReferentielService,
    private _simulationService: SimulationDetailleeService,
    private _fuseUtilsService: FuseUtilsService,
    private decimalPipe: DecimalPipe,
    private currencyPipe: CurrencyPipe
  ) {

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
        // anciennete: [this.simulationFormDefaults.anciennete, [Validators.required]],
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
    //       {
    //           "id": 805628,
    //           "montant": "1 300 000.00",
    //           "duree": 240,
    //           "echeance": 7470.13,
    //           "tauxNominal": 2.7272,
    //           "tauxEffectifGlobal": "3.396",
    //           "tauxParticipation": "0.000",
    //           "fraisDossier": "GRATUIT",
    //           "assurances": "57 469.46",
    //           "totalInterets": "435 361.74",
    //           "coutTotal": "1 792 831.20",
    //           "mensualite": "7 470.13",
    //           "expertiseImmobiliere": "GRATUIT",
    //           "estExpImmoNum": false,
    //           "estFraisDossNum": false,
    //           "nbreAnnee": 20,
    //           "nbreMois": 0
    //       },
    //       {
    //           "id": 805627,
    //           "montant": "700 000.00",
    //           "duree": 240,
    //           "echeance": 3673.93,
    //           "tauxNominal": 1.8181,
    //           "tauxEffectifGlobal": "2.396",
    //           "tauxParticipation": "0.000",
    //           "fraisDossier": "GRATUIT",
    //           "assurances": "30 038.67",
    //           "totalInterets": "151 704.53",
    //           "coutTotal": "881 743.20",
    //           "mensualite": "3 673.93",
    //           "expertiseImmobiliere": "GRATUIT",
    //           "estExpImmoNum": false,
    //           "estFraisDossNum": false,
    //           "nbreAnnee": 20,
    //           "nbreMois": 0
    //       }
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

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  ngOnInit(): void {
    this._referentielService.getEmployeursConventionnes().pipe(
      takeUntil(this._unsubscribeAll))
      .subscribe((employeur: EmployeursConventionnes[]) => {
        this.listEmployeurs = employeur;

        this._changeDetectorRef.markForCheck();
      });


    this.employeurs$ = this._referentielService.employeurs$;

    this._referentielService.getPromoteursConventionnes().pipe(
      takeUntil(this._unsubscribeAll))
      .subscribe((promoteur: PromoteursConventionnes[]) => {
        this.listPromoteurs = promoteur;

        this._changeDetectorRef.markForCheck();
      });


    this.promoteurs$ = this._referentielService.promoteurs$;

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
          console.log(employeurs);
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
          console.log(promoteurs);
          this.promoteurs = promoteurs;

          this.resultPromoteurs = [...promoteurs];
          this._changeDetectorRef.markForCheck();
          this.search.next(this.resultPromoteurs);
        });
      });
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
        // this.simulationStepperForm.get('step1').get('email').setValue(queryParams?.email ?? this.simulationFormDefaults.email);
        this.simulationStepperForm.get('step1').get('dateNaissance').setValue(queryParams?.dateNaissance ?? this.simulationFormDefaults.dateNaissance);
        this.simulationStepperForm.get('step1').get('nationalite').setValue(queryParams?.nationaliteCode ?? this.simulationFormDefaults.nationalite);
        this.simulationStepperForm.get('step1').get('residantMaroc').setValue(queryParams?.residentMarocain ?? this.simulationFormDefaults.residantMaroc);
        this.simulationStepperForm.get('step1').get('agreements').setValue(queryParams?.agreements ?? this.simulationFormDefaults.agreements);
        // ma situation
        this.simulationStepperForm.get('step2').get('categorieSocioProfessionnelle').setValue(queryParams?.cspCode ?? this.simulationFormDefaults.categorieSocioProfessionnelle);
        this.simulationStepperForm.get('step2').get('nomEmployeur').setValue(queryParams?.nomEmployeur ?? this.simulationFormDefaults.nomEmployeur);
        // this.simulationStepperForm.get('step2').get('anciennete').setValue(queryParams?.anciennete ?? this.simulationFormDefaults.anciennete);
        this.simulationStepperForm.get('step2').get('salaire').setValue(queryParams?.salaire ?? this.simulationFormDefaults.salaire);
        this.simulationStepperForm.get('step2').get('autresRevenus').setValue(queryParams?.autresRevenus ?? this.simulationFormDefaults.autresRevenus);
        this.simulationStepperForm.get('step2').get('creditsEnCours').setValue(queryParams?.creditsEnCours ?? this.simulationFormDefaults.creditsEnCours);
        // Mon projet
        this.simulationStepperForm.get('step3').get('montantProposition').setValue(queryParams?.montant ?? this.simulationFormDefaults.montantProposition);
        this.simulationStepperForm.get('step3').get('duree').setValue(queryParams?.duree ?? this.simulationFormDefaults.duree);
        this.simulationStepperForm.get('step3').get('objetFinancement').setValue(queryParams?.objetFinancement ?? this.simulationFormDefaults.objetFinancement);
        this.simulationStepperForm.get('step3').get('nomPromoteur').setValue(queryParams?.nomPromoteur ?? this.simulationFormDefaults.nomPromoteur);
        this.simulationStepperForm.get('step3').get('statutProjet').setValue(queryParams?.statutProjet ?? this.simulationFormDefaults.statutProjet);
        this.simulationStepperForm.get('step3').get('typeTaux').setValue(queryParams?.typeTaux ?? this.simulationFormDefaults.typeTaux);
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

  ngAfterViewInit(): void {
    if (this.queryParams?.email) {
      this.simulationStepperForm.get('step1').get('email').setValue(this.queryParams?.email);
    } else if (this.bienvenueComponent.user?.email) {
      this.simulationStepperForm.get('step1').get('email').setValue(this.bienvenueComponent.user?.email);
    }
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

  /* formatMontant(montant: number): string {
     const montantFormate = this.decimalPipe.transform(montant, '1.2-2', 'fr-FR');
     const montantAvecEspaces = montantFormate.replace('.', ' ');
     const montantAvecDecimales = this.currencyPipe.transform(montant, 'Dhs', 'symbol', '1.2-2', 'fr-FR');
     return montantAvecEspaces + montantAvecDecimales.substring(montantAvecEspaces.length);
 }*/
  getEmployeurs(
    search: string = ''
  ): Observable<EmployeursConventionnes[]> {
    return this.employeurs$.pipe(
      map((response) => {
        console.log(response);
        let employeurs = response;
        if (search) {
          employeurs = employeurs.filter(employeur => employeur.libelle && employeur.libelle.toLowerCase().includes(search.toLowerCase()));

        }
        return employeurs;
      })
    );
  }

  getPromoteurs(
    search: string = ''
  ): Observable<PromoteursConventionnes[]> {
    return this.promoteurs$.pipe(
      map((response) => {
        console.log(response);
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
   * Check if the task is overdue or not
   */
  isOverdue(): boolean {
    return moment(this.simulationStepperForm.get('step1').get('dateNaissance').value, moment.ISO_8601).isAfter(moment(), 'days');
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
        dateNaissance: this._fuseUtilsService.formatMomentToString(this.simulationStepperForm.get('step1').get('dateNaissance').value),
        salaire: Number(this.simulationStepperForm.get('step2').get('salaire').value.toString().replace(/\D/g, '')),
        autresRevenus: Number(this.simulationStepperForm.get('step2').get('autresRevenus').value.toString().replace(/\D/g, '')),
        creditsEnCours: Number(this.simulationStepperForm.get('step2').get('creditsEnCours').value.toString().replace(/\D/g, '')),
        telephone: this.simulationStepperForm.get('step1').get('telephone').value,
        email: this.simulationStepperForm.get('step1').get('email').value,
        nomEmployeur: this.simulationStepperForm.get('step2').get('nomEmployeur').value,
      }
    }

    // simuler crédit
    this._simulationService.simuler(critere)
      .pipe(
        // Error here means the requested is not available
        catchError((error) => {

          // Throw an error
          return throwError(() => error);
        })
      )
      .subscribe((response: SimulationDetaillee) => {

        let simulation = response;

        // Set the selected simulation
        this.simulationResultat = {
          codeApporteur: "100",
          codeUtilisateur: "WEB",
          // Mon profil
          nom: this.simulationStepperForm.get('step1').get('nom').value,
          prenom: this.simulationStepperForm.get('step1').get('prenom').value,
          telephone: this.simulationStepperForm.get('step1').get('telephone').value,
          email: this.simulationStepperForm.get('step1').get('email').value,
          dateNaissance: this._fuseUtilsService.formatMomentToString(this.simulationStepperForm.get('step1').get('dateNaissance').value),
          nationalite: this.nationalites.find((e) => e.code === this.simulationStepperForm.get('step1').get('nationalite').value)?.libelle,
          residantMaroc: this.simulationStepperForm.get('step1').get('residantMaroc').value ? "Oui" : "Non",
          // ma situation
          categorieSocioProfessionnelle: this.categories.find((e) => e.code === this.simulationStepperForm.get('step2').get('categorieSocioProfessionnelle').value)?.libelle,
          nomEmployeur: this.simulationStepperForm.get('step2').get('nomEmployeur').value,
          // anciennete: this.simulationStepperForm.get('step2').get('anciennete').value,
          salaire: this._fuseUtilsService.numberFormat(this.simulationStepperForm.get('step2').get('salaire').value + this.simulationStepperForm.get('step2').get('autresRevenus').value, 2, '.', ' '),
          // autresRevenus: this._fuseUtilsService.numberFormat(this.simulationStepperForm.get('step2').get('autresRevenus').value, 2, '.', ' '),
          creditsEnCours: this._fuseUtilsService.numberFormat(this.simulationStepperForm.get('step2').get('creditsEnCours').value, 2, '.', ' '),
          // Mon projet
          objetFinancement: this.objetsFinancement.find((e) => e.code === this.simulationStepperForm.get('step3').get('objetFinancement').value)?.libelle,
          nomPromoteur: this.simulationStepperForm.get('step3').get('nomPromoteur').value,
          statutProjet: this.selectedStatutProjetLabel,
          typeTaux: this.simulationStepperForm.get('step3').get('typeTaux').value ? "Valeur Fixe" : "Valeur variable",
          newSimulation: true,
          ...this._simulationService.convertSimulationToString(simulation)
        };

        if (!this.isScreenSmall && this.animationState !== 'smallDesktop') {
          this.animationState = 'smallDesktop';
        }
        this.isVisible = true;

        // setTimeout(() => {
        //   this.detailsSimulation.setSimulation(this.simulationResultat);
        // }, 200);

        if (this.isScreenSmall) {
          setTimeout(() => {
            // Scroll to result
            this.resultat.nativeElement.scrollIntoView({ behavior: "smooth" });
          }, 200);
        }

        // Add query params using the router
        // this._router.navigate([], {
        //   // fragment: '',
        //   queryParams: {
        //     // Mon profil
        //     nom: this.simulationStepperForm.get('step1').get('nom').value,
        //     prenom: this.simulationStepperForm.get('step1').get('prenom').value,
        //     telephone: this.simulationStepperForm.get('step1').get('telephone').value,
        //     email: this.simulationStepperForm.get('step1').get('email').value,
        //     dateNaissance: this.formatMomentToString(this.simulationStepperForm.get('step1').get('dateNaissance').value),
        //     nationalite: this.simulationStepperForm.get('step1').get('nationalite').value,
        //     residantMaroc: this.simulationStepperForm.get('step1').get('residantMaroc').value,
        //     // ma situation
        //     categorieSocioProfessionnelle: this.simulationStepperForm.get('step2').get('categorieSocioProfessionnelle').value,
        //     nomEmployeur: this.simulationStepperForm.get('step2').get('nomEmployeur').value,
        //     salaire: this.simulationStepperForm.get('step2').get('salaire').value,
        //     autresRevenus: this.simulationStepperForm.get('step2').get('autresRevenus').value,
        //     creditsEnCours: this.simulationStepperForm.get('step2').get('creditsEnCours').value,
        //     // Mon projet
        //     montant: this.simulationStepperForm.get('step3').get('montant').value,
        //     objetFinancement: this.simulationStepperForm.get('step3').get('objetFinancement').value,
        //     montantProposition: this.simulationStepperForm.get('step3').get('montantProposition').value,
        //     duree: this.simulationStepperForm.get('step3').get('duree').value,
        //     nomPromoteur: this.simulationStepperForm.get('step3').get('nomPromoteur').value,
        //     statutProjet: this.simulationStepperForm.get('step3').get('statutProjet').value,
        //     typeTaux: this.simulationStepperForm.get('step3').get('typeTaux').value,
        //   },
        //   relativeTo: this._activatedRoute
        // });

        // Mark for check
        this._changeDetectorRef.markForCheck();
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

  /**
 * Setter for bar search input
 *
 * @param value
 */
  @ViewChild('barSearchInput')
  set barSearchInput(value: ElementRef) {
    if (value) {
      setTimeout(() => {

        value.nativeElement.focus();
      });
    }
  }
}
