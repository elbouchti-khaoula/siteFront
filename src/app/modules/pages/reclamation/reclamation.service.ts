import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, EMPTY, Observable, of, switchMap, throwError } from 'rxjs';
import { Reclamation } from './reclamation.types';

@Injectable({
    providedIn: 'root'
})
export class ReclamationsService {

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create reclamation
     *
     * @param reclamation
     */
    createReclamation(reclamation:
        {
            nom: string;
            prenom: string;
            cin: string;
            numeroDossier: string;
            email: string;
            telephone: string | null;
            // adresse: string;
            // ville: string;
            motif : number;
            text: string | null;
            statut: string;
            canal: number;
            initiateur: string;
            dateReception: Date | null;
        }
    ): Observable<any> {
        return this._httpClient.post('api/reclamations', reclamation)
            .pipe(
                switchMap((response: Reclamation) => {

                    // Return a new observable with the response
                    return of(response);
                })
            );
    }

    createStatut(statut:
        {
            id: {
                statut: string;
                step: number;
                reclamation: Reclamation;
            };
            // "motif" : null,
            intervenant: string;
            role: string;
            entite: string;
            nombreJours: number;
            enRetard: boolean;
        }
    ): Observable<any> {
        return this._httpClient.post('api/reclamations/statuts', statut)
            .pipe(
                switchMap((response: any) => {

                    // Return a new observable with the response
                    return of(response);
                })
            );
    }

    createReclamationEtStatut(reclamation:
        {
            nom: string;
            prenom: string;
            cin: string;
            numeroDossier: string;
            email: string;
            telephone: string | null;
            // adresse: string;
            // ville: string;
            motif : number;
            text: string | null;
            statut: string;
            canal: number;
            initiateur: string;
            dateReception: Date | null;
        }) {

        return this.createReclamation(reclamation).pipe(
            catchError(err1 => {
                // console.log("Error from first call: ", err1);
                // return EMPTY;
                return throwError(err1);
            }),
            switchMap((reclamation: Reclamation) => {
                if (reclamation?.id != undefined && reclamation?.id != null) {
                    return this.createStatut(
                        {
                            id: {
                                statut: 'publié',
                                step: 1,
                                reclamation: reclamation
                            },
                            // "motif" : null,
                            intervenant: 'siteweb',
                            role: 'initiateur',
                            entite: 'SITE WEB',
                            nombreJours: 1,
                            enRetard: false
                        }
                    ).pipe(
                        catchError(err2 => {
                            // console.log("Error from second call: ", err2);
                            // return EMPTY;
                            return throwError(err2);
                        }),
                    );
                }
                return EMPTY;
            }));
    }

}
