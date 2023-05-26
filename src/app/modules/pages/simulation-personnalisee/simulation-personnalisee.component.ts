import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { AnimateCounterService } from '@fuse/services/animate-counter/animate-counter.service';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { catchError, Subject, takeUntil, throwError } from 'rxjs';
import { CategorieSocioProfessionnelle, Nationalite } from 'app/core/referentiel/referentiel.types';
import { ReferentielService } from 'app/core/referentiel/referentiel.service';
import { SimulationPersonnalisee } from './simulation.types';
import { SimulationPersonaliseeService } from './simulation.service';
import { SalesForceService } from 'app/core/salesforce/salesforce.service';
import { resize } from 'app/modules/common/resize';
import { UserService } from 'app/core/user/user.service';
import { FuseUtilsService } from '@fuse/services/utils';

@Component({
  selector: 'simulation-personnalisee',
  templateUrl: './simulation-personnalisee.component.html',
  styleUrls: ['./simulation-personnalisee.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [fuseAnimations, resize]
})
export class SimulationPersonaliseeComponent implements OnInit, OnDestroy {

  isScreenSmall: boolean;
  isVisible: boolean = false;
  animationState: string;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  categories: CategorieSocioProfessionnelle[];
  nationalites: Nationalite[];
  queryParams: Params;
  simulationForm: UntypedFormGroup;
  simulationFormDefaults: any = {
    nom: null,
    telephone: null,
    email: null,
    prenom: null,
    nationaliteCode: null,
    residentMarocain: null,
    agreements: null,
    cspCode: null,
    montant: null,
    duree: null,
  };

  simulationPersonnalisee: SimulationPersonnalisee;
  simulationPersonnaliseeStr: any;
  @ViewChild('resultat', { read: ElementRef }) public resultat: ElementRef<any>;
  estExpImmoNum: boolean = true;
  estFraisDossNum: boolean = true;
  @ViewChild('mensualiteMinId') mensualiteMinId: any;
  @ViewChild('mensualiteMaxId') mensualiteMaxId: any;
  @ViewChild('nbreAnneeId') nbreAnneeId: any;
  @ViewChild('nbreMoisId') nbreMoisId: any;
  @ViewChild('montantId') montantId: any;
  // @ViewChild('totalInteretsId') totalInteretsId: any;
  // @ViewChild('coutTotalMinId') coutTotalMinId: any;
  // @ViewChild('coutTotalMaxId') coutTotalMaxId: any;
  @ViewChild('expertiseImmobiliereId') expertiseImmobiliereId: any;
  @ViewChild('fraisDossierId') fraisDossierId: any;
  // @ViewChild('totalFraisId') totalFraisId: any;
  @ViewChild('droitsEnregistrementId') droitsEnregistrementId: any;
  @ViewChild('conservationFonciereId') conservationFonciereId: any;
  // @ViewChild('fraisDiversId') fraisDiversId: any;
  // @ViewChild('honorairesNotaireId') honorairesNotaireId: any;

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
    private _simulationService: SimulationPersonaliseeService,
    private _salesForceService: SalesForceService,
    private _userService: UserService,
    private _fuseUtilsService: FuseUtilsService
  )
  {
    this.simulationPersonnalisee = {
      montant: 0.00,
      duree: 0,
      mensualiteMin: 0.00,
      // totalInteretsMin: 0.00,
      // coutTotalMin: 0.00,
      mensualiteMax: 0.00,
      // totalInteretsMax: 0.00,
      // coutTotalMax: 0.00,
      expertiseImmobiliere: 0.00,
      fraisDossier: 0.00,
      droitsEnregistrement: 0.00,
      conservationFonciere: 0.00,
      // fraisDivers: 0.00,
      // honorairesNotaire: 0.00,

      // get totalFrais() {
      //   return this.droitsEnregistrement + this.conservationFonciere + this.fraisDivers + this.honorairesNotaire
      // }
    }

    // Prepare the form with defaults
    this.simulationForm = this._formBuilder.group(
      {
        nom             : [this.simulationFormDefaults.nom, [Validators.required]],
        prenom          : [this.simulationFormDefaults.prenom, [Validators.required]],
        telephone       : [this.simulationFormDefaults.telephone, [Validators.required]],
        email           : [this.simulationFormDefaults.email, [Validators.email, Validators.required]],
        nationaliteCode : [this.simulationFormDefaults.nationaliteCode, [Validators.required]],
        residentMarocain: [this.simulationFormDefaults.residentMarocain, [Validators.required]],
        agreements      : [this.simulationFormDefaults.agreements, [Validators.required]],
        cspCode         : [this.simulationFormDefaults.cspCode, [Validators.required]],
        montant         : [this.simulationFormDefaults.montant, [Validators.required]],
        duree           : [this.simulationFormDefaults.duree, [Validators.required]]
      }
    );
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  ngOnInit(): void {
    // this.isVisible = true;

    this._userService.user$.subscribe((user) => {
        this.simulationForm.get('email').setValue(user?.email ? user.email : this.simulationFormDefaults.email);
    });

    // Subscribe to query params change
    this._activatedRoute.queryParams
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((queryParams) => {

        // Store the query params
        this.queryParams = queryParams;

        // Fill the form with the values from query
        // params without emitting any form events
        this.simulationForm.get('montant').setValue(queryParams?.montant ?? this.simulationFormDefaults.montant);
        this.simulationForm.get('duree').setValue(queryParams?.duree ? queryParams?.duree * 12 : this.simulationFormDefaults.duree);
      });

    // Subscribe to media changes
    this._fuseMediaWatcherService.onMediaChange$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(({ matchingAliases }) => {

        // Check if the screen is small
        this.isScreenSmall = !matchingAliases.includes('md');

        if (this.isScreenSmall) {
          this.animationState = 'largeMobile'
        }
        else {
          this.animationState = this.isVisible ? 'smallDesktop' : 'largeDesktop'
        }
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

    // Get the nationalités
    this._referentielService.nationalites$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((response: Nationalite[]) => {

        // Update the nationalités
        this.nationalites = response;

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
   * Reset the form using the default
   */
  newSimulation(): void {

    // this.simulationForm.reset(this.simulationFormDefaults);
    this.simulationForm.get('montant').reset();
    this.simulationForm.get('duree').reset();

    this._animateCounterService.animateValue(this.mensualiteMinId, this.simulationPersonnalisee.mensualiteMin, 0, 600);
    this._animateCounterService.animateValue(this.mensualiteMaxId, this.simulationPersonnalisee.mensualiteMax, 0, 600);
    this._animateCounterService.animateValue(this.nbreAnneeId, this.simulationPersonnalisee.nbreAnnee, 0, 600);
    this._animateCounterService.animateValue(this.nbreMoisId, this.simulationPersonnalisee.nbreMois, 0, 600);
    this._animateCounterService.animateValue(this.montantId, this.simulationPersonnalisee.montant, 0, 600);
    // this._animateCounterService.animateValue(this.totalInteretsId, this.simulationPersonnalisee.totalInteretsMin, 0, 600);
    // this._animateCounterService.animateValue(this.coutTotalMinId, this.simulationPersonnalisee.coutTotalMin, 0, 600);
    // this._animateCounterService.animateValue(this.coutTotalMaxId, this.simulationPersonnalisee.coutTotalMax, 0, 600);
    
    let nbExp = 0;
    if (this.simulationPersonnalisee.expertiseImmobiliere && this.simulationPersonnalisee.expertiseImmobiliere > 0) {
      nbExp = this.simulationPersonnalisee.expertiseImmobiliere;
    } 
    this.estExpImmoNum = true;
    this._animateCounterService.animateValue(this.expertiseImmobiliereId, nbExp, 0, 600);

    let nbFrai = 0;
    if (this.simulationPersonnalisee.fraisDossier && this.simulationPersonnalisee.fraisDossier > 0) {
      nbFrai = this.simulationPersonnalisee.fraisDossier;
    }
    this.estFraisDossNum = true;
    this._animateCounterService.animateValue(this.fraisDossierId, nbFrai, 0, 600);

    // Frais
    // this._animateCounterService.animateValue(this.totalFraisId, this.simulationPersonnalisee.totalFrais, 0, 600);
    this._animateCounterService.animateValue(this.droitsEnregistrementId, this.simulationPersonnalisee.droitsEnregistrement, 0, 600);
    this._animateCounterService.animateValue(this.conservationFonciereId, this.simulationPersonnalisee.conservationFonciere, 0, 600);
    // this._animateCounterService.animateValue(this.fraisDiversId, this.simulationPersonnalisee.fraisDivers, 0, 600);
    // this._animateCounterService.animateValue(this.honorairesNotaireId, this.simulationPersonnalisee.honorairesNotaire, 0, 600);
  }

  simuler(): void {

    const critere = {
      montant         : Number(this.simulationForm.get('montant').value.toString().replace(/\D/g, '')),
      duree           : this.simulationForm.get('duree').value,
      cspCode         : this.simulationForm.get('cspCode').value,
      nationaliteCode : this.simulationForm.get('nationaliteCode').value,
      residentMarocain: this.simulationForm.get('residentMarocain').value,
    }

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

        this.simulationPersonnalisee = response;
        this.simulationPersonnalisee.nbreAnnee = Math.trunc(this.simulationPersonnalisee.duree / 12);
        this.simulationPersonnalisee.nbreMois = this.simulationPersonnalisee.duree % 12;

        if (!this.isScreenSmall && this.animationState !== 'smallDesktop') {
          this.animationState = 'smallDesktop';
        }
        this.isVisible = true;

        setTimeout(() => {
          this.convertSimulationPersonaliseeToString();
        }, 200);

        if (this.isScreenSmall) {
          setTimeout(() => {
            // Scroll to result
            this.resultat.nativeElement.scrollIntoView({ behavior: "smooth" });
          }, 200);
        }

        // Mark for check
        this._changeDetectorRef.markForCheck();
      });

    this._salesForceService.createLead(
      {
        nom: this.simulationForm.get('nom').value,
        prenom: this.simulationForm.get('prenom').value,
        email: this.simulationForm.get('email').value,
        telephone: this.simulationForm.get('telephone').value,
        nationaliteCode: this.simulationForm.get('nationaliteCode').value,
        residentMarocain: this.simulationForm.get('residentMarocain').value,
        cspCode: this.simulationForm.get('cspCode').value,
        montant: this.simulationForm.get('montant').value
      }
    )
      .pipe(
        catchError((error) => {
          // Log the error
          console.error("+-+-+-+ création lead salesforce simulation personnalisée error", error);
          // Throw an error
          return throwError(error);
        }))
      .subscribe((response) => {
        console.log("+-+-+- création lead salesforce simulation personnalisée success: ", response);
      });

  }

  convertSimulationPersonaliseeToString(): void {
    
    let expertiseImmobiliereStr = "";
    if (this.simulationPersonnalisee.expertiseImmobiliere && this.simulationPersonnalisee.expertiseImmobiliere > 0) {
      expertiseImmobiliereStr = this._fuseUtilsService.numberFormat(this.simulationPersonnalisee.expertiseImmobiliere, 2, '.', ' ');
      this.estExpImmoNum = true;
    } else {
      expertiseImmobiliereStr = "GRATUIT";
      this.estExpImmoNum = false;
    }
    let fraisDossierStr = "";
    if (this.simulationPersonnalisee.fraisDossier && this.simulationPersonnalisee.fraisDossier > 0) {
      fraisDossierStr = this._fuseUtilsService.numberFormat(this.simulationPersonnalisee.fraisDossier, 2, '.', ' ');
      this.estFraisDossNum = true;
    } else {
      fraisDossierStr = "GRATUIT";
      this.estFraisDossNum = false;
    }

    this.simulationPersonnaliseeStr = {
      ...this.simulationPersonnalisee,
      mensualiteMin: this._fuseUtilsService.numberFormat(this.simulationPersonnalisee.mensualiteMin, 2, '.', ' '),
      mensualiteMax: this._fuseUtilsService.numberFormat(this.simulationPersonnalisee.mensualiteMax, 2, '.', ' '),
      montant: this._fuseUtilsService.numberFormat(this.simulationPersonnalisee.montant, 2, '.', ' '),
      expertiseImmobiliere: expertiseImmobiliereStr,
      fraisDossier: fraisDossierStr,
      droitsEnregistrement: this._fuseUtilsService.numberFormat(this.simulationPersonnalisee.droitsEnregistrement, 2, '.', ' '),
      conservationFonciere: this._fuseUtilsService.numberFormat(this.simulationPersonnalisee.conservationFonciere, 2, '.', ' '),
    }

    this.mensualiteMinId.nativeElement.textContent = this.simulationPersonnaliseeStr.mensualiteMin;
    this.mensualiteMaxId.nativeElement.textContent = this.simulationPersonnaliseeStr.mensualiteMax;
    this.nbreAnneeId.nativeElement.textContent = this.simulationPersonnaliseeStr.nbreAnnee;
    this.nbreMoisId.nativeElement.textContent = this.simulationPersonnaliseeStr.nbreMois;
    this.montantId.nativeElement.textContent = this.simulationPersonnaliseeStr.montant;
    // this.totalInteretsId.nativeElement.textContent = this.simulationPersonnaliseeStr.totalInteretsMin;
    // this.coutTotalMinId.nativeElement.textContent = this.simulationPersonnaliseeStr.coutTotalMin;
    // this.coutTotalMaxId.nativeElement.textContent = this.simulationPersonnaliseeStr.coutTotalMax;
    this.expertiseImmobiliereId.nativeElement.textContent = expertiseImmobiliereStr;
    this.fraisDossierId.nativeElement.textContent = fraisDossierStr;

    // Frais
    // this.totalFraisId.nativeElement.textContent = this.simulationPersonnaliseeStr.totalFrais;
    this.droitsEnregistrementId.nativeElement.textContent = this.simulationPersonnaliseeStr.droitsEnregistrement;
    this.conservationFonciereId.nativeElement.textContent = this.simulationPersonnaliseeStr.conservationFonciere;
    // this.fraisDiversId.nativeElement.textContent = this.simulationPersonnaliseeStr.fraisDivers;
    // this.honorairesNotaireId.nativeElement.textContent = this.simulationPersonnaliseeStr.honorairesNotaire;
  }

  navigateToSimulationDetaillee(): void {
    
    // Add query params using the router
    this._router.navigate(
        ['/espace-connecte/simulation-detaillee'],
        {
            queryParams: 
            {
              nom             : this.simulationForm.get('nom').value,
              prenom          : this.simulationForm.get('prenom').value,
              telephone       : this.simulationForm.get('telephone').value,
              email           : this.simulationForm.get('email').value,
              nationaliteCode : this.simulationForm.get('nationaliteCode').value,
              residentMarocain: this.simulationForm.get('residentMarocain').value,
              agreements      : this.simulationForm.get('agreements').value,
              cspCode         : this.simulationForm.get('cspCode').value,
              montant         : this.simulationForm.get('montant').value,
              duree           : this.simulationForm.get('duree').value
            }
        }
    );
  }

}
