import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { CritereDemandeSAV, DemandeSAV } from './demandes-sav.types';

@Injectable({
    providedIn: 'root'
})
export class DemandeSAVService {

    // Private
    private _demandesSAV: BehaviorSubject<DemandeSAV[] | null> = new BehaviorSubject(null);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for demandes SAV
     */
    get demandesSAV$(): Observable<DemandeSAV[]> {
        return this._demandesSAV.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create demande SAV
     *
     * @param critereDemandeSAV
     */
    createDemandeSAV(critereDemandeSAV: CritereDemandeSAV): Observable<DemandeSAV> {
        return this._httpClient.post<DemandeSAV>('api/sav/demandessav', critereDemandeSAV)
            .pipe(
                map((newDemandeSAV: DemandeSAV) => {

                    // Return a new observable with the response
                    return newDemandeSAV
                })
            );
    }

    /**
     * get count mes operations SAV
     *
     * @param cin
     */
    getCountDemandesSAV(cin: string): Observable<any> {

        return this._httpClient.post<number>('api/sav/demandessav/count', { cin: cin, mail: "" })
            .pipe(
                map((response: number) => {
                    return response;
                })
            );
    }

    /**
     * lister mes operations SAV
     *
     * @param cin
     */
    getDemandesSAV(cin: string): Observable<DemandeSAV[]> {

        return this._httpClient.post<DemandeSAV[]>('api/sav/demandessav', { cin: cin, mail: "" })
            .pipe(
                map((response: DemandeSAV[]) => {

                    this._demandesSAV.next(response);
                    
                    return response;
                })
            );
    }

}
