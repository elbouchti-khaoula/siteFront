import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { AuthUtils } from './auth.utils';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    /**
     * Constructor
     */
    constructor(
        private _authenticationService: AuthenticationService
    )
    {
    }

    /**
     * Intercept
     *
     * @param req
     * @param next
     */
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
    {
        // Clone the request object
        let newReq = req.clone();

        // Request
        //
        // If the access token didn't expire, add the Authorization header.
        // We won't add the Authorization header if the access token expired.
        // This will force the server to return a "401 Unauthorized" response
        // for the protected API routes which our response interceptor will
        // catch and delete the access token from the local storage while logging
        // the user out from the app.
        if (newReq.url.substring(0, 12) === "api/projects") {

            let token = this.getToken();
            if (token) {
                newReq = req.clone({
                    headers: req.headers.set('Authorization', 'Bearer ' + token)
                });
            }
            console.log("+-+-+- newReq", newReq);
        }

        // Response
        return next.handle(newReq).pipe(
            catchError((error) => {

                // Catch "401 Unauthorized" responses
                if (error instanceof HttpErrorResponse && error.status === 401) {
                    // Sign out
                    this._authenticationService.signOut();

                    // Reload the app
                    // location.reload();
                }

                return throwError(() => error);
            })
        );
    }

    getToken(): string {
        let currentUser = this._authenticationService.connectedUser;

        if (currentUser == undefined || currentUser == null) {
            if (this._authenticationService.accessTokenGeneric !== undefined
                && this._authenticationService.accessTokenGeneric !== null
                // && !AuthUtils.isTokenExpired(this._authenticationService.accessTokenGeneric)
            ) {
                return this._authenticationService.accessTokenGeneric;
            }
        }
        else {
            if (this._authenticationService.accessTokenUser !== undefined
                && this._authenticationService.accessTokenUser !== null
                // && !AuthUtils.isTokenExpired(this._authenticationService.accessTokenUser)
            ) {
                return this._authenticationService.accessTokenUser;
            }
        }

        return null;
    }

}
