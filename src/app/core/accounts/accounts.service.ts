import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserService } from "../user/user.service";
import { Observable, of, switchMap } from "rxjs";

@Injectable()
export class AccountService
{
    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient
    )
    {
    }

    checkUserTelephones(user: { firstName: string; lastName: string; email: string; cin: string; telephone: string; dateNaissance: string; agreements: any; pass1: string }): Observable<any> {
        // console.log('checkUserProd');
        // console.log(this.accessTokenGeneric)

        // const headers = new HttpHeaders({
        //     'Content-Type': 'application/json',
        //     'Authorization': 'Bearer ' + this.accessTokenGeneric
        // });

        let body = '{"cin" : "' + user.cin + '","dateNaissance" : "' + user.dateNaissance + '"}'

        return this._httpClient.post('/api/accounts/numbers', body
            // , { headers: headers }
        )
            .pipe(
                switchMap((response: any) => {
                    return of(response);
                })
            );
    }
    
}