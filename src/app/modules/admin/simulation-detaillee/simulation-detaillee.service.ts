import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, EMPTY, map, Observable, switchMap } from 'rxjs';
import { CritereDetaillee, SimulationDetaillee } from './simulation-detaillee.types';
import { ProjectAuthService } from 'app/core/projects-auth/projects-auth.service';

@Injectable({
    providedIn: 'root'
})
export class SimulationDetailleeService {

    // Private
    private _simulation: BehaviorSubject<SimulationDetaillee[] | null> = new BehaviorSubject(null);

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _projectAuthService: ProjectAuthService,
    ) {
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
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Simulation détaillée with given query
     *
     * @param queryParams
     */
    simuler(critere: CritereDetaillee): Observable<SimulationDetaillee[]> {

        return this._projectAuthService.getToken()
            .pipe(
                switchMap((token: string) => {

                    if (token != undefined && token != '') {

                        const headers = new HttpHeaders({
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        });

                        return this._httpClient.post('api/projects/simulation', critere, { headers: headers })
                            .pipe(
                                switchMap((response1: any[]) => {

                                    const params = new HttpParams()
                                        .set('montant', critere.montantProposition);

                                    return this._httpClient.get('api/repositories/frais-annexes', {params: params})
                                        .pipe(
                                            map((response2 : any) => {

                                                let convert = this.convertToSimulation(response1, response2);

                                                this._simulation.next(convert);

                                                return convert;

                                            })
                                        );
                                })
                            );
                    }
                    return EMPTY;
                }));
    }

    convertToSimulation(response1: any[], response2: any): SimulationDetaillee[] {
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
                droitsEnregistrement: response2.droitsEnregistrement,
                conservationFonciere: response2.conservationFonciere,
                honorairesNotaire   : response2.honorairesNotaire,
                fraisDivers         : response2.fraisDivers,
                totalFrais          : response2.total
            }
        })
    }

}
