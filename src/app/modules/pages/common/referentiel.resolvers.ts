import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { ReferentielService } from './referentiel.service';
import { CategorieSocioProfessionnelle, TypeBien, Ville } from './referentiel.types';

@Injectable({
    providedIn: 'root'
})
export class CategoriesSPResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(
        private _referentielService: ReferentielService,
        private _router: Router
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CategorieSocioProfessionnelle[]>
    {
        return this._referentielService.getCategories().pipe(
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
                    const parentUrl = state.url.split('/').slice(0, -1).join('/');

                    // Navigate to there
                    this._router.navigateByUrl(parentUrl);
                }

                // Throw an error
                return throwError(error);
            })
        );
    }
}

@Injectable({
    providedIn: 'root'
})
export class VillesResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(
        private _referentielService: ReferentielService,
        private _router: Router
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Ville[]>
    {
        return this._referentielService.getVilles().pipe(
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
                    const parentUrl = state.url.split('/').slice(0, -1).join('/');

                    // Navigate to there
                    this._router.navigateByUrl(parentUrl);
                }

                // Throw an error
                return throwError(error);
            })
        );
    }
}

@Injectable({
    providedIn: 'root'
})
export class TypesBiensResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(
        private _referentielService: ReferentielService,
        private _router: Router
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TypeBien[]>
    {
        return this._referentielService.getTypesBiens().pipe(
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
                    const parentUrl = state.url.split('/').slice(0, -1).join('/');

                    // Navigate to there
                    this._router.navigateByUrl(parentUrl);
                }

                // Throw an error
                return throwError(error);
            })
        );
    }
}