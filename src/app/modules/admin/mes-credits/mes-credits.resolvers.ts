import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ReferentielService } from 'app/core/referentiel/referentiel.service';
import { RecordsInProgressService } from 'app/core/records-in-progress/records-in-progress.service';
import { UserService } from 'app/core/user/user.service';

@Injectable({
    providedIn: 'root'
})
export class OperationSAVRefResolver implements Resolve<any>
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
        return this._referentielService.getOperationsSAVRef();
    }
}


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
        private _userService: UserService
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
        var email = '';
        var cin = '';
        this._userService.user$.subscribe((user) => {
            if (user != undefined && user != null) {
                email = user.email;
                cin = user.cin;
            }
        });
        return this._recordsInProgressService.getCreditsEnCours(cin, email);
    }

}