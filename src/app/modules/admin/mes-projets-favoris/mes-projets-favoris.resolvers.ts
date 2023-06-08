import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ProjetsService } from 'app/core/projets/projets.service';
import { AuthenticationService } from 'app/core/auth/authentication.service';

@Injectable({
    providedIn: 'root'
})
export class MesProjetsFavorisResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(
        private _projetsService: ProjetsService,
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        let user = this._authenticationService.connectedUser;

        return this._projetsService.searchProjetsFavoris({
            userEmail: user.email,
        });
    }
}
