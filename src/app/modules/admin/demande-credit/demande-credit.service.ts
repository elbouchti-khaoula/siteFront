import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, EMPTY, Observable, switchMap, tap } from 'rxjs';
import { ProjectAuthService } from 'app/core/projects-auth/projects-auth.service';

@Injectable({
    providedIn: 'root'
})
export class DemandeCreditService {

    // Private
    private _documents: BehaviorSubject<any | null> = new BehaviorSubject(null);

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
     * Getter for documents
     */
    get documents$(): Observable<any> {
        return this._documents.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Simulation détaillée with given query
     *
     * @param queryParams
     */
    getDocuments(simulationId: number): Observable<any> {

        return this._projectAuthService.getToken()
            .pipe(
                switchMap((token: string) => {

                    if (token != undefined && token != '') {

                        const headers = new HttpHeaders({
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        });

                        return this._httpClient.get<any>(
                            `api/projects/${simulationId}/documents`, { headers: headers }
                        ).pipe(
                            tap((response) => {
                                this._documents.next(response);
                            })
                        );
                    }
                    return EMPTY;
                }));
    }

}
