import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { CriterePersonnalisee, SimulationPersonnalisee } from './simulation.types';

@Injectable({
    providedIn: 'root'
})
export class SimulationPersonaliseeService {

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
    simuler(critere: CriterePersonnalisee): Observable<SimulationPersonnalisee> {

        return this._httpClient.post<SimulationPersonnalisee>('api/repositories/simulation-personnalisee',
            // { params: new HttpParams({ fromObject: critere })}
            critere
        )
            .pipe(
                tap((response: SimulationPersonnalisee) => {
                    this._simulation.next(response);
                })
            );
    }

}
