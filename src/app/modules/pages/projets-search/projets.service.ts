import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, of, switchMap, take, tap, throwError } from 'rxjs';
import { Projet } from './projets.types';

@Injectable({
    providedIn: 'root'
})
export class ProjetsService
{
    // Private
    private _projet: BehaviorSubject<Projet | null> = new BehaviorSubject(null);
    private _projets: BehaviorSubject<Projet[] | null> = new BehaviorSubject(null);

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
     * Getter for projet
     */
    get projet$(): Observable<Projet>
    {
        return this._projet.asObservable();
    }

    /**
     * Getter for projets
     */
    get projets$(): Observable<Projet[]>
    {
        return this._projets.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Search projets with given query
     *
     * @param queryParams
     */
    searchProjets(queryParams: { ville?: string; quartier?: string; typeBien?: string; prixMin?: number; prixMax?: number }): Observable<Projet[]>
    {
        // const httpOptions = {
        //     headers: { 'Content-Type': 'application/json' },
        //     params: { ...searchParams}
        // };
        // return this._httpClient.get<Projet[]>('api/projets/search', httpOptions);

        return this._httpClient.get<Projet[]>('api/projets/search', {
        //return this._httpClient.get<Projet[]>('api/real-estate-projects/search', {
                params: queryParams
            }).pipe(
                tap((projets : Projet[]) => {

                    // Sort the projets by the name field by default
                    projets.sort((a, b) => a.nom.localeCompare(b.nom));

                    // Get description small
                    projets.forEach(projet => 
                        projet.descriptionSmall = projet.description.substring(0, projet.description.indexOf("</p>") + 4)
                    );

                    this._projets.next(projets);
                })
            );
    }

    /**
     * Get projet by id
     */
    getProjetById(id: string): Observable<Projet>
    {
        return this._projets.pipe(
            take(1),
            map((projets) => {

                // Find the projet
                const projet = projets?.find(item => item.id === id) || null;

                // Update the projet
                this._projet.next(projet);

                // Return the projet
                return projet;
            }),
            switchMap((projet) => {

                if ( !projet )
                {
                    return throwError('Could not found projet with id of ' + id + '!');
                }

                return of(projet);
            })
        );
    }

    /**
     * Get projet
     *
     * @param id
     */
    // getProjetById(id: string): Observable<any>
    // {
    //     return this._httpClient.get<Projet>('api/real-estate-projects/' + id).pipe(
    //         map((response) => {

    //             // Update the projet
    //             this._projet.next(response);

    //             // Return the projet
    //             return response;
    //         }),
    //         switchMap((response) => {

    //             if (!response) {
    //                 return throwError('Could not found chat with id of ' + id + '!');
    //             }

    //             return of(response);
    //         })
    //     );
    // }

}
