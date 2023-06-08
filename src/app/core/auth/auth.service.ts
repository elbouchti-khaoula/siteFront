import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { UserService } from 'app/core/user/user.service';
import { User } from '../user/user.types';

@Injectable()
export class AuthService
{
    private _authenticated: boolean = false;

    private userCreated: string;
    public userMailVerified: boolean;

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _userService: UserService
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */

    // Admin token

    set accessTokenAdmin(token: string)
    {
        localStorage.setItem('accessTokenAdmin', token);
    }

    get accessTokenAdmin(): string
    {
        return localStorage.getItem('accessTokenAdmin') ?? '';
    }

    // Generic token

    set accessTokenGeneric(token: string)
    {
        localStorage.setItem('accessTokenGeneric', token);
    }

    get accessTokenGeneric(): string
    {
        return localStorage.getItem('accessTokenGeneric') ?? '';
    }

    // User token

    set accessTokenUser(token: string)
    {
        localStorage.setItem('accessTokenUser', token);
    }

    get accessTokenUser(): string
    {
        return localStorage.getItem('accessTokenUser') ?? '';
    }

    get getAuthenticated(): boolean
    {
        return this._authenticated;
    }

    set setAuthenticated(value: boolean)
    {
        this._authenticated = value;
    }

    //

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Forgot password
     *
     * @param email
     */
    forgotPassword(email: string): Observable<any>
    {
        return this._httpClient.post('api/auth/forgot-password', email);
    }

    /**
     * Reset password
     *
     * @param password
     */
    resetPassword(password: string): Observable<any>
    {
        return this._httpClient.post('api/auth/reset-password', password);
    }

    /**
     * Sign in
     *
     * @param credentials
     */
    signIn(credentials: { email: string; password: string }): Observable<any>
    {
        console.log('signIn')

        // Throw error, if the user is already logged in
        if ( this._authenticated )
        {
            return throwError('User is already logged in.');
        }
        
        const headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        let body = 'grant_type=password&username=' + credentials.email + '&password=' + credentials.password + '&client_id=front-end&client_secret=89b79687-a793-41fc-9ad6-08edec13007f'

        return this._httpClient.post('/auth/realms/wafaimmo-siteweb/protocol/openid-connect/token', body, { headers: headers })
            .pipe(
                switchMap((response: any) => {

                    const headers = new HttpHeaders({
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + this.accessTokenAdmin
                    });

                    console.log(this.accessTokenAdmin)

                    return this._httpClient.get('auth/admin/realms/wafaimmo-siteweb/users?username='+credentials.email, { headers: headers })
                        .pipe(
                            switchMap((response2: any) => {

                                // Store the access token in the local storage
                                localStorage.setItem('accessTokenUser', response.access_token);

                                this.userMailVerified = response2[0].emailVerified;
                                
                                // Return a new observable with the response
                                return of(response);
                            })
                        );
       

                })
            );
    }

    /**
     * Sign in using the access token
     */
    signInUsingToken(): Observable<any>
    {
        // Renew token
        return this._httpClient.post('api/auth/refresh-access-token', {
            accessToken: this.accessTokenUser
        }).pipe(
            catchError(() =>

                // Return false
                of(false)
            ),
            switchMap((response: any) => {

                // Store the access token in the local storage
                this.accessTokenUser = response.accessToken;

                // Set the authenticated flag to true
                this._authenticated = true;

                // Store the user on the user service
                this._userService.user = response.user;

                // Return true
                return of(true);
            })
        );
    }

    /**
     * Sign out
     */
    signOut(): Observable<any>
    {
        // Remove the access token from the local storage
        localStorage.removeItem('accessTokenUser');

        // Set the authenticated flag to false
        this._authenticated = false;

        // Return the observable
        return of(true);
    }

    /**
     * Sign up
     *
     * @param user
     */
    signUp(user: { firstName: string; lastName: string; cin: string, dateNaissance: string, email: string; telephone: string; agreements: any; pass1: string }): Observable<any>
    {

            const headers = new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.accessTokenAdmin
            });

            let body = {
                "firstName": user.firstName,
                "lastName": user.lastName,
                "email": user.email,
                "enabled": "true",
                "username": user.email,
                "credentials": [
                    {
                        "type": "password",
                        "value": user.pass1,
                        "temporary": false
                    }
                ],
                "attributes": {
                    "cin": [user.cin],
                    "telephone":[user.telephone],
                    "dateNaissance":[user.dateNaissance]
                }
            }

            return this._httpClient.post('/auth/admin/realms/wafaimmo-siteweb/users', body, { headers: headers })
                .pipe(
                    switchMap((response: any) => {

                        return this._httpClient.get('auth/admin/realms/wafaimmo-siteweb/users?username='+user.email, { headers: headers })
                        .pipe(
                            switchMap((response: any) => {
                                this.userCreated = response[0].id
                                return of(response);
                            })
                    );
                    })
            );
    }

    sendMail(): Observable<any>
    {
        console.log('send mail for user id : '+this.userCreated);
        console.log(this.accessTokenAdmin);

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.accessTokenAdmin
        });

        let idCli = this.userCreated;

        return this._httpClient.put('/auth/admin/realms/wafaimmo-siteweb/users/'+idCli+'/send-verify-email', { headers: headers })
            .pipe(
                switchMap((response: any) => {

                    return of(response);
                })
            );
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

    deleteUser() : Observable<any>
    {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.accessTokenAdmin
        });

        let idCli = this.userCreated;

        return this._httpClient.delete('/auth/admin/realms/wafaimmo-siteweb/users/'+idCli, { headers: headers })
            .pipe(
                switchMap((response: any) => {

                    return of(response);
                })
            );
    }

    /**
     * Unlock session
     *
     * @param credentials
     */
    unlockSession(credentials: { email: string; password: string }): Observable<any>
    {
        return this._httpClient.post('api/auth/unlock-session', credentials);
    }

    /**
     * Check the authentication status
     */
    check(): Observable<boolean>
    {
        // Check if the user is logged in
        if ( this._authenticated )
        {
            return of(true);
        }

        // Check the access token availability
        if ( !this.accessTokenUser )
        {
            return of(false);
        }

        // Check the access token expire date
        if ( AuthUtils.isTokenExpired(this.accessTokenUser) )
        {
            return of(false);
        }

        // If the access token exists and it didn't expire, sign in using it
        return this.signInUsingToken();
    }

    // check

    checkUserProd(user: { firstName: string; lastName: string; email: string; cin: string; telephone: string; dateNaissance: string; agreements: any; pass1: string }): Observable<any>
    {
        console.log('checkUserProd');
        console.log(this.accessTokenGeneric)

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.accessTokenGeneric
        });

        let body = '{"cin" : "'+user.cin+'","dateNaissance" : "'+user.dateNaissance+'"}'

        return this._httpClient.post('/api/accounts/numbers', body, { headers: headers })
            .pipe(
                switchMap((response: any) => {
                    return of(response);
                })
            );
    }
}
