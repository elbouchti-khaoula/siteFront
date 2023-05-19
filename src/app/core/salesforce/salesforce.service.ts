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
        if (this.accessTokenSalesForce === undefined || this.accessTokenSalesForce === null || this.accessTokenSalesForce === '') {
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
                switchMap(response => {
                    // ADD TOKEN TO HEADER
                    const headers = new HttpHeaders()
                        .set('Authorization', 'Bearer ' + response);
                    // CALL GET API
                    return this._httpClient.get(url, { headers: headers }
                    );
                })
            );
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

}
