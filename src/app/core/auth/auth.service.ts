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
    set accessToken(token: string)
    {
        localStorage.setItem('accessToken', token);
    }

    get accessToken(): string
    {
        return localStorage.getItem('accessToken') ?? '';
    }

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
        // Throw error, if the user is already logged in
        if ( this._authenticated )
        {
            return throwError('User is already logged in.');
        }

        const headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        let body = 'grant_type=password&username='+credentials.email+'&password='+credentials.password+'&client_id=front-end&client_secret=89b79687-a793-41fc-9ad6-08edec13007f'
          
        return this._httpClient.post('/auth/realms/wafaimmo-siteweb/protocol/openid-connect/token', body, {headers:headers})
        .pipe(
            switchMap((response: any) => {

                // Store the access token in the local storage
                this.accessToken = response.access_token;

                // Set the authenticated flag to true
                this._authenticated = true;

                // Store the user on the user service
                const userLog: User = { 
                    email : credentials.email,
                    id : '1test23',
                    name : 'test'
                } 
                this._userService.user = userLog;

                // Return a new observable with the response
                return of(response);
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
            accessToken: this.accessToken
        }).pipe(
            catchError(() =>

                // Return false
                of(false)
            ),
            switchMap((response: any) => {

                // Store the access token in the local storage
                this.accessToken = response.accessToken;

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
        localStorage.removeItem('accessToken');

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
    signUp(user: { name: string; prenom: string; email: string; CIN: string; telephone: string; datenaissance: string; agreements: any; pass1: string}): Observable<any>
    {
        const headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        let body = 'grant_type=client_credentials&client_id=admin-cli&client_secret=0b4a269a-7076-4c4b-8729-4b6d0e7f6548'
          
        return this._httpClient.post('/auth/realms/wafaimmo-siteweb/protocol/openid-connect/token', body, {headers:headers})
        .pipe(
            switchMap((response: any) => {

                console.log(response);
                // Return a new observable with the response

                const headers = new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + response.access_token
                });

                console.log(response.access_token);

                let body = {
                    "firstName": user.name,
                    "lastName": user.prenom,
                    "email": user.email,
                    "enabled": "true",
                    "username": user.name + '-' + user.prenom,
                    "credentials": [
                        {
                            "type": "password",
                            "value": user.pass1,
                            "temporary": false
                        }
                    ]
                }
          
                return this._httpClient.post('/auth/admin/realms/wafaimmo-siteweb/users', body, {headers:headers})
                .pipe(
                    switchMap((response: any) => {

                        // Return a new observable with the response
                        return of(response);
                    })
                );
            })
        );
    }

    sendMail(): Observable<any>
    {
        const headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        let body = 'grant_type=client_credentials&client_id=admin-cli&client_secret=0b4a269a-7076-4c4b-8729-4b6d0e7f6548'
          
        return this._httpClient.post('/auth/realms/wafaimmo-siteweb/protocol/openid-connect/token', body, {headers:headers})
        .pipe(
            switchMap((response: any) => {

                console.log(response);
                // Return a new observable with the response

                const headers = new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + response.access_token
                });

                console.log(response.access_token);

                let body = {
                    "id":"22546a45-d824-49a3-afba-716a05d773da",
                    "realm":"wafaimmo-siteweb"
                }
          
                return this._httpClient.put('/auth/admin/realms/wafaimmo-siteweb/users/22546a45-d824-49a3-afba-716a05d773da/send-verify-email', body, {headers:headers})
                .pipe(
                    switchMap((response: any) => {

                        // Return a new observable with the response
                        return of(response);
                    })
                );
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
        if ( !this.accessToken )
        {
            return of(false);
        }

        // Check the access token expire date
        if ( AuthUtils.isTokenExpired(this.accessToken) )
        {
            return of(false);
        }

        // If the access token exists and it didn't expire, sign in using it
        return this.signInUsingToken();
    }
}
