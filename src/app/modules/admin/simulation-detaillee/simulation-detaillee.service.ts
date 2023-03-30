import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, EMPTY, map, Observable, of, switchMap, tap } from 'rxjs';
import { CritereDetaillee, SimulationDetaillee } from './simulation-detaillee.types';

@Injectable({
    providedIn: 'root'
})
export class SimulationDetailleeService {

    // Private
    private _simulation: BehaviorSubject<SimulationDetaillee[] | null> = new BehaviorSubject(null);

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
    get simulation$(): Observable<SimulationDetaillee[]> {
        return this._simulation.asObservable();
    }


    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get token from salesForce
     *
     */
    private getKeyClockToken(): Observable<string> {
        return this._httpClient.post('api/projects/authentification/getToken',
            {
                userName: "siteweb",
                password: "w@afa2022"
            }
        ).pipe(
            switchMap((response: any) => {

                // Return a new observable with the response
                return of(response.accesToken.toString());
            })
        );
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Simulation personnalisée with given query
     *
     * @param queryParams
     */
    simuler(critere: CritereDetaillee): Observable<SimulationDetaillee[]> {

        return this.getKeyClockToken()
            .pipe(
                switchMap((token: string) => {

                    if (token != undefined && token != '') {

                        const headers = new HttpHeaders({
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        });

                        return this._httpClient.post('api/projects/simulation', critere, { headers: headers })
                            .pipe(
                                map((response1: any[]) => {

                                    console.log("+-+-+- response1 service", response1);

                                    let convert = this.convertToSimulation(response1);

                                    console.log("+-+-+- s", convert);

                                    this._simulation.next(convert);

                                    return convert;
                                    // return this._httpClient.post('api/repositories/frais-annexes', {params: { montant :  critere.montantProposition} })
                                    //     .pipe(
                                    //         tap((response2 : any) => {

                                    //             console.log("+-+-+- response2", response2);

                                    //             this._simulation.next(this.convertToSimulation(response1, response2));
                                    //         })
                                    //     );
                                })
                            );
                    }
                    return EMPTY;
                }));
    }

    convertToSimulation(response1: any[]
        // , response2: any
    ): SimulationDetaillee[] {
        return response1.map(e => {
            return {
                id: e.id,
                montant: e.montant,
                montantProposition: e.montantProposition,
                duree: e.duree,
                statut: e.statut,

                dossierId: e.dossiers?.[0].id,
                dossierMontant: e.dossiers?.[0].montant,
                dossierDuree: e.dossiers?.[0].duree,

                mensualite: e.dossiers?.[0].echeance,
                tauxNominal: e.dossiers?.[0].tauxNominal,
                tauxEffectifGlobal: e.dossiers?.[0].tauxEffectifGlobal,
                tauxParticipation: e.dossiers?.[0].tauxParticipation,
                assurances: e.dossiers?.[0].assurances,
                totalInterets: e.dossiers?.[0].totalInterets,
                coutTotal: e.dossiers?.[0].coutTotal,
                fraisDossier: e.dossiers?.[0].fraisDossier,
                expertiseImmobiliere: 0,

                // frais
                // droitsEnregistrement: response2.droitsEnregistrement,
                // conservationFonciere: response2.conservationFonciere,
                // honorairesNotaire   : response2.honorairesNotaire,
                // fraisDivers         : response2.fraisDivers,
                // totalFrais          : response2.totalFrais

                droitsEnregistrement: 1,
                conservationFonciere: 2,
                honorairesNotaire: 3,
                fraisDivers: 4,
                totalFrais: 10
            }
        })
    }

}
