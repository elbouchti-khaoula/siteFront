import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, UntypedFormBuilder, UntypedFormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { Subject, takeUntil } from 'rxjs';

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
    objetFinancement: null,
    nom: null,
    prenom: null,
    categorieSocioProfessionnelle: null,
    telephone: null,
    email: null,
    agreements: null
  };

  /**
   * Constructor
   */
  constructor(
    private _fuseMediaWatcherService: FuseMediaWatcherService,
    private _formBuilder: UntypedFormBuilder,
    private _activatedRoute: ActivatedRoute
  ) {
    // Prepare the form with defaults
    this.simulationForm = this._formBuilder.group(
      {
        montant                       : [this.simulationFormDefaults.montant, [Validators.required]],
        duree                         : [this.simulationFormDefaults.duree, [Validators.required]],
        objetFinancement              : [this.simulationFormDefaults.objetFinancement],
        nom                           : [this.simulationFormDefaults.nom, [Validators.required]],
        prenom                        : [this.simulationFormDefaults.prenom, [Validators.required]],
        categorieSocioProfessionnelle : [this.simulationFormDefaults.categorieSocioProfessionnelle, [Validators.required]],
        telephone                     : [this.simulationFormDefaults.telephone],
        email                         : [this.simulationFormDefaults.email, [Validators.email]],
        agreements                     : [this.simulationFormDefaults.agreements, [Validators.required]]
      },
      { validators: this.atLeastOne }
    );
  }


  atLeastOne(form: FormGroup) : ValidationErrors {
    const emailCtrl = form.get('email');
    const phoneCtr = form.get('telephone');
      if (!!emailCtrl.value || !!phoneCtr.value) {
      return null;
    }
      return { atLeastOne: '* Veuillez saisir émail ou téléphone' };
  }

  // atLeastOneValue(form: FormGroup): ValidationErrors {
  //   return Object.keys(form.value).some(key => !!form.value[key]) ? null :
  //     { atLeastOneValue: '* Veuillez saisir au moins un critère' };
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
        this.simulationForm.setValue({
          montant: queryParams?.montant ?? this.simulationFormDefaults.montant,
          duree: queryParams?.duree ?? this.simulationFormDefaults.duree,
        }, { emitEvent: false });
      });

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

}
