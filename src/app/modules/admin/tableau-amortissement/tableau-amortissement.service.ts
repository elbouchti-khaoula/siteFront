import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, EMPTY, Observable, switchMap, tap } from 'rxjs';
import { TableauAmortissement } from './tableau-amortissement.types';
import { ProjectAuthService } from 'app/core/projects-auth/projects-auth.service';

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
        private _projectAuthService: ProjectAuthService,
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
