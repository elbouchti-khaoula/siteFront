import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EMPTY, Observable, of, switchMap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SalesForceService {

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    set accessTokenSalesForce(token: string) {
        localStorage.setItem('accessTokenSalesForce', token);
    }

    get accessTokenSalesForce(): string {
        return localStorage.getItem('accessTokenSalesForce') ?? '';
    }

    /**
     * Setter & getter for expiration of access token
     */
    set expirationTokenSalesForce(expiration: number) {
        localStorage.setItem('expirationTokenSalesForce', expiration.toString());
    }

    get expirationTokenSalesForce(): number {
        return Number(localStorage.getItem('expirationTokenSalesForce')) ?? 0;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get token from salesForce
     *
     */
    private getAccessToken(): Observable<string> {
        this.accessTokenSalesForce = '';
        // console.log("+-+-+- enter access token")

        const params = new HttpParams()
            .set('grant_type', 'password')
            .set('client_id', '3MVG9Lf04EwncL7n8ZyjXMMrfyjzpugOIaE1WBvEei38N6MtbxY2y7hO5KMzoNsvatHu4n2Hdn9virh183Tf1')
            .set('client_secret', '37D411B348ACA3BDEACE8421DE15673D42DA09100B2D307C29EBC8758BEDECDA')
            .set('username', 'a.kadmiri@wafaimmobilier.co.ma.preprod')
            .set('password', 'Wafa2023');
        return this._httpClient.post('/services/oauth2/token', params)
            .pipe(
                switchMap((response: any) => {

                    // console.log("+-+-+- response token :" , response);

                    // Store the access token in the local storage
                    this.accessTokenSalesForce = response.access_token;

                    // Store the access token in the local storage
                    this.expirationTokenSalesForce = response.issued_at;

                    // Return a new observable with the response
                    return of(response.access_token.toString());
                })
            );
    }

    /**
     * Check the authentication status
     */
    private check(): Observable<boolean> {
        // console.log("+-+-+- enter check");

        // Check the access token availability
        if (this.accessTokenSalesForce == null || this.accessTokenSalesForce === '') {
            return of(false);
        }

        // Convert the expiration date
        // const dateExpitation = new Date(0);
        // dateExpitation.setUTCSeconds(this.expirationTokenSalesForce);

        // const expired = this.expirationTokenSalesForce * 1000 > Date.now();
        if (Date.now() >= this.expirationTokenSalesForce * 1000) {
            console.log("+-+-+- token salesForce expired");
            return of(false);
        }

        // If the access token exists and it didn't expire
        return of(true);
    }

    /**
     * Get token
     *
     */
    private getToken(): Observable<string> {
        console.log("+-+-+- enter getToken salesForce");

        // Check the authentication status
        return this.check()
            .pipe(
                switchMap((check) => {

                    console.log("+-+-+- getToken salesForce check", check);

                    // If the user is not authenticated...
                    if (!check) {
                        // get token from salesForce
                        return this.getAccessToken();
                    }
                    console.log("+-+-+- getToken salesForce existe in local storage", this.accessTokenSalesForce);

                    // Return token from local storage
                    return of(this.accessTokenSalesForce.toString());
                })
            );
    }

    private post(url: string, body): Observable<any> {

        // return this.getToken()
        return this.getAccessToken()
            .pipe(
                switchMap((token: string) => {
                    if (token != undefined && token != '') {

                        const headers = new HttpHeaders({
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        });

                        return this._httpClient.post(url, body,
                            { headers: headers }
                        )
                    }
                    return EMPTY;
                }));

    }

    private get(url: string): Observable<any> {

        // GET ACCESS TOKEN
        return this.getToken()
            .pipe(
                switchMap((token: string) => {
                    if (token != undefined && token != '') {

                        const headers = new HttpHeaders({
                            'Authorization': `Bearer ${token}`
                        });

                        return this._httpClient.get(url,
                            { headers: headers }
                        )
                    }
                    return EMPTY;
                }));
    }
    private patch(url: string, body): Observable<any> {

        // return this.getToken()
        return this.getAccessToken()
            .pipe(
                switchMap((token: string) => {
                    if (token != undefined && token != '') {

                        const headers = new HttpHeaders({
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        });

                        return this._httpClient.patch(url, body,
                            { headers: headers }
                        )
                    }
                    return EMPTY;
                }));

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create Web2Lead
     *
     * @param Lead
     */
    createWeb2Lead(
        projetId: number,
        nom: string,
        prenom: string,
        email: string,
        telephone: string | null,
        description: string | null,
        source: string,
        action: string,
    ): Observable<any> {
        const params = new HttpParams()
            .set('encoding', 'UTF-8')
            .set('oid', '00D3H0000008lkR')
            .set('retURL', 'https://www.wafaimmobilier.com')
            .set('debug', 1)
            .set('debugEmail', 'f.fahmi@wafaimmobilier.co.ma')
            .set('recordType', '0123H00000065ra')
            .set('lead_source', source)
            .set('00N3H000001k7fe', "PI_" + projetId)
            .set('last_name', nom)
            .set('first_name', prenom)
            .set('email', email)
            .set('mobile', telephone)
            .set('description', action + description);

        return this._httpClient.post('/servlet/servlet.WebToLead', params, { responseType: 'text' });
    }

    /**
     * Create Lead : API standard
     *
     * @param Lead
     */
    createLead(
        lead: {
            nom: string,
            prenom: string,
            email: string,
            telephone: string | null,
            // cin?: string,
            // dateNaissance?: string,
            nationaliteCode: string,
            residentMarocain: boolean,
            cspCode: string,
            montant: number
        }
    ): Observable<any> {
        const body = {
            "RecordTypeId": "0123H00000065raQAA",
            // "Salutation" : lead.titre,
            "LastName": lead.nom,
            "FirstName": lead.prenom,
            "LeadSource": "Site WAFAIMMOBILIER",
            "Status": "Nouveau",
            // "CIN__c": lead.cin,
            "MobilePhone": lead.telephone,
            "Email": lead.email,
            // "Date_de_naissance__c": lead.dateNaissance,
            "Nationalite__c": lead.nationaliteCode,
            "Resident_au_Maroc__c": lead.residentMarocain,
            "Categorie_socio_professionnelle__c": lead.cspCode,
            // "Client_d_Attijariwafa_Bank__c" : lead.estLlientAwb,
            "Montant_souhaite__c": lead.montant
            // "Motif__c" : lead.objetFin
        }

        return this.post('/services/data/v54.0/sobjects/Lead', body);
    }


    searchLead(email: string): Observable<any> {
        const searchLeadUrl = `/services/data/v54.0/query/?q=SELECT+Id+FROM+Lead+WHERE+Email=\'${email}\'`;
        return this.get(searchLeadUrl);
    }

    updateLeadStatus(leadId: string): Observable<any> {
        const updateLeadUrl = `/services/data/v54.0/sobjects/Lead/{idLead}`;
        const updateLeadBody = {
            Status: 'Qualifié'
        };
        return this.patch(updateLeadUrl.replace('{idLead}', leadId), updateLeadBody);
    }

    searchProspect(cin: string, email: string, telephone: string, nom: string, prenom: string, dateNaissance: Date): Observable<any> {
        const formattedDateNaissance = dateNaissance.toString().split("T")[0];        
        const searchProspectUrl = `/services/data/v54.0/query/?q=Select+id,(select+id+from+Opportunities+where+StageName='Simulation'+and+TECH_Simulation_transformee__c=false+and+Type='WI'+order+by+CreatedDate+DESC)+from+Account+where(PersonEmail=\'${email}\' OR PersonMobilePhone=\'${telephone}\' OR (LastName=\'${nom}\' AND FirstName=\'${prenom}\' AND PersonBirthdate=${formattedDateNaissance})) AND (personEmail!=null and PersonMobilePhone!=null and FirstName!=null and LastName!=null and PersonBirthdate!=null)`;
        console.log("--searchProspectUrl---",searchProspectUrl);

        return this.get(searchProspectUrl);
    }

    insertAccount(nom: string, prenom: string, dateNaissance: Date, nationalite: string, cin: string, residantMaroc: boolean, categorieSocioProfessionnelle: string, telephone: string, email: string, salaire: number, autresRevenus: number): Observable<any> {
        const insertAccountUrl = `/services/data/v54.0/sobjects/Account`;
        const formattedDateNaissance = dateNaissance.toString().split("T")[0];    
        const insertAccountBody = {
            OwnerId: '0053H000003XxhJQAS',
            RecordTypeId: '0123H00000065rhQAA',
            Salutation: 'MR',
            LastName: nom,
            FirstName: prenom,
            PersonBirthdate: formattedDateNaissance,
            Nationalite__c: nationalite,
            //CIN__c: cin,
            Resident_au_Maroc__c: residantMaroc,
            Categorie_socio_professionnelle__c: categorieSocioProfessionnelle,
            PersonMobilePhone: telephone,
            PersonEmail: email,
            //Client_d_Attijariwafa_Bank__c: 'TEST',
            //PersonTitle: 'TEST',
            //Conventionne__c: 'TEST',
            Salaire_revenu_Annuel__c: salaire,
            Autres_revenus__c: autresRevenus,
            //Statut__c: 'TEST',
            AccountSource: 'Site WAFA IMMOBILIER',
            TECH_Assign_Owner__c: true
        };
        console.log("----------insertAccountBody-----");
        console.log(insertAccountBody);
        return this.post(insertAccountUrl, insertAccountBody);
    }

    insertOpportunity(accountId: string, objetFinancement: string, statutProjet: string): Observable<any> {
        const insertOpportunityUrl = `/services/data/v54.0/sobjects/Opportunity`;
        const aujourdHui = new Date();
        aujourdHui.setFullYear(aujourdHui.getFullYear() + 1);
        const dateFormatee = `${aujourdHui.getFullYear()}-${('0' + (aujourdHui.getMonth() + 1)).slice(-2)}-${('0' + aujourdHui.getDate()).slice(-2)}`;

        console.log(dateFormatee);

        const insertOpportunityBody = {
            AccountId: accountId,
            RecordTypeId: '0123H00000065reQAA',
            Name: 'test',
            Amount: 100000,
            StageName: 'Simulation',
            CloseDate: dateFormatee,
            ID_ImmoNet__c: 'ID PROJET IMMONET',
            TECH_Assign_Owner__c: true,
            Motif__c: objetFinancement,
            //Statut_du_projet__c: statutProjet,
            Documents_obligatoires__c: 'String'
        };
        console.log("----------insertOpportunityBody-----");
        console.log(insertOpportunityBody);
        return this.post(insertOpportunityUrl, insertOpportunityBody);
    }

    insertSimulation(accountId: string, montant: number, mensualite: number, duree: number, tauxCredit: number, teg: number,
        prestations: number, tauxParticipation: number, typeTaux: string, nomPromoteur: string, nomEmployeur: string, objetFinancement: string, creditsEnCours: number,
        fraisDossier:number,totalInterets:number,coutTotal:number): Observable<any> {
        const insertSimulationUrl = `/services/data/v54.0/sobjects/Simulation__c`;
        const insertSimulationBody = {
            Opportunite__c: accountId,
            Montant__c: montant,
            Mensualite__c: mensualite,
            Duree__c: duree,
            //Type_de_Taux__c: typeTaux,
            Taux_du_credit__c: tauxCredit,
            TEG__c: teg,
            Prestations__c: prestations,
            Taux_participation__c: tauxParticipation,
            Frais_de_dossier__c: fraisDossier,
            //Nom_du_produit_de_credit__c: 'CODE PRODUIT',
            Total_interets__c: totalInterets,
            Cout_total_du_credit__c: coutTotal,
            Nom_de_l_employeur__c: nomEmployeur,
            Nom_du_promoteur_immobilier__c: nomPromoteur,
            Motif__c: objetFinancement,
            Total_credits_en_cours__c: creditsEnCours,
            OwnerId: '0053H000003XxhJQAS'
        };
       
        return this.post(insertSimulationUrl, insertSimulationBody);
    }

    getAffectationSimulation(idSimulation: number): Observable<any> {
        const getAffectationSimulationUrl = `/services/data/v54.0/query/?q=select+id,TECH_Code_Apporteur__c,TECH_Code_Utilisateur__c+from+Simulation__c+where+id=\'${idSimulation}\'`;
        return this.get(getAffectationSimulationUrl);
    }

    updateAffectation(codeApporteur: string = "100", codeUtilisateur: string = "WEB"): any {
        return;
    }

    affectationFunction(cin: string = '.', montant: number, duree: number,objetFinancement: string,  nomPromoteur: string, nom: string, prenom: string,
        categorieSocioProfessionnelle: string, residantMaroc: boolean, nationalite: string,dateNaissance: Date, salaire: number, autresRevenus: number, 
        creditsEnCours: number, telephone: string, email: string,nomEmployeur: string, statutProjet: string, typeTaux: string,mensualite: number, totalInterets: number,tauxParticipation: number,tauxEffectifGlobal: number,coutTotal: number,fraisDossier: number,
       ): Observable<any> {

        let prestations: number = 100000;
        let tauxCredit: number = 4.62;
        // 1-search lead
        return this.searchLead(email).pipe(
            switchMap((leadResponse: any) => {
                console.log("leadResponse",leadResponse);
                // 1-2-update lead statut
                if (leadResponse.records.length > 0) {
                    const leadId = leadResponse.records[0].Id;
                    return this.updateLeadStatus(leadId).pipe(
                        switchMap(() => this.searchProspect(cin, email, telephone, nom, prenom, dateNaissance))
                    );
                } else {
                    // 2-search prospect
                    return this.searchProspect(cin, email, telephone, nom, prenom, dateNaissance);
                }
            }),
            switchMap((prospectResponse: any) => {
                // 3-if existe on fait insert simulation
                console.log("--prospectResponse---",prospectResponse);
                if (prospectResponse.records[0]?.Opportunities?.records) {
                    const prospectId = prospectResponse.records[0].Opportunities.records[0].Id;
                    return this.insertSimulation(prospectId, montant, mensualite, duree, tauxCredit, tauxEffectifGlobal, prestations, tauxParticipation, typeTaux, nomPromoteur, nomEmployeur, objetFinancement, creditsEnCours, fraisDossier,totalInterets,coutTotal).pipe(
                        switchMap((insertSimulationResponse: any) => {
                            console.log("insertSimulationResponse",insertSimulationResponse);
                            const simulationId = insertSimulationResponse.id;
                            // 4-getAffectationSimulationUrl
                            return this.getAffectationSimulation(simulationId).pipe(
                                switchMap((affectationResponse: any) => {
                                    console.log("affectationResponse",affectationResponse);
                                    const codeApporteurSimul = affectationResponse.records[0].TECH_Code_Apporteur__c;
                                    const codeUtilisateurSimul = affectationResponse.records[0].TECH_Code_Utilisateur__c;
                                    console.log("recuperer les cpde user et apporte",codeApporteurSimul,codeUtilisateurSimul);
                                    // 5-update l'affectation avec immonet
                                    return this.updateAffectation(codeApporteurSimul, codeUtilisateurSimul);
                                })
                            );
                        })
                    );
                } else {
                    //aucun account trouvé
                     if((!prospectResponse?.records)){ 
                        // 2-1-insertAccount
                        return this.insertAccount(nom, prenom, dateNaissance, nationalite, cin, residantMaroc, categorieSocioProfessionnelle, telephone, email, salaire, autresRevenus).pipe(
                            switchMap((insertAccountResponse: any) => {
                                console.log("insertAccountResponse",insertAccountResponse);
                                if (insertAccountResponse.records.length > 0) {
                                    const accountId = insertAccountResponse.records[0].Id;
                                    // 2-1-insertopportunity
                                    return this.insertOpportunity(accountId, objetFinancement, statutProjet).pipe(
                                        switchMap((insertOpportunityResponse: any) => {
                                            console.log("insertOpportunityResponse",insertOpportunityResponse);
                                            // 3-insert simulation
                                            const opportunityId = insertOpportunityResponse.id;
                                            return this.insertSimulation(opportunityId, montant, mensualite, duree, tauxCredit, tauxEffectifGlobal, prestations, tauxParticipation, typeTaux, nomPromoteur, nomEmployeur, objetFinancement, creditsEnCours, fraisDossier,totalInterets,coutTotal).pipe(
                                                switchMap((insertSimulationResponse: any) => {
                                                    console.log("insertSimulationResponse",insertSimulationResponse);
                                                    const simulationId = insertSimulationResponse.id;
                                                    // 4-getAffectationSimulationUrl
                                                    return this.getAffectationSimulation(simulationId).pipe(
                                                        switchMap((affectationResponse: any) => {
                                                            console.log("affectationResponse",affectationResponse);
                                                            const codeApporteurSimul = affectationResponse.records[0].TECH_Code_Apporteur__c;
                                                            const codeUtilisateurSimul = affectationResponse.records[0].TECH_Code_Utilisateur__c;
                                                            console.log("recuperer les cpde user et apporte",codeApporteurSimul,codeUtilisateurSimul);
                                                            // 5-update l'affectation avec immonet
                                                            return this.updateAffectation(codeApporteurSimul, codeUtilisateurSimul);
                                                        })
                                                    );
                                                })
                                            );
                                        })
                                    );
                                }
                            })
                        );
                    }else{
                        //l account existe mais y a pas d opportunité
                            const accountId = prospectResponse.records[0].Id;
                            // 2-1-insertopportunity
                            return this.insertOpportunity(accountId, objetFinancement, statutProjet).pipe(
                                switchMap((insertOpportunityResponse: any) => {
                                    console.log("insertOpportunityResponse",insertOpportunityResponse);
                                    // 3-insert simulation
                                    const opportunityId = insertOpportunityResponse.id;
                                    return this.insertSimulation(opportunityId, montant, mensualite, duree, tauxCredit, tauxEffectifGlobal, prestations, tauxParticipation, typeTaux, nomPromoteur, nomEmployeur, objetFinancement, creditsEnCours, fraisDossier,totalInterets,coutTotal).pipe(
                                        switchMap((insertSimulationResponse: any) => {
                                            console.log("insertSimulationResponse",insertSimulationResponse);
                                            const simulationId = insertSimulationResponse.id;
                                            // 4-getAffectationSimulationUrl
                                            return this.getAffectationSimulation(simulationId).pipe(
                                                switchMap((affectationResponse: any) => {
                                                    console.log("affectationResponse",affectationResponse);
                                                    const codeApporteurSimul = affectationResponse.records[0].TECH_Code_Apporteur__c;
                                                    const codeUtilisateurSimul = affectationResponse.records[0].TECH_Code_Utilisateur__c;
                                                    console.log("recuperer les cpde user et apporte",codeApporteurSimul,codeUtilisateurSimul);
                                                    // 5-update l'affectation avec immonet
                                                    return this.updateAffectation(codeApporteurSimul, codeUtilisateurSimul);
                                                })
                                            );
                                        })
                                    );
                                })
                            );
                        }
                    
                }
            })

        );
    }


}
