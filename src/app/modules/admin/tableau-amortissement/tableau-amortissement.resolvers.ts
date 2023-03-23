import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { TableauAmortissementService } from './tableau-amortissement.service';
import { TableauAmortissementPagination, TableauAmortissement } from './tableau-amortissement.types';

@Injectable({
    providedIn: 'root'
})
export class TableauAmortissementResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _tableauAmortissementService: TableauAmortissementService)
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{ pagination: TableauAmortissementPagination; tableauAmortissement: TableauAmortissement[] }>
    {
        return this._tableauAmortissementService.getTableauAmortissement();
    }
}
