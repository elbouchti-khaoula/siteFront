import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { SimulationDetailleeService } from 'app/core/projects/projects.service';

@Injectable({
    providedIn: 'root'
})
export class DemandeCreditDocumentsResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(
        private _router: Router,
        private _simulationDetailleeService: SimulationDetailleeService
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

        if (simulationResultat?.id) {
            return this._simulationDetailleeService.getDocuments(Number(simulationResultat.id));
        }
        // else {
        //     return this._simulationDetailleeService.getDocuments(674266);
        // }
    }
}
