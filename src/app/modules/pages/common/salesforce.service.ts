import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

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

        return this._httpClient.post('/servlet/servlet.WebToLead', params, {responseType: 'text'});
    }

}
