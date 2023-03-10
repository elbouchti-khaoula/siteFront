import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, of, switchMap, take, tap, throwError } from 'rxjs';
import { CategorieSocioProfessionnelle, Ville, Quartier, TypeBien, Nationalite, ObjetFinancement, Agence } from './referentiel.types';

@Injectable({
    providedIn: 'root'
})
export class ReferentielService {

    // Private
    private _categoriesSocioProf: BehaviorSubject<CategorieSocioProfessionnelle[] | null> = new BehaviorSubject(null);
    private _nationalites: BehaviorSubject<Nationalite[] | null> = new BehaviorSubject(null);
    private _objetsFinancement: BehaviorSubject<ObjetFinancement[] | null> = new BehaviorSubject(null);
    private _villes: BehaviorSubject<Ville[] | null> = new BehaviorSubject(null);
    private _quartiers: BehaviorSubject<Quartier[] | null> = new BehaviorSubject(null);
    private _typesBiens: BehaviorSubject<TypeBien[] | null> = new BehaviorSubject(null);
    private _agences: BehaviorSubject<Agence[] | null> = new BehaviorSubject(null);
    private _agence: BehaviorSubject<Agence | null> = new BehaviorSubject(null);
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
    get categoriesSocioProf$(): Observable<CategorieSocioProfessionnelle[]> {
        return this._categoriesSocioProf.asObservable();
    }

    /**
     * Getter for Nationalites
     */
    get nationalites$(): Observable<Nationalite[]> {
        return this._nationalites.asObservable();
    }

    /**
     * Getter for Objets de financement
     */
    get objetsFinancement$(): Observable<ObjetFinancement[]> {
        return this._objetsFinancement.asObservable();
    }

    /**
     * Getter for villes
     */
    get villes$(): Observable<Ville[]> {
        return this._villes.asObservable();
    }

    /**
     * Getter for quartiers
     */
    get quartiers$(): Observable<Quartier[]> {
        return this._quartiers.asObservable();
    }

    /**
     * Getter for types de biens
     */
    get typesBiens$(): Observable<TypeBien[]> {
        return this._typesBiens.asObservable();
    }

    /**
     * Getter for agences
     */
    get agences$(): Observable<Agence[]> {
        return this._agences.asObservable();
    }

    /**
     * Getter for agence
     */
    get agence$(): Observable<Agence> {
        return this._agence.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Get categories socio-professionnelle
     */
    getCategories(): Observable<any> {
        return this._httpClient.get<CategorieSocioProfessionnelle[]>('api/repositories/categories-socio-professionelles')
            .pipe(
                tap((response: CategorieSocioProfessionnelle[]) => {
                    this._categoriesSocioProf.next(response);
                })
            );
    }

    /**
     * Get nationalités
     */
    getNationalites(): Observable<any> {
        return this._httpClient.get<Nationalite[]>('api/repositories/nationalites')
            .pipe(
                tap((response: Nationalite[]) => {
                    this._nationalites.next(response);
                })
            );
    }

    /**
     * Get objets de financement
     */
    getObjetsFinancement(): Observable<any> {
        return this._httpClient.get<ObjetFinancement[]>('api/repositories/objets-financement')
            .pipe(
                tap((response: ObjetFinancement[]) => {
                    this._objetsFinancement.next(response);
                })
            );
    }

    /**
     * Get villes
     */
    getVilles(): Observable<any> {
        return this._httpClient.get<Ville[]>('api/repositories/villes')
            .pipe(
                tap((response: Ville[]) => {
                    // Sort the villes by the description field by default
                    response.sort((a, b) => a.description.localeCompare(b.description));

                    localStorage.setItem('villes', JSON.stringify(response));

                    this._villes.next(response);
                })
            );
    }

    /**
     * Get quartiers by ville using ville code
     *
     * @param codeVille
     */
    getQuartiersByVille(codeVille: number): Observable<Quartier[]> {
        return this._httpClient.get<Quartier[]>(
            `api/repositories/${codeVille}/quartiers`
            // 'api/repositories/quartiers', { params: { codeVille } }
        ).pipe(
            tap((response: Quartier[]) => {
                // Sort the quartiers by the libelle field by default
                response.sort((a, b) => a.libelle.localeCompare(b.libelle));

                localStorage.setItem('quartiers', JSON.stringify(response));

                this._quartiers.next(response);
            })
        );
    }

    /**
     * Get types de biens
     */
    getTypesBiens(): Observable<any> {
        return this._httpClient.get<TypeBien[]>('api/repositories/types-biens')
            .pipe(
                tap((response: TypeBien[]) => {
                    // Sort the types de biens by the libelle field by default
                    response.sort((a, b) => a.libelle.localeCompare(b.libelle));

                    localStorage.setItem('typesBiens', JSON.stringify(response));

                    this._typesBiens.next(response);
                })
            );
    }


    /**
     * Get villes
     */
    getAgences(): Observable<any> {
        return this._httpClient.get<Agence[]>('api/repositories/agences')
            .pipe(
                tap((response: Agence[]) => {
                    // Sort the villes by the description field by default
                    response.sort((a, b) => a.nom.localeCompare(b.nom));

                    let villes: Ville[] = JSON.parse(localStorage.getItem('villes'));
                    for (let i = 0; i < response?.length; i++) {
                        response[i].libelleVille = villes?.length > 0 ? villes.find((e) => e.codeVille == response[i].codeVille)?.description : "";
                    }

                    this._agences.next(response);
                })
            );
    }

    /**
     * Get agences by ville using ville code
     *
     * @param codeVille
     */
    getAgencesByVille(codeVille: number): Observable<Agence[]> {
        return this._httpClient.get<Agence[]>(
            `api/repositories/${codeVille}/agences`
        ).pipe(
            tap((response: Agence[]) => {
                // Sort the agences by the libelle field by default
                response.sort((a, b) => a.nom.localeCompare(b.nom));

                let villes: Ville[] = JSON.parse(localStorage.getItem('villes'));
                for (let i = 0; i < response?.length; i++) {
                    response[i].libelleVille = villes?.length > 0 ? villes.find((e) => e.codeVille == response[i].codeVille)?.description : "";
                }

                this._agences.next(response);
            })
        );
    }

    /**
     * Get agence by id
     */
    getAgenceById(id: number): Observable<Agence> {
        return this._agences.pipe(
            take(1),
            map((agences) => {

                // Find the agence
                const agence = agences?.find(item => item.id === id) || null;

                // Update the agence
                this._agence.next(agence);

                // Return the agence
                return agence;
            }),
            switchMap((agence) => {

                if (!agence) {
                    return throwError('Could not found agence with id of ' + id + '!');
                }

                return of(agence);
            })
        );
    }

}
