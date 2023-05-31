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
        let email;
        this._userService.user$.subscribe((user) => {
            email = user?.email ? user.email : '';
        });
        return this._recordsInProgressService.getCreditsEnCours(email);
    }

}