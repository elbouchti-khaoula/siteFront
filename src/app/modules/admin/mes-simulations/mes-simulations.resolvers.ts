import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { SimulationDetailleeService } from 'app/core/projects/projects.service';
import { AuthenticationService } from 'app/core/auth/authentication.service';

@Injectable({
    providedIn: 'root'
})
export class MesSimulationsResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(
        private _simulationService: SimulationDetailleeService,
        private _authenticationService: AuthenticationService
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        let user = this._authenticationService.connectedUser;

        return this._simulationService.search(user.email);
    }
}
