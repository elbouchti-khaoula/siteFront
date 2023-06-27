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
        return this._reclamationsService.getMotifs();
    }
}

