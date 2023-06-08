import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { ProjetsService } from 'app/core/projets/projets.service';
import { Projet } from 'app/core/projets/projets.types';
import { UserService } from 'app/core/user/user.service';

@Injectable({
    providedIn: 'root'
})
export class ProjetsResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(
        private _projetsService: ProjetsService,
        private _router: Router,
        private _userService: UserService
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Projet[]>
    {
        let currentUser;
        this._userService.user$.subscribe((user) => {
            currentUser = user;
        });

        return this._projetsService.searchProjets(state.root.queryParams, currentUser).pipe(
            // Error here means the requested projet is not available
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
                return throwError(() => error);
            })
        );
    }
}

@Injectable({
    providedIn: 'root'
})
export class ProjetsProjetResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(
        private _projetsService: ProjetsService,
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Projet>
    {
        return this._projetsService.getProjetById(Number(route.queryParamMap.get('id'))).pipe(
            // Error here means the requested projet is not available
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
                return throwError(() => error);
            })
        );
    }
}

