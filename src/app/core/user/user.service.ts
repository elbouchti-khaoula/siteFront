import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of, ReplaySubject, switchMap } from 'rxjs';
import { User, UserKeycloak } from 'app/core/user/user.types';

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
     * get user
     *
     * @param user
     */
    get(userId: string): Observable<User> {
        return this._httpClient.get(`api/authentication/users/${userId}`)
            .pipe(
                map((response: UserKeycloak) => {

                    let user = this.mapUserKeycloakToUser(response);

                    // Set user in service
                    this._user.next(user);

                    return user;
                })
            );
    }

    /**
     * search user
     *
     * @param userKeycloak
     * return User
     */
    searchUser(userKeycloak: UserKeycloak): Observable<User[]> {

        return this._httpClient.post('api/authentication/users/search', userKeycloak)
            .pipe(
                map((response: UserKeycloak[]) => {

                    return response.map(element => {
                        return this.mapUserKeycloakToUser(element)
                    })
                })
            );
    }

    /**
     * serach user
     *
     * @param username
     * return user
     */
    searchUserByEmail(email: string): Observable<User> {
        return this.searchUser({ email: email })
            .pipe(
                map((response: User[]) => {

                    if (response && response.length > 0) {

                        // Set user in service
                        this._user.next(response[0]);

                        return response[0];
                    }
                })
            );
    }

    /**
     * sign up user
     *
     * @param user
     */
    signUp(user: {
        firstName: string;
        lastName: string;
        email: string;
        cin: string;
        telephone: string;
        dateNaissance: string;
        clientAWB: boolean;
        password: string
    }): Observable<string> {
        // création user avec cin null => la mise à jour va se faire par la suite via un batch
        let userKeycloak: UserKeycloak = {
            username: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            enabled: true,
            attributes: {
                cin: [''],
                telephone: [user.telephone],
                dateNaissance: [user.dateNaissance],
                clientAWB: [user.clientAWB.toString()]
            },
            credentials: [
                {
                    "type": "password",
                    "value": user.password,
                    "temporary": false
                }
            ]
        }

        return this.createUser(userKeycloak);
    }

    /**
     * Create user
     *
     * @param userKeycloak
     * return userKeycloakId
     */
    createUser(userKeycloak: UserKeycloak): Observable<string> {
        return this._httpClient.post('api/authentication/users', userKeycloak)
            .pipe(
                map((userId: string) => {

                    return userId;
                })
            );
    }

    /**
     * send mail de vérification to user
     *
     * @param userKeycloak
     * return userKeycloakId
     */
    sendMailToUser(userId: string): Observable<any> {
        return this._httpClient.put(`api/authentication/users/sendMail/${userId}`, {});
    }

    /**
     * delete user
     *
     * @param userKeycloak
     * return userKeycloakId
     */
    deleteUser(userId: string): Observable<any> {
        return this._httpClient.delete(`api/authentication/users/${userId}`);
    }

    /**
     * Update the user
     *
     * @param user
     */
    updateUser(user: User): Observable<User> {
        let userKeycloak: UserKeycloak = {
            username: user.email,
            attributes: {
                cin: [user.cin],
                telephone: [user.telephone],
                dateNaissance: [user.dateNaissance],
                clientAWB: [user.clientAWB.toString()]
            }
        }

        return this._httpClient.put<User>(`api/authentication/users/${user.id}`, userKeycloak)
            .pipe(
                switchMap((response: UserKeycloak) => {

                    let userResult = {...this.mapUserKeycloakToUser(response), status: user.status};

                    // Set user in locale storage
                    localStorage.setItem('connectedUser', JSON.stringify(userResult));

                    // Set user in service
                    this._user.next(userResult);

                    return of(userResult);
                })
            );
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    mapUserKeycloakToUser(userKeycloak: UserKeycloak): User {
        let result: User = {
            id: userKeycloak.id,
            username: userKeycloak.username,
            createdTimestamp: userKeycloak.createdTimestamp,
            enabled: userKeycloak.enabled,
            emailVerified: userKeycloak.emailVerified,
            firstName: userKeycloak.firstName,
            lastName: userKeycloak.lastName,
            email: userKeycloak.email,
            cin: userKeycloak.attributes?.cin?.[0],
            telephone: userKeycloak.attributes?.telephone?.[0],
            dateNaissance: userKeycloak.attributes?.dateNaissance?.[0],
            clientAWB: userKeycloak.attributes?.clientAWB?.[0] == "true",
        }
        return result;
    }

}
