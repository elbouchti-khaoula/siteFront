import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { TableauAmortissement } from './tableau-amortissement.types';
import { AuthenticationService } from 'app/core/auth/authentication.service';

@Injectable({
    providedIn: 'root'
})
export class TableauAmortissementService {
    
    // Private
    private _tableauAmortissement: BehaviorSubject<TableauAmortissement[] | null> = new BehaviorSubject(null);

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _authenticationService: AuthenticationService,
    )
    {   
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------
    /**
     * Getter for tableauAmortissement
     */
    get tableauAmortissement$(): Observable<TableauAmortissement[]> {
        return this._tableauAmortissement.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    clearTableauAmortissement() {
        this._tableauAmortissement.next(null);
    }

    getTableauAmortissement(dossierId: number): Observable<TableauAmortissement[]> {
        
        // return this._authenticationService.getTokenGeneric()
        //     .pipe(
        //         switchMap((token: string) => {

        //             if (token != undefined && token != '') {
        //                 const headers = new HttpHeaders({
        //                     'Content-Type': 'application/json',
        //                     'Authorization': `Bearer ${token}`
        //                 });

                        return this._httpClient.get<TableauAmortissement[]>(
                            `api/projects/dossiers/${dossierId}/amortissement`
                            // , { headers: headers }
                        ).pipe(
                            tap((response) => {
                                this._tableauAmortissement.next(response);
                            })
                        );
                //     }

                //     return EMPTY;
                // }));
    }

}
