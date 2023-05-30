import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { DemandeCredit } from './records-in-progress.types';

@Injectable({
    providedIn: 'root'
})
export class RecordsInProgressService {
    // Private
    private _demandesCredit: BehaviorSubject<DemandeCredit[] | null> = new BehaviorSubject(null);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for demandes de crédit
     */
    get demandesCredit$(): Observable<DemandeCredit[]> {
        return this._demandesCredit.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Get demande de crédit
     */
    getDemandesCredit(email: string): Observable<DemandeCredit[]> {

        return this._httpClient.post<DemandeCredit[]>('api/records-in-progress/demandes/search', { origin: "SITE", cin: email, mail: email })
            .pipe(
                tap((response: DemandeCredit[]) => {

                    this._demandesCredit.next(response);
                })
            );
    }



}
