import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { CritereDemandeSAV, DemandeSAV } from './demandes-sav.types';
import { head } from 'lodash';

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
        return this._httpClient.post<DemandeSAV>('api/sav/demandesav', critereDemandeSAV)
            .pipe(
                map((newDemandeSAV: DemandeSAV) => {

                    // Return a new observable with the response
                    return newDemandeSAV
                })
            );
    }


    /**
     * get count mes operation SAV
     *
     * @param cin
     */
    getCountDemandesSAV(cin: string): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            //'Authorization': `Bearer ${token}`
        });

        return this._httpClient.post<number>('api/sav/demandesav/count', { cin: cin, mail: ""},{ headers: headers })
            .pipe(
                map((response: number) => {
                    console.log(cin);
                    console.log(response); // Imprime la valeur du compteur
                    return response;
                })
            );
    }


}
