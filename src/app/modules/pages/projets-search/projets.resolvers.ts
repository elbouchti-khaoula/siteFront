import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { ProjetsService } from 'app/core/services/projets/projets.service';
import { Projet } from 'app/core/services/projets/projets.types';
import { AuthenticationService } from 'app/core/auth/authentication.service';

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
        private _authenticationService: AuthenticationService
    )
    {
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
        let currentUser = this._authenticationService.connectedUser;

        return this._projetsService.searchProjets(state.root.queryParams, currentUser).pipe(
            // Error here means the requested projet is not available
            catchError((error) => {

                // Log the error
                console.error(error);

                if (error.status === 500) {
                    this._router.navigateByUrl('/500-server-error');
                } else if (error.status === 404) {
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


