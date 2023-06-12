import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, switchMap } from "rxjs";

@Injectable()
export class SmsService
{
    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient
    )
    {
    }

    sendSms(code: String, numero: String): Observable<any>
    {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });

        let body = {
            "name" : "generateToken",
            "param" : {
                "username" : "cherraj",
                "pass" : "cherraj55sms"
            } 
        }

        return this._httpClient.post('/apimsg/v2/', body, { headers: headers })
            .pipe(
                switchMap((response: any) => {

                    const headers = new HttpHeaders({
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + response.response.result.token
                    });
            
                    let body = {
                        "name": "SendSMS",
                        "param": {
                            "username": "cherraj",
                            "password": "cherraj55sms",
                            "ndest": "212"+numero.substring(1, numero.length),
                            "message": "Votre code d\'activation est : "+code,
                            "msgtype": "1",
                            "label": "Wafa immo",
                            "smsid": "1"
                        }
                    }
                    return this._httpClient.post('/apimsg/v2/', body, { headers: headers })
                        .pipe(
                            switchMap((response: any) => {
                                
                                return of(response);
                            })
                        );
                   
                })
            );
    }
    
}