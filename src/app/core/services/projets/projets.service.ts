import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, of, switchMap, take, tap, throwError } from 'rxjs';
import { Projet, ProjetFavori } from './projets.types';
import { Quartier, TypeBien, Ville } from 'app/core/services/referentiel/referentiel.types';
import { User } from 'app/core/user/user.types';
import { FuseUtilsService } from '@fuse/services/utils';

@Injectable({
    providedIn: 'root'
})
export class ProjetsService {
    // Private
    private _projet: BehaviorSubject<Projet | null> = new BehaviorSubject(null);
    private _projets: BehaviorSubject<Projet[] | null> = new BehaviorSubject(null);
    private _projetsFavoris: BehaviorSubject<ProjetFavori[] | null> = new BehaviorSubject(null);

    images = [
        [
            {
                chemin: 'assets/images/pages/marketplace/projet1/princ.jpg'
            },
            {
                chemin: 'assets/images/pages/marketplace/projet1/salon.jpg'
            },
            {
                chemin: 'assets/images/pages/marketplace/projet1/kitchen.jpeg'
            },
            {
                chemin: 'assets/images/pages/marketplace/projet1/bedroom.jpg'
            },
            {
                chemin: 'assets/images/pages/marketplace/projet1/childroom.jpg'
            }
        ],
        [
            {
                chemin: 'assets/images/pages/marketplace/projet2/princ.jpg'
            },
            {
                chemin: 'assets/images/pages/marketplace/projet2/salon.jpg'
            },
            {
                chemin: 'assets/images/pages/marketplace/projet2/kitchen.jpg'
            },
            {
                chemin: 'assets/images/pages/marketplace/projet2/bedroom.jpg'
            },
            {
                chemin: 'assets/images/pages/marketplace/projet2/childroom.jpg'
            }
        ],
        [
            {
                chemin: 'assets/images/pages/marketplace/projet3/princ.jpg'
            },
            {
                chemin: 'assets/images/pages/marketplace/projet3/salon.jpg'
            },
            {
                chemin: 'assets/images/pages/marketplace/projet3/kitchen.jpg'
            },
            {
                chemin: 'assets/images/pages/marketplace/projet3/bedroom.jpg'
            },
            {
                chemin: 'assets/images/pages/marketplace/projet3/childroom.jpg'
            }
        ],
        [
            {
                chemin: 'assets/images/pages/marketplace/projet4/princ.jpg'
            },
            {
                chemin: 'assets/images/pages/marketplace/projet4/salon.jpg'
            },
            {
                chemin: 'assets/images/pages/marketplace/projet4/kitchen.jpg'
            },
            {
                chemin: 'assets/images/pages/marketplace/projet4/bedroom.jpg'
            },
            {
                chemin: 'assets/images/pages/marketplace/projet4/childroom.jpg'
            }
        ],
        [
            {
                chemin: 'assets/images/pages/marketplace/projet5/princ.jpg'
            },
            {
                chemin: 'assets/images/pages/marketplace/projet5/salon.jpg'
            },
            {
                chemin: 'assets/images/pages/marketplace/projet5/kitchen.jpg'
            },
            {
                chemin: 'assets/images/pages/marketplace/projet5/bedroom.jpg'
            },
            {
                chemin: 'assets/images/pages/marketplace/projet5/childroom.jfif'
            }
        ]
    ];

    logos = [
        'assets/images/pages/marketplace/projet1/promoteur.png',
        'assets/images/pages/marketplace/projet2/promoteur.jpeg',
        'assets/images/pages/marketplace/projet3/promoteur.png',
        'assets/images/pages/marketplace/projet4/promoteur.png',
        'assets/images/pages/marketplace/projet5/promoteur.png'
    ];

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _fuseUtilsService: FuseUtilsService
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for projet
     */
    get projet$(): Observable<Projet> {
        return this._projet.asObservable();
    }

    /**
     * Getter for projets
     */
    get projets$(): Observable<Projet[]> {
        return this._projets.asObservable();
    }

    /**
     * Getter for projets favoris
     */
    get projetsFavoris$(): Observable<ProjetFavori[]> {
        return this._projetsFavoris.asObservable();
    }




    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    searchProjets(
        queryParams: {
            codeVille?: string;
            codeQuartier?: string;
            codeTypeBien?: string;
            prixMin?: number;
            prixMax?: number
        },
        user: User
    ): Observable<Projet[]> {

        if (user
            && user.username != null && user.username != undefined
            && user.email != null && user.email != undefined) {

            return this.searchProjetsWithFavoris(queryParams, user);
        }
        else {
            return this.searchProjetsWithoutFavoris(queryParams);
        }
    }

