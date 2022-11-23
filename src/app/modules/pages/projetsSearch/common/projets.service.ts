import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, filter, map, Observable, of, switchMap, take, tap, throwError } from 'rxjs';
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
     * Get projets
     */
    // getProjets(): Observable<Projet[]>
    // {
    //     return this._httpClient.get<Projet[]>('api/projets/all').pipe(
    //         tap((projets) => {
    //             this._projets.next(projets);
    //         })
    //     );
    // }

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
        // return this.http.get(this.Url, httpOptions);

        // { params: params } is the same as { params } 
        return this._httpClient.get<Projet[]>('api/projets/search', {
            params: queryParams
        }).pipe(
            tap((projets) => {
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
                const projet = projets.find(item => item.id === id) || null;

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
     * Create projet
     */
    createProjet(): Observable<Projet>
    {
        return this.projets$.pipe(
            take(1),
            switchMap(projets => this._httpClient.post<Projet>('api/projets/projet', {}).pipe(
                map((newProjet) => {

                    // Update the projets with the new projet
                    this._projets.next([newProjet, ...projets]);

                    // Return the new projet
                    return newProjet;
                })
            ))
        );
    }

    /**
     * Update projet
     *
     * @param id
     * @param projet
     */
    updateProjet(id: string, projet: Projet): Observable<Projet>
    {
        return this.projets$.pipe(
            take(1),
            switchMap(projets => this._httpClient.patch<Projet>('api/projets/projet', {
                id,
                projet
            }).pipe(
                map((updatedProjet) => {

                    // Find the index of the updated projet
                    const index = projets.findIndex(item => item.id === id);

                    // Update the projet
                    projets[index] = updatedProjet;

                    // Update the projets
                    this._projets.next(projets);

                    // Return the updated projet
                    return updatedProjet;
                }),
                switchMap(updatedProjet => this.projet$.pipe(
                    take(1),
                    filter(item => item && item.id === id),
                    tap(() => {

                        // Update the projet if it's selected
                        this._projet.next(updatedProjet);

                        // Return the updated projet
                        return updatedProjet;
                    })
                ))
            ))
        );
    }

    /**
     * Delete the projet
     *
     * @param id
     */
    deleteProjet(id: string): Observable<boolean>
    {
        return this.projets$.pipe(
            take(1),
            switchMap(projets => this._httpClient.delete('api/projets/projet', {params: {id}}).pipe(
                map((isDeleted: boolean) => {

                    // Find the index of the deleted projet
                    const index = projets.findIndex(item => item.id === id);

                    // Delete the projet
                    projets.splice(index, 1);

                    // Update the projets
                    this._projets.next(projets);

                    // Return the deleted status
                    return isDeleted;
                })
            ))
        );
    }



    /**
     * Update the avatar of the given projet
     *
     * @param id
     * @param avatar
     */
    // uploadAvatar(id: string, avatar: File): Observable<Projet>
    // {
    //     return this.projets$.pipe(
    //         take(1),
    //         switchMap(projets => this._httpClient.post<Projet>('api/projets/avatar', {
    //             id,
    //             avatar
    //         }, {
    //             headers: {
    //                 // eslint-disable-next-line @typescript-eslint/naming-convention
    //                 'Content-Type': avatar.type
    //             }
    //         }).pipe(
    //             map((updatedProjet) => {

    //                 // Find the index of the updated projet
    //                 const index = projets.findIndex(item => item.id === id);

    //                 // Update the projet
    //                 projets[index] = updatedProjet;

    //                 // Update the projets
    //                 this._projets.next(projets);

    //                 // Return the updated projet
    //                 return updatedProjet;
    //             }),
    //             switchMap(updatedProjet => this.projet$.pipe(
    //                 take(1),
    //                 filter(item => item && item.id === id),
    //                 tap(() => {

    //                     // Update the projet if it's selected
    //                     this._projet.next(updatedProjet);

    //                     // Return the updated projet
    //                     return updatedProjet;
    //                 })
    //             ))
    //         ))
    //     );
    // }
}
