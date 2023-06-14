import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import {catchError, forkJoin, Observable, of, Subscriber, throwError} from 'rxjs';
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

    /**
     * Use this resolver to resolve initial mock-api for the application
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {


        return new Observable<any>((observer) => {
            if (this._authenticationService.accessTokenGeneric){
                console.log('utilisation token '+this._authenticationService.accessTokenGeneric);
                observer.next(this._referentielService.getVilles().subscribe());
                observer.next(this._referentielService.getTypesBiens().subscribe());
                observer.next(this._referentielService.getAgences().subscribe());
                observer.next(this._referentielService.getNationalites().subscribe());
                observer.next(this._referentielService.getCategories().subscribe());
                observer.next(this._referentielService.getObjetsFinancement().subscribe());
                observer.next(this._referentielService.getOperationsSAVRef().subscribe());
                observer.complete();
                observer.unsubscribe();
            }else{
               this._authenticationService.getSyncAccessTokenGeneric()
                .catch((error: any)=>
                {
                    console.error('erreur génération token [généric]'+error.message);
                }).then((response: any) => {
                        // console.log('génération new token:: ' + response.accesToken);
                    this._authenticationService.accessTokenGeneric = response.accesToken;
                    observer.next(this._referentielService.getVilles().subscribe());
                    observer.next(this._referentielService.getTypesBiens().subscribe());
                    observer.next(this._referentielService.getAgences().subscribe());
                    observer.next(this._referentielService.getNationalites().subscribe());
                    observer.next(this._referentielService.getCategories().subscribe());
                    observer.next(this._referentielService.getObjetsFinancement().subscribe());
                    observer.next(this._referentielService.getOperationsSAVRef().subscribe());
                    observer.complete();
                    observer.unsubscribe();
                });
        }
            }
        );
    }



}

@Injectable({
    providedIn: 'root'
})
export class InitialGenericTokenResolver implements Resolve<any> {
    /**
     * Constructor
     */
    constructor(
        private _authenticationService: AuthenticationService
    ) {
    }

    /**
     * Use this resolver to resolve initial mock-api for the application
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        if (!this._authenticationService.accessTokenGeneric) {
            return new Observable<any>((observer) => {

                    this._authenticationService.getSyncAccessTokenGeneric()
                        .catch((error: any)=>
                        {
                            console.error('erreur génération token [généric]'+error.message);
                        }).then((response: any) => {
                        this._authenticationService.accessTokenGeneric = response.accesToken;
                        //alert('resolver token ');
                        console.log('génération new token:: ' + response.accesToken);
                        observer.unsubscribe();
                    });
                }
            );}

    }



}
