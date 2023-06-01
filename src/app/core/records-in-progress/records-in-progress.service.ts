import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { CreditEnCours, DemandeCredit } from './records-in-progress.types';

@Injectable({
    providedIn: 'root'
})
export class RecordsInProgressService {
    // Private
    private _demandesCredit: BehaviorSubject<DemandeCredit[] | null> = new BehaviorSubject(null);
    private _creditsEnCours: BehaviorSubject<CreditEnCours[] | null> = new BehaviorSubject(null);

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

    /**
     * Getter for crédits en cours
     */
    get creditsEnCours$(): Observable<CreditEnCours[]> {
        return this._creditsEnCours.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Get demande de crédit
     */
    getDemandesCredit(cin: string, email: string): Observable<DemandeCredit[]> {

        return this._httpClient.post<DemandeCredit[]>('api/records-in-progress/demandes/search', { origin: "SITE", cin: cin, mail: email })
            .pipe(
                tap((response: DemandeCredit[]) => {

                    this._demandesCredit.next(response);
                })
            );
    }

    /**
     * Get Crédits en cours
     */
    getCreditsEnCours(cin: string, email: string): Observable<CreditEnCours[]> {

        // 640891
        return this._httpClient.post<CreditEnCours[]>('api/records-in-progress/credits/search', { origin: "SITE", cin: cin, mail: email })
            .pipe(
                tap((response: CreditEnCours[]) => {

                    this._creditsEnCours.next(response);
                })
            );
    }

    /**
     * count mes credit
     */
    getCountCreditByEmailAndCin(email: string, cin: string): Observable<number> {
        return this._httpClient.post<number>('api/records-in-progress/credits/count', { origin: "SITE", cin: "640891", mail: email })
            .pipe(
                map((response: number) => response)
            );
    }

}
