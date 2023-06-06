import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { RecordsInProgressService } from 'app/core/records-in-progress/records-in-progress.service';
import { UserService } from 'app/core/user/user.service';
import { SimulationDetailleeService } from 'app/core/projects/projects.service';
import { ProjetsService } from 'app/core/projets/projets.service';
import { DemandeSAVService } from 'app/core/demandes-sav/demandes-sav.service';


@Injectable({
    providedIn: 'root'
})
export class CountCreditResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(
        private _recordsInProgressService: RecordsInProgressService,
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
        let cin;
        this._userService.user$.subscribe((user) => {
            email = user?.email ? user.email : '';
            cin = user?.cin ? user.cin : '';


        });
        // const email = 'firstname.lastname@gmail.com';

        return this._recordsInProgressService.getCountCreditByEmailAndCin(cin);





    }




}


@Injectable({
    providedIn: 'root'
})
export class CountSimulationResolver implements Resolve<any>
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
        // alert(localStorage.getItem('accessTokenAdmin'));
        let email: string;
        let cin: string;
        this._userService.user$.subscribe((user) => {
            email = user?.email ? user.email : '';
            cin = user?.cin ? user.cin : '';
        });
   
        return this._simulationService.getCountSimulation(email, cin);
    }

}


@Injectable({
    providedIn: 'root'
})
export class CountProjetsFavorisResolver implements Resolve<any>
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
        // alert(localStorage.getItem('accessTokenAdmin'));
        let email;
        this._userService.user$.subscribe((user) => {
            email = user?.email ? user.email : '';
        });
        // const email = 'firstname.lastname@gmail.com';

        return this._projetsService.getCountProjetFavoris(email);
    }
}


@Injectable({
    providedIn: 'root'
})
export class CountDemandesCreditsResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(
        private _recordsInProgressService: RecordsInProgressService,
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
        // alert(localStorage.getItem('accessTokenAdmin'));
        let email;
        let cin;
        this._userService.user$.subscribe((user) => {
            email = user?.email ? user.email : '';
            cin = user?.cin ? user.cin : '';

        });
        // const email = 'firstname.lastname@gmail.com';

        return this._recordsInProgressService.getCountDemandesCredits(cin);
    }
}



@Injectable({
    providedIn: 'root'
})
export class CountDemandesSAVResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(
        private _demandeSAVService: DemandeSAVService,
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
        // alert(localStorage.getItem('accessTokenAdmin'));
        let email;
        let cin;
        this._userService.user$.subscribe((user) => {
            email = user?.email ? user.email : '';
            cin = user?.cin ? user.cin : '';
        });
        // const email = 'firstname.lastname@gmail.com';

        return this._demandeSAVService.getCountDemandesSAV(cin);
    }
}
