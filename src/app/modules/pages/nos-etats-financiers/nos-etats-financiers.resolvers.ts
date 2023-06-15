import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ReferentielService } from 'app/core/services/referentiel/referentiel.service';

@Injectable({
    providedIn: 'root'
})
export class NosEtatsFinanciersResolver implements Resolve<any>
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return this._referentielService.searchDocuments({
            type: "EtatFinancier",
        });
    }
}
