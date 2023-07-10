import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { forkJoin, Observable, switchMap } from 'rxjs';
import { NavigationService } from 'app/core/navigation/navigation.service';
import { ReferentielService } from 'app/core/services/referentiel/referentiel.service';
import { AuthenticationService } from './core/auth/authentication.service';


@Injectable({
    providedIn: 'root'
})
export class NavigationResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(
        private _navigationService: NavigationService
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Use this resolver to resolve initial mock-api for the application
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

        return this._navigationService.get();
    }

}

@Injectable({
    providedIn: 'root'
})
export class InitialDataResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(
        private _referentielService: ReferentielService,
        private _authenticationService: AuthenticationService
    )
    {
    }

    /**
     * Use this resolver to resolve initial mock-api for the application
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

        return this._authenticationService.getTokenGeneric()
            .pipe(
                switchMap((response: string) => {

                    // console.log('get générique token : ' + response);
                    
                    // Fork join multiple API endpoint calls to wait all of them to finish
                    return forkJoin([
                        this._referentielService.getVilles(),
                        this._referentielService.getTypesBiens(),
                        this._referentielService.getAgences(),
                        this._referentielService.getNationalites(),
                        this._referentielService.getCategories(),
                        this._referentielService.getObjetsFinancement(),
                        this._referentielService.getOperationsSAVRef(),
                        this._authenticationService.setUserFromStorage(),
                    ]);
                })
            );
    }

}
