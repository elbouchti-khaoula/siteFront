import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, switchMap, throwError } from 'rxjs';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { User } from 'app/core/user/user.types';
import { UserService } from 'app/core/user/user.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    user: User;

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _userService: UserService
    )
    {
        this._userService.user$.subscribe((user: User) =>
            this.user = user
        );
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

    set connectedUser(user: User) {
        localStorage.setItem('connectedUser', JSON.stringify(user));
    }

    get connectedUser(): User {
        return localStorage.getItem('connectedUser') ? JSON.parse(localStorage.getItem('connectedUser')) : null;
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

        return this.getTokenUser(credentials.email, credentials.password).pipe(
            switchMap(() => {

                return this._userService.searchUserByEmail(credentials.email).pipe(
                    switchMap((user: User) => {

                        if (user) {

                            var usr = { ...user, status: 'online' };

                            // Set user in locale storage
                            this.connectedUser = usr;

                            // Set user in service
                            this._userService.user = usr;

                            return of(true);
                        } else {

                            this.signOut();

                            return throwError(() => 'User inexistant');
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

        // Remove the connectedUser from the local storage
        localStorage.removeItem('connectedUser');

        // Remove user
        this._userService.user = null;

        // Return the observable
        return of(true);
    }

    /**
     * Check the authentication status of access token generic
     */
    checkAuthenticationGeneric(): Observable<boolean> {

        // Check the access token availability
        if (this.accessTokenGeneric == null || this.accessTokenGeneric === ''
            || this.accessTokenGeneric === 'null' || this.accessTokenGeneric === 'undefined') {
            return of(false);
        }

        // Check the access token expire date
        if (AuthUtils.isTokenExpired(this.accessTokenGeneric)) {
            return of(false);
        }

        // If the access token exists and it didn't expire, sign in using it
        // return this.signInUsingToken();
        return of(true);
    }

    /**
     * Check the authentication status of access token user
     */
    checkAuthenticationUser(): Observable<boolean> {

        // Check if the user is logged in
        if (this.connectedUser == null) {
            return of(false);
        }

        // Check the access token availability
        if (this.accessTokenUser == null || this.accessTokenUser === ''
            || this.accessTokenUser === 'null' || this.accessTokenUser === 'undefined') {
            return of(false);
        }

        // Check the access token expire date
        if ( AuthUtils.isTokenExpired(this.accessTokenUser) )
        {
            return of(false);
        }

        // If the access token exists and it didn't expire, sign in using it
        // return this.signInUsingToken();
        return of(true);
    }

    /**
     * Set user in service from locale storage
     *
     * @param user
     */
    setUserFromStorage(): Observable<any> {

        let userStorage = this.connectedUser;

        if (this.user == null && userStorage && userStorage.id) {

            // Set user in service
            this._userService.user = { ...userStorage, status: 'online' };

            return of(true);
        }

        return of(false);
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
