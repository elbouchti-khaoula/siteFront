import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { SimulationDetailleeService } from 'app/core/projects/simulation-detaillee.service';
import { UserService } from 'app/core/user/user.service';

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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        let email;
        this._userService.user$.subscribe((user) => {
            email = user?.email ? user.email : '';
        });

        return this._simulationService.search(email);
    }
}
