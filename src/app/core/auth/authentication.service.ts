import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, switchMap } from 'rxjs';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { User } from 'app/core/user/user.types';
import { UserService } from 'app/core/user/user.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _userService: UserService
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token Generic user to acces non-connected-api
     */
    set accessTokenGeneric(token: string) {
        localStorage.setItem('accessTokenGeneric', token);
    }

    get accessTokenGeneric(): string {
        return localStorage.getItem('accessTokenGeneric') ?? '';
    }

    /**
     * Setter & getter for access token connected user to access connected-api
     */
    set accessTokenUser(token: string) {
        localStorage.setItem('accessTokenUser', token);
    }

    get accessTokenUser(): string {
        return localStorage.getItem('accessTokenUser') ?? '';
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get token generic
     *
     */
    getTokenGeneric(): Observable<string> {

        // Check the authentication status
        return this.checkAuthenticationGeneric()
            .pipe(
                switchMap((check) => {

                    // If the user is not authenticated...
                    if (!check) {

                        // get token from api
                        return this.getAccessTokenGeneric();
                    }

                    // Return token from local storage
                    return of(this.accessTokenGeneric.toString());
                })
            );
    }

    /**
     * Get token connected user
     *
     */
    getTokenUser(username: string, password: string): Observable<string> {

        // Check the authentication status
        return this.checkAuthenticationUser()
            .pipe(
                switchMap((check) => {

                    // If the user is not authenticated...
                    if (!check) {

                        // get token from api
                        return this.getAccessTokenUser(username, password);
                    }

                    // Return token from local storage
                    return of(this.accessTokenUser);
                })
            );
    }

    /**
     * Sign in
     *
     * @param credentials
     */
    signIn(credentials: { email: string; password: string }): Observable<boolean> {

        // Throw error, if the user is already logged in
        // if (this._authenticated) {
        //     return throwError('User is already logged in.');
        // }

        return this.getTokenUser(credentials.email, credentials.password).pipe(
            switchMap((accessToken: string) => {

                return this._userService.searchUserByEmail(credentials.email).pipe(
                    switchMap((user: User) => {
                        if (user) {

                            if (user.emailVerified) {

                                // Set user
                                this._userService.user = user;

                                return of(true)
                            } else {

                                // Remove user
                                this._userService.user = null;

                                return of(false)
                            }
                        } else {

                            // Remove user
                            this._userService.user = null;

                            return of(false)
                        }
                    })
                );
            })
        );
    }

    /**
     * Sign out
     */
    signOut(): Observable<any> {
        // Remove the access token from the local storage
        localStorage.removeItem('accessTokenUser');

        // Remove user
        this._userService.user = null;

        // Return the observable
        return of(true);
    }

    /**
     * Check the authentication status of access token admin
     */
    checkAuthenticationGeneric(): Observable<boolean> {

        // Check the access token availability
        if (this.accessTokenGeneric === undefined || this.accessTokenGeneric === null || this.accessTokenGeneric === '') {
            return of(false);
        }

        // Check the access token expire date
        // if (AuthUtils.isTokenExpired(this.accessTokenGeneric)) {
        //     return of(false);
        // }

        // If the access token exists and it didn't expire, sign in using it
        // return this.signInUsingToken();
        return of(true);
    }

    /**
     * Check the authentication status of access token admin
     */
    checkAuthenticationUser(): Observable<boolean> {

        // Check if the user is logged in
        let currentUser;
        this._userService.user$.subscribe((user: User) => {
            currentUser = user;
        });
        if (currentUser != undefined && currentUser != null) {
            return of(true);
        }

        // Check the access token availability
        if (this.accessTokenUser === undefined || this.accessTokenUser === null || this.accessTokenUser === '')
        {
            return of(false);
        }

        // Check the access token expire date
        // if ( AuthUtils.isTokenExpired(this.accessTokenUser) )
        // {
        //     return of(false);
        // }

        // If the access token exists and it didn't expire, sign in using it
        // return this.signInUsingToken();
        return of(true);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get access token generic from api
     *
     */
    private getAccessTokenGeneric(): Observable<string> {

        return this._httpClient.post('api/authentication/getToken',
            {
                username: "siteweb",
                password: "w@afa2022"
            }
        ).pipe(
            switchMap((response: any) => {

                // Store the access token in the local storage
                this.accessTokenGeneric = response.accesToken;

                // Return a new observable with the response
                return of(response.accesToken);
            })
        );
    }

    /**
     * Get access token connected user from api
     *
     */
    private getAccessTokenUser(username: string, password: string): Observable<string> {

        return this._httpClient.post('api/authentication/getToken',
            {
                username: username,
                password: password
            }
        ).pipe(
            switchMap((response: any) => {

                // Store the access token in the local storage
                this.accessTokenUser = response.accesToken;

                // Return a new observable with the response
                return of(response.accesToken);
            })
        );
    }

}