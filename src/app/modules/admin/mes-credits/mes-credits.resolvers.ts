import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { RecordsInProgressService } from 'app/core/records-in-progress/records-in-progress.service';
import { AuthenticationService } from 'app/core/auth/authentication.service';



@Injectable({
    providedIn: 'root'
})
export class MesCreditsEnCoursResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(
        private _recordsInProgressService: RecordsInProgressService,
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

        return this._recordsInProgressService.getCreditsEnCours(user.cin, user.email);
    }

}