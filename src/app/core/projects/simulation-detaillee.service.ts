import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, EMPTY, map, Observable, switchMap, tap } from 'rxjs';
import { CritereDetaillee, Project, SimulationDetaillee } from './simulation-detaillee.types';
import { ProjectAuthService } from 'app/core/projects/projects-auth.service';
import { CategorieSocioProfessionnelle, Nationalite, ObjetFinancement } from '../referentiel/referentiel.types';
import { FuseUtilsService } from '@fuse/services/utils';

@Injectable({
    providedIn: 'root'
})
export class SimulationDetailleeService {

    // Private
    private _simulations: BehaviorSubject<SimulationDetaillee[] | null> = new BehaviorSubject(null);
    private _simulation: BehaviorSubject<SimulationDetaillee | null> = new BehaviorSubject(null);
    private _critereSimulation: BehaviorSubject<CritereDetaillee | null> = new BehaviorSubject(null);
    private _documents: BehaviorSubject<any | null> = new BehaviorSubject(null);
    private _simulationResultat: BehaviorSubject<any | null> = new BehaviorSubject(null);

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _projectAuthService: ProjectAuthService,
        private _fuseUtilsService: FuseUtilsService
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for simulations
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
     * Getter for simulation resultat
     */
    get simulationResultat$(): Observable<any> {
        return this._simulationResultat.asObservable();
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
    getInfoTiers(simulation: any): Observable<any> {

        return this._projectAuthService.getToken()
            .pipe(
                switchMap((token: string) => {

                    if (token != undefined && token != '') {

                        const headers = new HttpHeaders({
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        });

                        return this._httpClient.get(`api/projects/${simulation.id}/infos-client`, { headers: headers })
                            .pipe(
                                map((response: CritereDetaillee[]) => {

                                    let nationalites: Nationalite[] = JSON.parse(localStorage.getItem('nationalites'));
                                    let categories: CategorieSocioProfessionnelle[] = JSON.parse(localStorage.getItem('categoriesSocioProfessionnelle'));
                                    let objetsFinancement: ObjetFinancement[] = JSON.parse(localStorage.getItem('objetsFinancement'));

                                    var simulationResult = {
                                        ...response[0].tiers,
                                        // Mon profil
                                        // nom: response[0].tiers.nom,
                                        // prenom: response[0].tiers.prenom,
                                        // telephone: response[0].tiers.telephone,
                                        // email: response[0].tiers.email,
                                        // dateNaissance: response[0].tiers.dateNaissance,
                                        nationalite: nationalites?.length > 0 ? nationalites.find(e => e.code === response[0].tiers.nationalite)?.libelle : "",
                                        residantMaroc: response[0].tiers.residantMaroc ? "Oui" : "Non",
                                        // ma situation
                                        categorieSocioProfessionnelle: categories?.length > 0 ? categories.find(e => e.code === response[0].tiers.categorieSocioProfessionnelle)?.libelle : "",
                                        // nomEmployeur: response[0].tiers.nomEmployeur,
                                        // anciennete: this.simulationStepperForm.get('step2').get('anciennete').value,
                                        salaire: this._fuseUtilsService.numberFormat(response[0].tiers.salaireEtAutresRevenus, 2, '.', ' '),
                                        // autresRevenus: this.simulationStepperForm.get('step2').get('autresRevenus').value,
                                        creditsEnCours: this._fuseUtilsService.numberFormat(response[0].tiers.creditsEnCours, 2, '.', ' '),
                                        // Mon projet
                                        objetFinancement: objetsFinancement?.length > 0 ? objetsFinancement.find(e => e.code === response[0].objetFinancement)?.libelle : "",
                                        nomPromoteur: response[0].nomPromoteur,
                                        // statutProjet: this.simulationStepperForm.get('step3').get('statutProjet').value,
                                        typeTaux: response[0].typeTaux === "FIXE" ? "Valeur Fixe" : "Valeur variable",
                                        newSimulation: false,
                                        ...simulation
                                    };

                                    this._simulationResultat.next(simulationResult);
                                    return simulationResult;
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
                            params: { email: emailP }
                        };

                        return this._httpClient.get('api/projects/search', httpOptions)
                            .pipe(
                                map((response: Project[]) => {

                                    let list1 = response.filter(e => e.dossiers.length > 1);
                                    let list2 = response.filter(e => e.dossiers.length === 1);
                                    let list3 = [];
                                    list3.push(list1[0]);
                                    list3.push(list1[1]);
                                    list3.push(list2[0]);
                                    list3.push(list2[1]);
                                    list3.push(list2[2]);
                                    
                                    let result = this.convertToSimulations(list3);
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