    /**
     * Search projets without favoris
     *
     * @param queryParams
     */
    searchProjetsWithoutFavoris(
        queryParams: {
            codeVille?: string;
            codeQuartier?: string;
            codeTypeBien?: string;
            prixMin?: number;
            prixMax?: number
        }
    ): Observable<Projet[]> {

        return this._httpClient.post<Projet[]>('api/real-estate-projects/search', queryParams)
            .pipe(
                tap((projets: Projet[]) => {

                    for (let i = 0; i < projets?.length; i++) {
                        // projets[i].medias1 = projets[i].medias;
                        // projets[i].medias = this.images[i % 5];
                        // projets[i].promoter.logoPath = this.logos[i % 5];
                        this.fillReferentielLabels(projets[i], null);
                    }

                    this._projets.next(projets);
                })
            );
    }

    /**
     * Search projets with favoris
     *
     * @param queryParams
     */
    searchProjetsWithFavoris(
        queryParams: {
            codeVille?: string;
            codeQuartier?: string;
            codeTypeBien?: string;
            prixMin?: number;
            prixMax?: number
        },
        user: User
    ): Observable<Projet[]> {

        return this._httpClient.post<Projet[]>('api/real-estate-projects/search', queryParams)
            .pipe(
                switchMap((projets: Projet[]) => {

                    return this.searchProjetsFavorisQuery({
                        userName: user.username,
                        userEmail: user.email,
                        statutFavorite: 'ENCOURS',
                    })
                        .pipe(
                            catchError(err2 => {
                                console.log("Error from second call: ");
                                return throwError(() => err2);
                            }),
                            switchMap((projetsFavoris: ProjetFavori[]) => {

                                for (let i = 0; i < projets?.length; i++) {
                                    // projets[i].medias1 = projets[i].medias;
                                    // projets[i].medias = this.images[i % 5];
                                    // projets[i].promoter.logoPath = this.logos[i % 5];
                                    let projetFavoris = projetsFavoris.find(e => e.realEstateProject.id === projets[i].id);
                                    this.fillReferentielLabels(projets[i], projetFavoris);
                                }

                                this._projets.next(projets);

                                return of(projets);
                            })
                        );
                })
            );
    }

