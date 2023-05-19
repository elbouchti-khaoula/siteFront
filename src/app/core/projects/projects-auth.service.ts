import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, switchMap } from 'rxjs';
import { AuthUtils } from 'app/core/auth/auth.utils';

@Injectable({providedIn: 'root'})
export class ProjectAuthService {

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    set accessTokenApiProject(token: string) {
        localStorage.setItem('accessTokenApiProject', token);
    }

    get accessTokenApiProject(): string {
        return localStorage.getItem('accessTokenApiProject') ?? '';
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get token from api projects
     *
     */
    private getAccessTokenApiProjects(): Observable<string> {

        return this._httpClient.post('api/projects/authentification/getToken',
            {
                userName: "siteweb",
                password: "w@afa2022"
            }
        ).pipe(
            switchMap((response: any) => {

                // Store the access token in the local storage
                this.accessTokenApiProject = response.accesToken;

                // Return a new observable with the response
                return of(response.accesToken.toString());
            })
        );
    }

    /**
     * Check the authentication status
     */
    private check(): Observable<boolean> {

        // Check the access token availability
        if (this.accessTokenApiProject === undefined || this.accessTokenApiProject === null || this.accessTokenApiProject === '') {
            return of(false);
        }

        // Check the access token expire date
        if (AuthUtils.isTokenExpired(this.accessTokenApiProject)) {
            return of(false);
        }

        // If the access token exists and it didn't expire
        return of(true);
    }

    /**
     * Get token
     *
     */
    getToken(): Observable<string> {

        // Check the authentication status
        return this.check()
            .pipe(
                switchMap((check) => {

                    // If the user is not authenticated...
                    if (!check) {

                        // get token from api project
                        return this.getAccessTokenApiProjects();
                    }

                    // Return token from local storage
                    return of(this.accessTokenApiProject.toString());
                })
            );
    }

}
