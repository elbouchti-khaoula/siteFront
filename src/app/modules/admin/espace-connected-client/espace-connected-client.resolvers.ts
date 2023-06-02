import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { RecordsInProgressService } from 'app/core/records-in-progress/records-in-progress.service';
import { UserService } from 'app/core/user/user.service';
import { SimulationDetailleeService } from 'app/core/projects/projects.service';
import { ProjetsService } from 'app/core/projets/projets.service';


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
       // const email = 'firstname.lastname@gmail.com';
       // const cin = '640891';
      
        return this._recordsInProgressService.getCountCreditByEmailAndCin(email,email);
        



        
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
       // alert(localStorage.getItem('accessTokenAdmin'));
       let email;
       let cin;
        this._userService.user$.subscribe((user) => {
            email = user?.email ? user.email : '';

            cin = user?.cin ? user.cin : '';
        });
       // const email = 'firstname.lastname@gmail.com';
        //const cin = 'B727021';
      
        return this._simulationService.getCountSimulation(cin,email);
        



        
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
       // alert(localStorage.getItem('accessTokenAdmin'));
       let email;
        this._userService.user$.subscribe((user) => {
            email = user?.email ? user.email : '';
        });
       // const email = 'firstname.lastname@gmail.com';
        const cin = '';
      
        return this._projetsService.getCountProjetFavoris(cin,email);
        



        
    }

  
    

}