    /**
     * find projet in projets list, by id
     */
    findProjetById(id: number): Observable<Projet> {
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

                if (!projet) {
                    return throwError(() => 'Could not found projet with id of ' + id + '!');
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
    getProjetById(id: number, user: User): Observable<Projet> {
        return this._httpClient.get<Projet>('api/real-estate-projects/' + id)
            .pipe(
                catchError(err1 => {
                    console.log("Error from first call: ");
                    return throwError(() => err1);
                }),
                switchMap((response: Projet) => {
                    if (user) {
                        return this.searchProjetsFavorisQuery({
                            userName: user.username,
                            userEmail: user.email,
                            statutFavorite: 'ENCOURS',
                            realEstateProject: { id: response.id }
                        }).pipe(
                            catchError(err2 => {
                                console.log("Error from second call: ");
                                return throwError(() => err2);
                            }),
                            switchMap((projetsFavoris: ProjetFavori[]) => {

                                // response.medias = this.images[0];
                                // response.promoter.logoPath = this.logos[0];
                                if (projetsFavoris && projetsFavoris.length > 0) {
                                    this.fillReferentielLabels(response, projetsFavoris[0]);
                                } else {
                                    this.fillReferentielLabels(response, null);
                                }

                                this._projet.next(response);

                                return of(response);
                            })
                        );
                    }
                    else {
                        // response.medias = this.images[0];
                        // response.promoter.logoPath = this.logos[0];
                        this.fillReferentielLabels(response, null);

                        // Update the projet
                        this._projet.next(response);

                        // Return the projet
                        return of(response);
                    }
                })
            );
    }

    /**
     * Create a projet favori
     *
     * @param projetFavori
     */
    addProjetFavori(projetFavori: ProjetFavori): Observable<ProjetFavori> {
        return this.searchProjetsFavorisQuery({
            userName: projetFavori.userName,
            userEmail: projetFavori.userEmail,
            statutFavorite: 'ENCOURS',
            realEstateProject: { id: projetFavori.realEstateProject.id }
        })
            .pipe(
                catchError(err1 => {
                    console.log("Error from first call: ");
                    return throwError(() => err1);
                }),
                switchMap((response: ProjetFavori[]) => {
                    if (response && response.length > 0) {
                        return of(null);
                    } else {
                        return this.createProjetFavori(projetFavori)
                            .pipe(
                                catchError(err2 => {
                                    console.log("Error from second call: ");
                                    return throwError(() => err2);
                                })
                            );
                    }
                }));
    }

    /**
     * Remove a projet favori
     *
     * @param projetFavori
     */
    removeProjetFavori(projetFavori: ProjetFavori): Observable<boolean> {
        return this.searchProjetsFavorisQuery({
            userName: projetFavori.userName,
            userEmail: projetFavori.userEmail,
            statutFavorite: 'ENCOURS',
            realEstateProject: { id: projetFavori.realEstateProject.id }
        })
            .pipe(
                catchError(err1 => {
                    console.log("Error from first call: ");
                    return throwError(() => err1);
                }),
                switchMap((response: ProjetFavori[]) => {

                    console.log("+-+- search projet favoris", response);

                    if (response && response.length > 0) {
                        return this.deleteProjetFavori(projetFavori)
                            .pipe(
                                catchError(err2 => {
                                    console.log("Error from second call: ");
                                    return throwError(() => err2);
                                })
                            );
                    } else {
                        return of(false);
                    }
                }));
    }

    /**
     * Search projets favoris with given query
     *
     * @param projetFavori
     */
    searchProjetsFavoris(projetFavori: ProjetFavori): Observable<ProjetFavori[]> {

        return this.searchProjetsFavorisQuery(projetFavori)
            .pipe(
                catchError(err1 => {
                    console.log("Error from first call: ");
                    return throwError(() => err1);
                }),
                tap((projetsFavoris: ProjetFavori[]) => {

                    // Sort the projets favoris by the dateCreation field by default
                    projetsFavoris.sort((a, b) => +a.dateCreation - +b.dateCreation);

                    for (let i = 0; i < projetsFavoris?.length; i++) {
                        // projetsFavoris[i].realEstateProject.medias = this.images[i % 5];
                        // projetsFavoris[i].realEstateProject.promoter.logoPath = this.logos[i % 5];
                        this.fillReferentielLabels(projetsFavoris[i].realEstateProject, projetsFavoris[i]);
                    }

                    this._projetsFavoris.next(projetsFavoris);
                })
            );
    }

    /**
     * Search projets favoris with given query
     *
     * @param projetFavori
     */
    private searchProjetsFavorisQuery(projetFavori: ProjetFavori): Observable<ProjetFavori[]> {

        return this._httpClient.post<ProjetFavori[]>('api/real-estate-projects/favoris/searchLastSix', projetFavori)
            .pipe(
                map((projetsFavoris: ProjetFavori[]) => {

                    return projetsFavoris;
                })
            );
    }

    /**
     * get count projets favoris
     *
     * @param email
     */
    getCountProjetFavoris(email: string): Observable<number> {
        return this._httpClient.post<number>('api/real-estate-projects/favoris/count', { userEmail: email })
            .pipe(
                map((response: number) => response)
            );
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Create a projet favori
     *
     * @param projetFavori
     */
    private createProjetFavori(projetFavori: ProjetFavori): Observable<ProjetFavori> {
        return this._httpClient.post<ProjetFavori>('api/real-estate-projects/favoris', projetFavori)
            .pipe(
                map((newProjetFavori: ProjetFavori) => {

                    // Return a new observable with the response
                    return newProjetFavori
                })
            );
    }

    /**
     * Delete a projet favori
     *
     * @param projetFavori
     */
    private deleteProjetFavori(projetFavori: ProjetFavori): Observable<boolean> {
        return this._httpClient.delete<ProjetFavori>(`api/real-estate-projects/favoris/${projetFavori.id}`)
            .pipe(
                map(response => {

                    // Return a new observable with the response
                    return true;
                })
            );;
    }

    private fillReferentielLabels(projet: Projet, projetFavori: ProjetFavori) {
        if (projetFavori != undefined && projetFavori != null) {
            projet.estFavoris = true;
            projet.projetFavorisId = projetFavori.id;
        } else {
            projet.estFavoris = false;
            projet.projetFavorisId = undefined;
        }
        projet.prixMinStr = this._fuseUtilsService.numberFormat(projet.prixMin, 2, '.', ' ');
        projet.prixMaxStr = this._fuseUtilsService.numberFormat(projet.prixMax, 2, '.', ' ');
        projet.devise = "MAD";
        projet.description = projet.description?.replace(/\\r\\n/g, "\n");
        projet.descriptionSmall =
            projet?.description != undefined && projet?.description != null ?
                projet?.description.length > 70 ? projet?.description.substring(0, 70) + '...' : projet?.description
                : "";

        let villes: Ville[] = JSON.parse(localStorage.getItem('villes'));
        let typesBiens: TypeBien[] = JSON.parse(localStorage.getItem('typesBiens'));
        let quartiers: Quartier[] = JSON.parse(localStorage.getItem('quartiers'));
        projet.libelleVille = villes?.find(e => e.codeVille == projet.codeVille)?.description;
        projet.libelleTypeBien = typesBiens?.find(e => e.code == projet.codeTypeBien)?.libelle;
        projet.libelleQuartier = quartiers?.find(e => e.code == projet.codeQuartier)?.libelle;
    }

}
