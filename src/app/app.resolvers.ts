import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { catchError, forkJoin, Observable, throwError } from 'rxjs';
import { NavigationService } from 'app/core/navigation/navigation.service';
import { ReferentielService } from 'app/core/referentiel/referentiel.service';
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

        // Fork join multiple API endpoint calls to wait all of them to finish
        return forkJoin([
            this._navigationService.get(),
            // this._messagesService.getAll(),
            // this._notificationsService.getAll(),
            // this._quickChatService.getChats(),
            // this._shortcutsService.getAll(),
        ]);
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

        return new Observable<any>((observer) => {
            this._authenticationService.getTokenGeneric()
                .pipe(
                    catchError((error) => {
                        // Handle error if token generation fails
                        // observer.error(error);

                        // Log the error
                        console.log('error génération token ::' + error);

                        // Throw an error
                        return throwError(() => error);
                    }))
                .subscribe((response: any) => {
                    // console.log('génération new token:: ' + response);
                    observer.next(this._referentielService.getVilles().subscribe());
                    observer.next(this._referentielService.getTypesBiens().subscribe());
                    observer.next(this._referentielService.getAgences().subscribe());
                    observer.next(this._referentielService.getNationalites().subscribe());
                    observer.next(this._referentielService.getCategories().subscribe());
                    observer.next(this._referentielService.getObjetsFinancement().subscribe());
                    observer.next(this._referentielService.getOperationsSAVRef().subscribe());
                    observer.complete();
                });
        });
    }

}
