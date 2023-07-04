import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ReferentielService } from 'app/core/services/referentiel/referentiel.service';
import { Agence } from 'app/core/services/referentiel/referentiel.types';

@Injectable({
    providedIn: 'root'
})
export class AgencesResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(
        private _referentielService: ReferentielService
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Agence[]>
    {
        let agences = JSON.parse(localStorage.getItem('agences'));
        this._referentielService.agences = agences;
        return of(agences);
    }
    
}
