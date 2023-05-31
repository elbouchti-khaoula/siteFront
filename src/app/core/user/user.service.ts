import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, ReplaySubject, switchMap, tap } from 'rxjs';
import { User } from 'app/core/user/user.types';

@Injectable({
    providedIn: 'root'
})
export class UserService
{
    private _user: ReplaySubject<User> = new ReplaySubject<User>(1);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for user
     *
     * @param value
     */
    set user(value: User)
    {
        // Store the value
        this._user.next(value);
    }

    get user$(): Observable<User>
    {
        return this._user.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get the current logged in user data
     */
    get(username: string): Observable<User>
    {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem("accessTokenAdmin")
        });

        return this._httpClient.get<User>('auth/admin/realms/wafaimmo-siteweb/users?username='+username, { headers: headers }).pipe(
            tap((response) => {

                console.log("Get User : ");
                console.log(response[0]);
               
                let attrib = response[0].attributes;

                let user = {
                    id:response[0].id,
                    userName        : response[0].username,
                    firstName       : response[0].firstName, 
                    lastName        : response[0].lastName,
                    email           : response[0].email,
                    clientAWB      : false,
                    telephone      : attrib!= undefined && attrib.telephone != undefined?response[0].attributes.telephone[0]:null,
                    cin            : attrib!= undefined && attrib.cin != undefined?response[0].attributes.cin[0]:null,
                    dateNaissance : attrib!= undefined && attrib.dateNaissance!= undefined ?response[0].attributes.dateNaissance[0]:null,
                    statut        : null, 
                    avatar        : null,
                    status        : 'online'
                }
               this._user.next(user);
            })
        );
    }

    getAdminToken(): Observable<any> {

        const headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded'
        });

        let body = 'grant_type=client_credentials&client_id=admin-cli&client_secret=0b4a269a-7076-4c4b-8729-4b6d0e7f6548'

        return this._httpClient.post('/auth/realms/wafaimmo-siteweb/protocol/openid-connect/token', body, { headers: headers })
            .pipe(
                tap((response: any) => {
                    localStorage.setItem('accessTokenAdmin', response.access_token);
                    console.log("success accessTokenAdmin");
                    console.log(response);
                })
            );
    }
    
    getGenericToken(): Observable<any> {

        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        let body = '{"userName" : "siteweb","password" : "w@afa2022"}'

        return this._httpClient.post('/api/projects/authentification/getToken', body, { headers: headers })
            .pipe(
                tap((response: any) => {
                    localStorage.setItem('accessTokenGeneric', response.access_token);
                    console.log("success accessTokenGeneric");
                    console.log(response);
                })
            );
    }

    /**
     * Update the user
     *
     * @param user
     */
    update(user: User): Observable<any>
    {
        return this._httpClient.patch<User>('api/common/user', {user}).pipe(
            map((response) => {
                this._user.next(response);
            })
        );
    }
}
