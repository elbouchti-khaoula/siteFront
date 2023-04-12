import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, EMPTY, Observable, of, switchMap, tap } from 'rxjs';
import { TableauAmortissementPagination, TableauAmortissement } from './tableau-amortissement.types';
import { ProjectAuthService } from 'app/core/projects-auth/projects-auth.service';

@Injectable({
    providedIn: 'root'
})
export class TableauAmortissementService {
    
    // Private
    // private _pagination: BehaviorSubject<TableauAmortissementPagination | null> = new BehaviorSubject(null);
    private _tableauAmortissement: BehaviorSubject<TableauAmortissement[] | null> = new BehaviorSubject(null);

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _projectAuthService: ProjectAuthService,
    ) {   
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    // /**
    //  * Getter for pagination
    //  */
    // get pagination$(): Observable<TableauAmortissementPagination> {
    //     return this._pagination.asObservable();
    // }

    /**
     * Getter for tableauAmortissement
     */
    get tableauAmortissement$(): Observable<TableauAmortissement[]> {
        return this._tableauAmortissement.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    // /**
    //  * Get tableauAmortissement
    //  *
    //  *
    //  * @param page
    //  * @param size
    //  * @param sort
    //  * @param order
    //  * @param search
    //  */
    // getTableauAmortissement(page: number = 0, size: number = 10, sort: string = 'name', order: 'asc' | 'desc' | '' = 'asc', search: string = ''):
    //     Observable<{ pagination: TableauAmortissementPagination; tableauAmortissement: TableauAmortissement[] }> {
    //     return this._httpClient.get<{ pagination: TableauAmortissementPagination; tableauAmortissement: TableauAmortissement[] }>('api/products/tableauAmortissement', {
    //         params: {
    //             page: '' + page,
    //             size: '' + size,
    //             sort,
    //             order,
    //             search
    //         }
    //     }).pipe(
    //         tap((response) => {
    //             this._pagination.next(response.pagination);
    //             this._tableauAmortissement.next(response.tableauAmortissement);
    //         })
    //     );
    // }

    getTableauAmortissement(dossierId: number): Observable<TableauAmortissement[]> {
        
        return this._projectAuthService.getToken()
            .pipe(
                switchMap((token: string) => {

                    if (token != undefined && token != '') {
                        const headers = new HttpHeaders({
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        });

                        return this._httpClient.get<TableauAmortissement[]>(
                            `api/projects/dossiers/${dossierId}/amortissement`, { headers: headers }
                        ).pipe(
                            tap((response) => {
                                this._tableauAmortissement.next(response);
                            })
                        );
                    }

                    return EMPTY;
                }));
    }

}
