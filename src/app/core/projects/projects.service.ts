import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, EMPTY, map, Observable, switchMap, tap } from 'rxjs';
import { CritereDetaillee, Project, SimulationDetaillee } from './projects.types';
import { CategorieSocioProfessionnelle, Nationalite, ObjetFinancement } from '../referentiel/referentiel.types';
import { FuseUtilsService } from '@fuse/services/utils';
import { EmployeurConventionne, PromoteurConventionne } from './projects.types';
import { AuthenticationService } from '../auth/authentication.service';

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
    private _employeurs: BehaviorSubject<EmployeurConventionne[] | null> = new BehaviorSubject(null);
    private _promoteurs: BehaviorSubject<PromoteurConventionne[] | null> = new BehaviorSubject(null);

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _authenticationService: AuthenticationService,
        private _fuseUtilsService: FuseUtilsService
    ) {
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

    /**
     * Getter for employeurs
     */
    get employeurs$(): Observable<EmployeurConventionne[]> {
        return this._employeurs.asObservable();
    }

    /**
     * Getter for promoteurs
     */
    get promoteurs$(): Observable<PromoteurConventionne[]> {
        return this._promoteurs.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * count mes simulations
     *
     * @param email
     * @param cin
     */
    getCountSimulation(email: string, cin: string): Observable<number> {

        return this._httpClient.post<number>('api/projects/search/count', { cin: cin, email: email })
            .pipe(
                map((response: number) => {
                    return response;
                })
            );
    }

    /**
     * Simulation détaillée with given query
     *
     * @param critere
     */
    simuler(critere: CritereDetaillee): Observable<SimulationDetaillee> {

        return this._httpClient.post('api/projects/simulation', critere)
            .pipe(
                map((response: Project[]) => {

                    let result = this.convertToSimulation(response[0]);
                    this._simulation.next(result);
                    return result;
                })
            );
    }

    /**
     * Abandonner une simulation
     *
     * @param projectId
     */
    abandonner(projectId: number): Observable<any> {

        return this._httpClient.patch(`api/projects/${projectId}`, { codeStatut: "PABA" })
            .pipe(
                map((updatedProject: any) => {

                    // Return the updated project
                    return updatedProject;
                })
            );
    }

    /**
     * récupérer une simulation
     *
     * @param projectId
     */
    getProjectById(projectId: number): Observable<SimulationDetaillee> {

        return this._httpClient.get(`api/projects/${projectId}`)
            .pipe(
                map((response: Project[]) => {

                    let convert = this.convertToSimulation(response[0]);
                    this._simulation.next(convert);
                    return convert;

                })
            );
    }

    /**
     * récupérer information du tiers d'une simulation
     *
     * @param simulation
     */
    getInfoTiers(simulation: any): Observable<any> {
        
        return this._httpClient.get(`api/projects/${simulation.id}/infos-client`)
            .pipe(
                map((response: CritereDetaillee[]) => {

                    let nationalites: Nationalite[] = JSON.parse(localStorage.getItem('nationalites'));
                    let categories: CategorieSocioProfessionnelle[] = JSON.parse(localStorage.getItem('categoriesSocioProfessionnelle'));
                    let objetsFinancement: ObjetFinancement[] = JSON.parse(localStorage.getItem('objetsFinancement'));

                    var simulationResult = {
                        ...response[0].tiers,
                        codeApporteur: response[0].codeApporteur,
                        codeUtilisateur: response[0].codeUtilisateur,
                        // Mon profil
                        nationalite: nationalites?.length > 0 ? nationalites.find(e => e.code === response[0].tiers.nationalite)?.libelle : "",
                        residantMaroc: response[0].tiers.residantMaroc ? "Oui" : "Non",
                        // ma situation
                        categorieSocioProfessionnelle: categories?.length > 0 ? categories.find(e => e.code === response[0].tiers.categorieSocioProfessionnelle)?.libelle : "",
                        // anciennete: this.simulationStepperForm.get('step2').get('anciennete').value,
                        salaire: this._fuseUtilsService.numberFormat(response[0].tiers.salaireEtAutresRevenus, 2, '.', ' '),
                        creditsEnCours: this._fuseUtilsService.numberFormat(response[0].tiers.creditsEnCours, 2, '.', ' '),
                        // Mon projet
                        objetFinancement: objetsFinancement?.length > 0 ? objetsFinancement.find(e => e.code === response[0].objetFinancement)?.libelle : "",
                        nomPromoteur: response[0].nomPromoteur,
                        typeTaux: response[0].typeTaux === "FIXE" ? "Valeur Fixe" : "Valeur variable",
                        newSimulation: false,
                        ...simulation
                    };

                    this._simulationResultat.next(simulationResult);
                    return simulationResult;
                })
            );
    }

    /**
     * récupérer une simulation
     *
     * @param emailP
     */
    search(emailP: string): Observable<SimulationDetaillee[]> {

        return this._httpClient.post('api/projects/search', { email: emailP, rowNum: 6 })
            .pipe(
                map((response: Project[]) => {

                    if (response && response.length > 0) {
                        let result = this.convertToSimulations(response);
                        this._simulations.next(result);
                        return result;
                    }
                    else {
                        return null;
                    }

                })
            );
    }

    /**
     * get documents checkList pour demande de crédit
     *
     * @param simulationId
     */
    getDocuments(simulationId: number): Observable<any> {

        return this._httpClient.get<any>(`api/projects/${simulationId}/documents`)
            .pipe(
                tap((response) => {
                    this._documents.next(response);
                })
            );
    }

    /**
     * transformer une simulation en demande de crédit
     *
     * @param projectId
     */
    transformer(projectId: number): Observable<any> {

        return this._httpClient.patch(`api/projects/${projectId}`, { codeStatut: "DINS" })
            .pipe(
                map((updatedProject: any) => {

                    // Return the updated project
                    return updatedProject;
                })
            );
    }

    /**
     * transformer une simulation en demande de crédit
     *
     * @param projectId
     * @param codeAgence
     */
    changerAgence(projectId: number, codeAgence: string, dagAgence: string): Observable<any> {

        return this._httpClient.patch(`api/projects/${projectId}/affectation`, { codeApporteur: codeAgence, codeUtilisateur: dagAgence })
            .pipe(
                map((updatedProject: any) => {

                    // Return the updated project
                    return updatedProject;
                })
            );
    }

    /**
     * Get employeurs 
     */
    getEmployeursConventionnes(): Observable<EmployeurConventionne[]> {

        return this._httpClient.post<EmployeurConventionne[]>(
            'api/projects/referentiel',
            { referentiel: "employeursConventionnes" })
            .pipe(
                tap((response: EmployeurConventionne[]) => {
                    
                    response.sort((a, b) => a.libelle.localeCompare(b.libelle));

                    this._employeurs.next(response);

                    // console.log("+-+-+- EmployeurConventionne[]", response);

                    return response;
                })
            );
    }

    /**
     * Get promoteurs
     */
    getPromoteursConventionnes(): Observable<PromoteurConventionne[]> {

        return this._httpClient.post<PromoteurConventionne[]>(
            'api/projects/referentiel',
            { referentiel: "promoteursConventionnes" })
            .pipe(
                tap((response: PromoteurConventionne[]) => {

                    response.sort((a, b) => a.libelle.localeCompare(b.libelle));

                    this._promoteurs.next(response);

                    return response;
                })
            );
    }

    // -----------------------------------------------------------------------------------------------------
    // @ utils methods
    // -----------------------------------------------------------------------------------------------------
    convertSimulationToString(simulation: SimulationDetaillee): any {

        let dossiersStr = simulation.dossiers.map(
            doss => {

                let estExpImmoNum: boolean;
                let expertiseImmobiliereStr = "";

                if (doss.expertiseImmobiliere && doss.expertiseImmobiliere > 0) {
                    expertiseImmobiliereStr = this._fuseUtilsService.numberFormat(doss.expertiseImmobiliere, 2, '.', ' ');
                    estExpImmoNum = true;
                } else {
                    expertiseImmobiliereStr = "GRATUIT";
                    estExpImmoNum = false;
                }
                let estFraisDossNum: boolean;
                let fraisDossierStr = "";
                if (doss.fraisDossier && doss.fraisDossier > 0) {
                    fraisDossierStr = this._fuseUtilsService.numberFormat(doss.fraisDossier, 2, '.', ' ');
                    estFraisDossNum = true;
                } else {
                    fraisDossierStr = "GRATUIT";
                    estFraisDossNum = false;
                }

                return {
                    ...doss,
                    mensualite: this._fuseUtilsService.numberFormat(doss.echeance, 2, '.', ' '),
                    montant: this._fuseUtilsService.numberFormat(doss.montant, 2, '.', ' '),
                    totalInterets: this._fuseUtilsService.numberFormat(doss.totalInterets, 2, '.', ' '),
                    assurances: this._fuseUtilsService.numberFormat(doss.assurances, 2, '.', ' '),
                    tauxParticipation: this._fuseUtilsService.numberFormat(doss.tauxParticipation, 3, '.', ' '),
                    tauxEffectifGlobal: this._fuseUtilsService.numberFormat(doss.tauxEffectifGlobal, 3, '.', ' '),
                    coutTotal: this._fuseUtilsService.numberFormat(doss.coutTotal, 2, '.', ' '),
                    expertiseImmobiliere: expertiseImmobiliereStr,
                    estExpImmoNum: estExpImmoNum,
                    fraisDossier: fraisDossierStr,
                    estFraisDossNum: estFraisDossNum,
                    nbreAnnee: Math.trunc(doss.duree / 12),
                    nbreMois: doss.duree % 12
                }
            }
        );

        const echeanceGlobal = simulation.dossiers
            .map(item => item.echeance)
            .reduce((prev, curr) => prev + curr, 0);

        let simulationResultat = {
            ...simulation,
            dossiers: dossiersStr,
            mensualite: this._fuseUtilsService.numberFormat(echeanceGlobal, 2, '.', ' '),
            montant: this._fuseUtilsService.numberFormat(simulation.montant, 2, '.', ' '),
            montantProposition: this._fuseUtilsService.numberFormat(simulation.montantProposition, 2, '.', ' '),
            tauxEffectifGlobal: this._fuseUtilsService.numberFormat(simulation.tauxEffectifGlobalPondere, 3, '.', ' '),
            totalFrais: this._fuseUtilsService.numberFormat(simulation.totalFrais, 2, '.', ' '),
            droitsEnregistrement: this._fuseUtilsService.numberFormat(simulation.droitsEnregistrement, 2, '.', ' '),
            conservationFonciere: this._fuseUtilsService.numberFormat(simulation.conservationFonciere, 2, '.', ' '),
            fraisDivers: this._fuseUtilsService.numberFormat(simulation.fraisDivers, 2, '.', ' '),
            honorairesNotaire: this._fuseUtilsService.numberFormat(simulation.honorairesNotaire, 2, '.', ' '),
        }

        return simulationResultat;
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
