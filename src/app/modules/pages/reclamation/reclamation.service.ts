import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { Motif, Reclamation } from './reclamation.types';
import { ReferentielService } from 'app/core/services/referentiel/referentiel.service';
import { EnvoiMail } from 'app/core/services/referentiel/referentiel.types';

@Injectable({
    providedIn: 'root'
})
export class ReclamationsService {

    private _motifs: BehaviorSubject<Motif[] | null> = new BehaviorSubject(null);

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _referentielService: ReferentielService
    ) {
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
                    // response.push({ id: -1, libelle: "Alerte éthique", libelleselfcare: "Alerte éthique" });
                    response.sort((a, b) => a.libelleselfcare.localeCompare(b.libelleselfcare));
                    response.push(...response.splice(response.findIndex(v => v.libelleselfcare == 'Autre'), 1))
                    this._motifs.next(response);
                })
            );
    }

    /**
     * Create reclamation
     *
     * @param reclamation
     */
    createReclamation(reclamation: Reclamation): Observable<Reclamation>
    {
        return this._httpClient.post('api/reclamations', reclamation)
            .pipe(
                map((newReclamation: Reclamation) => {

                    // Return the response
                    return { ...newReclamation, type: reclamation.type, motifLibelle: reclamation.motifLibelle };
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
    ): Observable<any>
    {
        return this._httpClient.post('api/reclamations/statuts', statut)
            .pipe(
                map((newStatut: any) => {

                    // Return the response
                    return newStatut;
                })
            );
    }

    createReclamationEtStatut(reclamationParam: Reclamation): Observable<Reclamation>
    {
        return this.createReclamation(reclamationParam)
            .pipe(
                catchError(err1 => {
                    console.log("Error from first call: créer réclamation");
                    return throwError(() => err1);
                }),
                switchMap((reclamationCree: Reclamation) => {

                    if (reclamationCree?.id != undefined && reclamationCree?.id != null) {

                        let statut = {
                            id: {
                                statut: 'publié',
                                step: 1,
                                reclamation: reclamationCree
                            },
                            // "motif" : null,
                            intervenant: 'siteweb',
                            role: 'initiateur',
                            entite: 'SITE WEB',
                            nombreJours: 1,
                            enRetard: false
                        }

                        return this.createStatut(statut)
                            .pipe(
                                catchError(err2 => {
                                    console.log("Error from second call: créer statut");
                                    return throwError(() => err2);
                                }),
                                switchMap((statutCree: any) => {

                                    if (statutCree != null) {
                                        
                                        return of(reclamationCree);
                                    }
                                })
                            );
                    }
                    return of(reclamationCree);
                })
            );
    }

}
