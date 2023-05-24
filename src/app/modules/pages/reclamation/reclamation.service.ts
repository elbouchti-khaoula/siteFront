import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, EMPTY, map, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { Motif, Reclamation } from './reclamation.types';

@Injectable({
    providedIn: 'root'
})
export class ReclamationsService {

    private _motifs: BehaviorSubject<Motif[] | null> = new BehaviorSubject(null);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------
    /**
     * Getter for CategoriesSocioProfessionnelle
     */
    get motifs$(): Observable<Motif[]> {
        return this._motifs.asObservable();
    }


    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get motifs
     */
    getMotifs(): Observable<any> {
        return this._httpClient.get<Motif[]>('api/reclamations/motifs/selfcare')
            .pipe(
                tap((response: Motif[]) => {
                    response.push({ id: -1, libelle: "Alerte éthique", libelleselfcare: "Alerte éthique" });
                    response.sort((a, b) => a.libelleselfcare.localeCompare(b.libelleselfcare));
                    this._motifs.next(response);
                })
            );
    }

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
            motif: number;
            text: string | null;
            statut: string;
            canal: number;
            initiateur: string;
            dateReception: Date | null;
        }
    ): Observable<Reclamation> {
        return this._httpClient.post('api/reclamations', reclamation)
            .pipe(
                map((newReclamation: Reclamation) => {

                    // Return the response
                    return newReclamation;
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
                map((newStatut: any) => {

                    // Return the response
                    return newStatut;
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
            motif: number;
            text: string | null;
            statut: string;
            canal: number;
            initiateur: string;
            dateReception: Date | null;
        }) {

        return this.createReclamation(reclamation)
            .pipe(
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
                        )
                            .pipe(
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
