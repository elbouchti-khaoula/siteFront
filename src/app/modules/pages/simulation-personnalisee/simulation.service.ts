import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { SimulationPersonnalisee } from './simulation.types';

@Injectable({
    providedIn: 'root'
})
export class SimulationService {

    // Private
    private _simulation: BehaviorSubject<SimulationPersonnalisee | null> = new BehaviorSubject(null);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for simulation
     */
    get simulation$(): Observable<SimulationPersonnalisee> {
        return this._simulation.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Simulation personnalisée with given query
     *
     * @param queryParams
     */
    simuler(queryParams: { montant: number; duree: number; cspCode: string; nationaliteCode: string; residentMarocain: boolean }): Observable<SimulationPersonnalisee>
    {
        return this._httpClient.get<SimulationPersonnalisee>('api/repositories/simulation-personnalisee', {
            params: queryParams
        })
            .pipe(
                tap((response: SimulationPersonnalisee) => {
                    this._simulation.next(response);
                })
            );
    }

}
