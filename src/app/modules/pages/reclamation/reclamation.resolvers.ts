import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { ReclamationsService } from './reclamation.service';
import { Motif } from './reclamation.types';

@Injectable({
    providedIn: 'root'
})
export class MotifsResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(
        private _reclamationsService: ReclamationsService,
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Motif[]>
    {
        return this._reclamationsService.getMotifs().pipe(
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
                return throwError(() => error);
            })
        );
    }
}

