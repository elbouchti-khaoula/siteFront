import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, EMPTY, map, Observable, switchMap, tap } from 'rxjs';
import { CritereDetaillee, Project, SimulationDetaillee } from './simulation-detaillee.types';
import { ProjectAuthService } from 'app/core/projects-auth/projects-auth.service';

@Injectable({
    providedIn: 'root'
})
export class SimulationDetailleeService {

    // Private
    private _simulations: BehaviorSubject<SimulationDetaillee[] | null> = new BehaviorSubject(null);
    private _simulation: BehaviorSubject<SimulationDetaillee | null> = new BehaviorSubject(null);
    private _critereSimulation: BehaviorSubject<CritereDetaillee | null> = new BehaviorSubject(null);
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
     * Getter for simulation
     */
    get simulations$(): Observable<SimulationDetaillee[]> {
        return this._simulations.asObservable();
    }

    /**
     * Getter for simulation
     */
    get simulation$(): Observable<SimulationDetaillee> {
        return this._simulation.asObservable();
    }

    /**
     * Getter for critere simulation
     */
    get critereSimulation$(): Observable<CritereDetaillee> {
        return this._critereSimulation.asObservable();
    }

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
     * @param critere
     */
    simuler(critere: CritereDetaillee): Observable<SimulationDetaillee> {

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
                                map((response: Project[]) => {

                                    let result = this.convertToSimulation(response[0]);
                                    this._simulation.next(result);
                                    return result;
                                })
                            );
                    }
                    return EMPTY;
                }));
    }

    /**
     * Abandonner une simulation
     *
     * @param projectId
     */
    abandonner(projectId: number): Observable<any> {

        return this._projectAuthService.getToken()
            .pipe(
                switchMap((token: string) => {

                    if (token != undefined && token != '') {

                        const headers = new HttpHeaders({
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        });

                        return this._httpClient.patch(`api/projects/${projectId}`, { codeStatut: "PABA" }, { headers: headers })
                            .pipe(
                                map((updatedProject: any) => {

                                    // Return the updated project
                                    return updatedProject;
                                })
                            );
                    }
                    return EMPTY;
                }));
    }

    /**
     * récupérer une simulation
     *
     * @param projectId
     */
    getProjectById(projectId: number): Observable<SimulationDetaillee> {

        return this._projectAuthService.getToken()
            .pipe(
                switchMap((token: string) => {

                    if (token != undefined && token != '') {

                        const headers = new HttpHeaders({
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        });

                        return this._httpClient.get(`api/projects/${projectId}`, { headers: headers })
                            .pipe(
                                map((response: Project[]) => {

                                    let convert = this.convertToSimulation(response[0]);
                                    this._simulation.next(convert);
                                    return convert;

                                })
                            );
                    }
                    return EMPTY;
                }));
    }

    /**
     * récupérer information du tiers d'une simulation
     *
     * @param projectId
     */
    getInfoClient(projectId: number): Observable<CritereDetaillee> {

        return this._projectAuthService.getToken()
            .pipe(
                switchMap((token: string) => {

                    if (token != undefined && token != '') {

                        const headers = new HttpHeaders({
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        });

                        return this._httpClient.get(`api/projects/${projectId}/infos-client`, { headers: headers })
                            .pipe(
                                map((response: CritereDetaillee[]) => {

                                    this._critereSimulation.next(response[0]);
                                    return response[0];
                                })
                            );
                    }
                    return EMPTY;
                }));
    }

    /**
     * récupérer une simulation
     *
     * @param emailP
     */
    search(emailP: string): Observable<SimulationDetaillee[]> {

        return this._projectAuthService.getToken()
            .pipe(
                switchMap((token: string) => {

                    if (token != undefined && token != '') {

                        const headers = new HttpHeaders({
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        });

                        const httpOptions = {
                            headers: headers,
                            params: { email: emailP}
                        };

                        return this._httpClient.get('api/projects/search', httpOptions)
                            .pipe(
                                map((response: Project[]) => {

                                    let result = this.convertToSimulations(response);
                                    this._simulations.next(result);
                                    return result;

                                })
                            );
                    }
                    return EMPTY;
                }));
    }

    /**
     * get documents joint pour demande de crédit
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

    /**
     * transformer une simulation en demande de crédit
     *
     * @param projectId
     */
    transformer(projectId: number): Observable<any> {

        return this._projectAuthService.getToken()
            .pipe(
                switchMap((token: string) => {

                    if (token != undefined && token != '') {

                        const headers = new HttpHeaders({
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        });

                        return this._httpClient.patch(`api/projects/${projectId}`, { codeStatut: "DINS" }, { headers: headers })
                            .pipe(
                                map((updatedProject: any) => {

                                    // Return the updated project
                                    return updatedProject;
                                })
                            );
                    }
                    return EMPTY;
                }));
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------
    private convertToSimulation(response: Project): SimulationDetaillee {
        return {
            id: response.id,
            montant: response.montant,
            montantProposition: response.montantProposition,
            duree: response.duree,
            statut: response.statut,
            tauxNominalPondere: response.tauxNominalPondere,
            tauxEffectifGlobalPondere: response.tauxEffectifGlobalPondere,
            tauxAssurancePondere: response.tauxAssurancePondere,
            tauxInteretsClientTtc: response.tauxInteretsClientTtc,
            dossiers: response.dossiers,
            // frais
            droitsEnregistrement: response.fraisAnnexes.enregistrementHypothecaire,
            conservationFonciere: response.fraisAnnexes.conservationFonciere,
            honorairesNotaire: response.fraisAnnexes.honorairesNotaire,
            fraisDivers: response.fraisAnnexes.fraisDossier,
            totalFrais: response.fraisAnnexes.coutTotal
        }
    }

    private convertToSimulations(response: Project[]): SimulationDetaillee[] {
        return response.map(element => {
            return {
                id: element.id,
                montant: element.montant,
                montantProposition: element.montantProposition,
                duree: element.duree,
                statut: element.statut,
                tauxNominalPondere: element.tauxNominalPondere,
                tauxEffectifGlobalPondere: element.tauxEffectifGlobalPondere,
                tauxAssurancePondere: element.tauxAssurancePondere,
                tauxInteretsClientTtc: element.tauxInteretsClientTtc,
                dossiers: element.dossiers,
                // frais
                droitsEnregistrement: element.fraisAnnexes.enregistrementHypothecaire,
                conservationFonciere: element.fraisAnnexes.conservationFonciere,
                honorairesNotaire: element.fraisAnnexes.honorairesNotaire,
                fraisDivers: element.fraisAnnexes.fraisDossier,
                totalFrais: element.fraisAnnexes.coutTotal
            }
        })
    }

}
