import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ReferentielService } from 'app/core/services/referentiel/referentiel.service';

@Injectable({
    providedIn: 'root'
})
export class DemandeSAVDocumentsResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(
        private _router: Router,
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>
    {
        const navigation = this._router.getCurrentNavigation();
        const extrasState = navigation.extras.state;
        let operationSAVRef = extrasState?.operation;

        if (operationSAVRef?.operationId) {
            return this._referentielService.getOperationSAVDocuments(Number(operationSAVRef?.operationId));
        }
    }
}
