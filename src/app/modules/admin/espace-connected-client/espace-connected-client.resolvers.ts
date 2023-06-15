import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { RecordsInProgressService } from 'app/core/services/records-in-progress/records-in-progress.service';
import { SimulationDetailleeService } from 'app/core/services/projects/projects.service';
import { ProjetsService } from 'app/core/services/projets/projets.service';
import { DemandeSAVService } from 'app/core/services/demandes-sav/demandes-sav.service';
import { AuthenticationService } from 'app/core/auth/authentication.service';


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

        return this._recordsInProgressService.getCountCreditByEmailAndCin(user.cin);
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
   
        return this._simulationService.getCountSimulation(user.email, user.cin);
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

        return this._projetsService.getCountProjetFavoris(user.email);
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

        return this._recordsInProgressService.getCountDemandesCredits(user.cin);
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

        return this._demandeSAVService.getCountDemandesSAV(user.cin);
    }
}
