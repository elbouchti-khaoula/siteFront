import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'app/core/user/user.service';
import { ProjetsService } from 'app/core/projets/projets.service';

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

        return this._projetsService.searchProjetsFavoris({
            userEmail: email,
        });
    }
}
