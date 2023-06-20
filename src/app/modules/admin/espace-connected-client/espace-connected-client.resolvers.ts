import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { RecordsInProgressService } from 'app/core/services/records-in-progress/records-in-progress.service';
import { UserService } from 'app/core/user/user.service';
import { SimulationDetailleeService } from 'app/core/services/projects/projects.service';
import { ProjetsService } from 'app/core/services/projets/projets.service';
import { DemandeSAVService } from 'app/core/services/demandes-sav/demandes-sav.service';


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

        const user=this._userService.getUserConnecte();
        const  email = user?.email ? user.email : '';
        const  cin = user?.cin ? user.cin : '';


        // const email = 'firstname.lastname@gmail.com';

        return this._recordsInProgressService.getCountCreditByEmailAndCin(cin,email);





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
        const user=this._userService.getUserConnecte();
        const  email = user?.email ? user.email : '';
        const  cin = user?.cin ? user.cin : '';

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

        const user=this._userService.getUserConnecte();
        const  email = user?.email ? user.email : '';

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


            const user=this._userService.getUserConnecte();
            const email = user?.email ? user.email : '';
            const cin = user?.cin ? user.cin : '';

        // const email = 'firstname.lastname@gmail.com';

        return this._recordsInProgressService.getCountDemandesCredits(cin,email);
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
        const user=this._userService.getUserConnecte();
      //  const email = user?.email ? user.email : '';
        const cin = user?.cin ? user.cin : '';
        // const email = 'firstname.lastname@gmail.com';

        return this._demandeSAVService.getCountDemandesSAV(cin);
    }
}
