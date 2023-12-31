import { DOCUMENT } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, UntypedFormBuilder, UntypedFormGroup, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { catchError, debounceTime, Observable, Subject, takeUntil, throwError } from 'rxjs';
import { ProjetsService } from 'app/core/services/projets/projets.service';
import { ReferentielService } from 'app/core/services/referentiel/referentiel.service';
import { Quartier, TypeBien, Ville } from 'app/core/services/referentiel/referentiel.types';
import { User } from 'app/core/user/user.types';
import { AuthenticationService } from 'app/core/auth/authentication.service';

@Component({
  selector: 'projets-filter',
  templateUrl: './projets-filter.component.html',
  encapsulation: ViewEncapsulation.None
})
export class ProjetsFilterComponent implements OnInit, OnDestroy {

  user: User;
  isScreenSmall: boolean;
  @Input() parentComponent: 'landing' | 'projets-search' | 'landing1';

  searchForm: UntypedFormGroup;
  searchFormDefaults: any = {
    codeVille: null,
    codeQuartier: null,
    codeTypeBien: null,
    prixMin: null,
    prixMax: null
  };

  queryParams: Params;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  selectedVille: Ville = null;
  villes: Ville[];
  typesBiens: TypeBien[];
  quartiers$: Observable<Quartier[]>;

  /**
   * Constructor
   */
  constructor(
    @Inject(DOCUMENT) private _document: Document,
    private _changeDetectorRef: ChangeDetectorRef,
    private _fuseMediaWatcherService: FuseMediaWatcherService,
    private _projetsService: ProjetsService,
    private _formBuilder: UntypedFormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _referentielService: ReferentielService,
    private _authenticationService: AuthenticationService
  )
  {

    // Prepare the search form with defaults
    this.searchForm = this._formBuilder.group(
      {
        codeVille: [this.searchFormDefaults.codeVille],
        codeQuartier: [this.searchFormDefaults.codeQuartier],
        codeTypeBien: [this.searchFormDefaults.codeTypeBien],
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

    this.user = this._authenticationService.connectedUser;

    // Get the villes
    this._referentielService.villes$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((response: Ville[]) => {

        // Update the villes
        this.villes = response;

        // Mark for check
        this._changeDetectorRef.markForCheck();
      });

    // Get the types de bien
    this._referentielService.typesBiens$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((response: TypeBien[]) => {

        // Update the types de bien
        this.typesBiens = response;

        // Mark for check
        this._changeDetectorRef.markForCheck();
      });
    
    // Get the quartiers
    this.quartiers$ = this._referentielService.quartiers$;

    // Subscribe to media changes
    this._fuseMediaWatcherService.onMediaChange$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(({ matchingAliases }) => {

        // Check if the screen is small
        this.isScreenSmall = !matchingAliases.includes('md');
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
          codeVille: queryParams?.codeVille ? +queryParams?.codeVille : this.searchFormDefaults.codeVille,
          codeQuartier: queryParams?.codeQuartier ? +queryParams?.codeQuartier : this.searchFormDefaults.codeQuartier,
          codeTypeBien: queryParams?.codeTypeBien ? queryParams?.codeTypeBien : this.searchFormDefaults.codeTypeBien,
          prixMin: queryParams?.prixMin ? queryParams?.prixMin : this.searchFormDefaults.prixMin,
          prixMax: queryParams?.prixMax ? queryParams?.prixMax : this.searchFormDefaults.prixMax
        }, { emitEvent: false });

        if (queryParams?.codeVille || queryParams?.codeTypeBien || queryParams?.prixMin || queryParams?.prixMax) {
          this.searchForm.markAsDirty();
        }

        if (queryParams?.codeVille) {
          // this._referentielService.getQuartiersByVille(queryParams.codeVille).subscribe();
          let ville = this.villes.find(e => e.codeVille === Number(queryParams.codeVille));
          this.selectedVille = ville;
          this._referentielService.ville = ville;
        } else {
          this._referentielService.ville = null;
        }
      });

    // Subscribe to codeVille value changes
    this.searchForm.get('codeVille').valueChanges
      .pipe(
        debounceTime(300),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((value) => {
        this.getQuartiersByVille(value);
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
   * @param codeVille
   */
  getQuartiersByVille(selectedCodeVille: number) {
    if (selectedCodeVille) {
      this.selectedVille = this.villes.find(e => e.codeVille === selectedCodeVille);
      this._referentielService.getQuartiersByVille(selectedCodeVille).subscribe();
    } else {
      this.selectedVille = null;
    }
  }

  /**
   * Reset the search form using the default
   */
  reset(): void {
    this.searchForm.reset(this.searchFormDefaults);

    if (this.parentComponent === 'projets-search') {

      this._projetsService.searchProjets({}, this.user)
        .subscribe(() => {

          this._referentielService.ville = null;

          this._router.navigate([], {
            fragment: null,
            queryParams: {},
            relativeTo: this._activatedRoute
          });

          this._scrollResultIntoView();

        });

    }
  }

  /**
   * Perform the search
   */
  search(): void {
    this._projetsService.searchProjets(
      {
        codeVille: this.searchForm.get('codeVille').value,
        codeQuartier: this.searchForm.get('codeQuartier').value,
        codeTypeBien: this.searchForm.get('codeTypeBien').value,
        prixMin: this.searchForm.get('prixMin').value ? Number(this.searchForm.get('prixMin').value.toString().split(".")[0].replace(/\D/g, '')) : null,
        prixMax: this.searchForm.get('prixMax').value ? Number(this.searchForm.get('prixMax').value.toString().split(".")[0].replace(/\D/g, '')) : null
      }, this.user)
      .pipe(
        // Error here means the requested is not available
        catchError((error) => {

          // Log the error
          console.error(error);

          if (error.status === 500) {
            this._router.navigateByUrl('/500-server-error');
          } else if (error.status === 404) {
            this._router.navigateByUrl('/404-not-found');
          } else {
            // Get the parent url
            const parentUrl = this._router.routerState.snapshot.url.split('/').slice(0, -1).join('/');

            // Navigate to there
            this._router.navigateByUrl(parentUrl);
          }

          // Throw an error
          return throwError(() => error);
        }))
      .subscribe(() => {

        this._referentielService.ville = this.selectedVille;

        // Add query params using the router
        this._router.navigate([], {
          fragment: 'projetsResultId',
          queryParams: this.searchForm.value,
          relativeTo: this._activatedRoute
        });

        this._scrollResultIntoView();

      });
  }

  private _scrollResultIntoView(): void {
    // Wrap everything into setTimeout so we can make sure that we points to correct element
    setTimeout(() => {

      // Get the result element and scroll it into view
      const projetsResultId = this._document.getElementById('projetsResultId');
      if (projetsResultId) {
        projetsResultId.scrollIntoView({ behavior: "smooth" });
      }
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
        {
          fragment: 'projetsResultId',
          queryParams: {
            codeVille: this.searchForm.get('codeVille').value,
            codeQuartier: this.searchForm.get('codeQuartier').value,
            codeTypeBien: this.searchForm.get('codeTypeBien').value,
            prixMin: this.searchForm.get('prixMin').value ? Number(this.searchForm.get('prixMin').value.toString().replace(/\D/g, '')) : null,
            prixMax: this.searchForm.get('prixMax').value ? Number(this.searchForm.get('prixMax').value.toString().replace(/\D/g, '')) : null
          }
        }
      );

    }
  }

}
