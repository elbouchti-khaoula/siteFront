import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, UntypedFormBuilder, UntypedFormGroup, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { debounceTime, Observable, Subject, takeUntil } from 'rxjs';
import { ProjetsService } from '../../projets-search/projets.service';
import { ReferentielService } from '../referentiel.service';
import { Quartier, TypeBien, Ville } from '../referentiel.types';

@Component({
  selector: 'projets-filter',
  templateUrl: './projets-filter.component.html',
  encapsulation: ViewEncapsulation.None
})
export class ProjetsFilterComponent implements OnInit, OnDestroy {

  isScreenSmall: boolean;
  @Input() parentComponent: 'landing' | 'projet-search';

  searchForm: UntypedFormGroup;
  searchFormDefaults: any = {
    ville: null,
    quartier: null,
    typeBien: null,
    prixMin: null,
    prixMax: null
  };

  queryParams: Params;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  villes: Ville[];
  typesBiens: TypeBien[];
  quartiers: Quartier[];
  quartiers$: Observable<Quartier[]>;

  /**
   * Constructor
   */
  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _fuseMediaWatcherService: FuseMediaWatcherService,
    private _projetsService: ProjetsService,
    private _formBuilder: UntypedFormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _referentielService: ReferentielService
  ) {

    // Prepare the search form with defaults
    this.searchForm = this._formBuilder.group(
      {
        ville: [this.searchFormDefaults.ville],
        quartier: [this.searchFormDefaults.quartier],
        typeBien: [this.searchFormDefaults.typeBien],
        prixMin: [this.searchFormDefaults.prixMin],
        prixMax: [this.searchFormDefaults.prixMax]
      },
      { validators: this.atLeastOneValue }
    );

  }

  atLeastOneValue(form: FormGroup): ValidationErrors {
    return Object.keys(form.value).some(key => !!form.value[key]) ?
      null :
      { atLeastOneValue: '* Veuillez saisir au moins un critère' };
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  ngOnInit(): void {

    // Get the villes
    this._referentielService.villes$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((villes: Ville[]) => {

        // Update the villes
        this.villes = villes;

        // Mark for check
        this._changeDetectorRef.markForCheck();
      });

    // Get the types de bien
    this._referentielService.typesBiens$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((typesBiens: TypeBien[]) => {

        // Update the types de bien
        this.typesBiens = typesBiens;

        // Mark for check
        this._changeDetectorRef.markForCheck();
      });

    // Subscribe to media changes
    this._fuseMediaWatcherService.onMediaChange$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(({ matchingAliases }) => {

        // Check if the screen is small
        this.isScreenSmall = !matchingAliases.includes('md');
      });

    this.searchForm.get('ville').valueChanges
      .pipe(
        debounceTime(300),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((value) => {

        // this.quartiers$ = this._referentielService.getQuartiersByVille(value);
        this.getQuartiersByVille(value);
      });

    // Subscribe to query params change
    this._activatedRoute.queryParams
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((queryParams) => {

        // Store the query params
        this.queryParams = queryParams;

        // Fill the form with the values from query
        // params without emitting any form events
        this.searchForm.setValue({
          ville: queryParams?.ville ? +queryParams?.ville : this.searchFormDefaults.ville,
          quartier: queryParams?.quartier ? +queryParams?.quartier : this.searchFormDefaults.quartier,
          typeBien: queryParams?.typeBien ? queryParams?.typeBien : this.searchFormDefaults.typeBien,
          prixMin: queryParams?.prixMin ? queryParams?.prixMin : this.searchFormDefaults.prixMin,
          prixMax: queryParams?.prixMax ? queryParams?.prixMax : this.searchFormDefaults.prixMax
        }, { emitEvent: false });

        if (queryParams?.ville || queryParams?.typeBien || queryParams?.prixMin || queryParams?.prixMax) {
          this.searchForm.markAsDirty();
        }

        if (queryParams?.ville) {
          this.quartiers$ = this._referentielService.getQuartiersByVille(queryParams?.ville);
        }
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
   * Get quartiers by ville using ville code
   *
   * @param ville
   */
  getQuartiersByVille(ville: number) {

    this.quartiers$ = this._referentielService.quartiers$;
    this._referentielService.getQuartiersByVille(ville)
      .subscribe((response) => {

        // Set the quartiers
        this.quartiers = response;
      });

  }

  /**
   * Reset the search form using the default
   */
  reset(): void {
    this.searchForm.reset(this.searchFormDefaults);
    if (this.parentComponent === 'projet-search') {
      this._router.navigate(['./'], {
        queryParams: {},
        relativeTo: this._activatedRoute
      });
    }
  }

  /**
   * Perform the search
   */
  search(): void {
    this._projetsService.searchProjets(this.searchForm.value).subscribe(() => {

      // Add query params using the router
      this._router.navigate(
        [],
        {
          fragment: "projetsId",
          queryParams: this.searchForm.value,
          relativeTo: this._activatedRoute
        }
      );
    });
  }

  /**
   * Perform the search and navigate
   */
  navigateToMarketPlace(): void {
    if (!(this.searchForm.pristine || this.searchForm.invalid)) {
      // Add query params using the router
      this._router.navigate(
        ['/projets-search'],
        { fragment: 'projetsId', queryParams: this.searchForm.value }
      );
    }
  }

}
