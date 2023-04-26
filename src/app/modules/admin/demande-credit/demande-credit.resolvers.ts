import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { DemandeCreditService } from './demande-credit.service';

@Injectable({
    providedIn: 'root'
})
export class DemandeCreditResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(
        private _router: Router,
        private _demandeCreditService: DemandeCreditService
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
        let simulationResultat = extrasState;

        console.log("+-+-+- simulationResultat", simulationResultat);

        if (simulationResultat?.id) {
            return this._demandeCreditService.getDocuments(Number(simulationResultat.id));
        } else {
            return this._demandeCreditService.getDocuments(674266);
        }
    }
}
