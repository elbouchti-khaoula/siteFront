import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject,  Observable, tap } from 'rxjs';
import { TableauAmortissementPagination, TableauAmortissement } from './tableau-amortissement.types';

@Injectable({
    providedIn: 'root'
})
export class TableauAmortissementService
{
    // Private
    private _pagination: BehaviorSubject<TableauAmortissementPagination | null> = new BehaviorSubject(null);
    private _tableauAmortissement: BehaviorSubject<TableauAmortissement[] | null> = new BehaviorSubject(null);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for pagination
     */
    get pagination$(): Observable<TableauAmortissementPagination>
    {
        return this._pagination.asObservable();
    }

    /**
     * Getter for tableauAmortissement
     */
    get tableauAmortissement$(): Observable<TableauAmortissement[]>
    {
        return this._tableauAmortissement.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get tableauAmortissement
     *
     *
     * @param page
     * @param size
     * @param sort
     * @param order
     * @param search
     */
    getTableauAmortissement(page: number = 0, size: number = 10, sort: string = 'name', order: 'asc' | 'desc' | '' = 'asc', search: string = ''):
        Observable<{ pagination: TableauAmortissementPagination; tableauAmortissement: TableauAmortissement[] }>
    {
        return this._httpClient.get<{ pagination: TableauAmortissementPagination; tableauAmortissement: TableauAmortissement[] }>('api/products/tableauAmortissement', {
            params: {
                page: '' + page,
                size: '' + size,
                sort,
                order,
                search
            }
        }).pipe(
            tap((response) => {
                this._pagination.next(response.pagination);
                this._tableauAmortissement.next(response.tableauAmortissement);
            })
        );
    }

}
