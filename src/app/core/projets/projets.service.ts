import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, of, switchMap, take, tap, throwError } from 'rxjs';
import { Projet, ProjetFavori } from './projets.types';
import { Quartier, TypeBien, Ville } from 'app/core/referentiel/referentiel.types';

@Injectable({
    providedIn: 'root'
})
export class ProjetsService
{
    // Private
    private _projet: BehaviorSubject<Projet | null> = new BehaviorSubject(null);
    private _projets: BehaviorSubject<Projet[] | null> = new BehaviorSubject(null);
    // private _projetFavori: BehaviorSubject<ProjetFavori | null> = new BehaviorSubject(null);
    private _projetsFavoris: BehaviorSubject<ProjetFavori[] | null> = new BehaviorSubject(null);

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

    /**
     * Getter for projet favori
     */
    // get projetFavori$(): Observable<ProjetFavori>
    // {
    //     return this._projetFavori.asObservable();
    // }

    /**
     * Getter for projets favoris
     */
    get projetsFavoris$(): Observable<ProjetFavori[]>
    {
        return this._projetsFavoris.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Search projets with given query
     *
     * @param queryParams
     */
    searchProjets(queryParams: { codeVille?: string; codeQuartier?: string; codeTypeBien?: string; prixMin?: number; prixMax?: number }): Observable<Projet[]>
    {
        // const httpOptions = {
        //     headers: { 'Content-Type': 'application/json' },
        //     params: { ...queryParams}
        // };
        // return this._httpClient.get<Projet[]>('api/projets/search', httpOptions);
        // return this._httpClient.get<Projet[]>('api/projets/search', { params: queryParams }
        
        return this._httpClient.post<Projet[]>('api/real-estate-projects/search', queryParams)
            .pipe(
                tap((projets: Projet[]) => {

                    // Sort the projets by the name field by default
                    projets.sort((a, b) => a.nom.localeCompare(b.nom));

                    let images = [
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

                    let logos = [
                        'assets/images/pages/marketplace/projet1/promoteur.png',
                        'assets/images/pages/marketplace/projet2/promoteur.jpeg',
                        'assets/images/pages/marketplace/projet3/promoteur.png',
                        'assets/images/pages/marketplace/projet4/promoteur.png',
                        'assets/images/pages/marketplace/projet5/promoteur.png'
                    ];

                    let villes: Ville[] = JSON.parse(localStorage.getItem('villes'));
                    let typesBiens: TypeBien[] = JSON.parse(localStorage.getItem('typesBiens'));
                    let quartiers: Quartier[] = JSON.parse(localStorage.getItem('quartiers'));

                    for (let i = 0; i < projets?.length; i++) {
                        projets[i].images = images[i % 5];
                        projets[i].promoter.logoPath = logos[i % 5];
                        this.fillReferentielLabels(projets[i], villes, typesBiens, quartiers);
                    }

                    this._projets.next(projets);
                })
            );
    }

    /**
     * Get projet by id
     */
    getProjetById(id: number): Observable<Projet>
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

                if (!projet) {
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
    // getProjetById(id: number): Observable<any>
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
    //                 return throwError('Could not found project with id of ' + id + '!');
    //             }

    //             return of(response);
    //         })
    //     );
    // }

    /**
     * Create a projet favori
     *
     * @param projetFavori
     */
    addProjetFavori(projetFavori: ProjetFavori): Observable<ProjetFavori> {
        return this.searchProjetsFavoris({
            userName: projetFavori.userName,
            userEmail: projetFavori.userEmail,
            statutFavorite: 'ENCOURS',
            realEstateProject: { id: projetFavori.realEstateProject.id }
        })
            .pipe(
                catchError(err1 => {
                    // console.log("Error from first call: ", err1);
                    return throwError(err1);
                }),
                switchMap((response: ProjetFavori[]) => {
                    if (response && response.length > 0) {
                        return of(null);
                    } else {
                        return this.createProjetFavori(projetFavori)
                            .pipe(
                                catchError(err2 => {
                                    // console.log("Error from second call: ", err2);
                                    return throwError(err2);
                                })
                            );
                    }
                }));
    }

    /**
     * Search projets favoris with given query
     *
     * @param queryParams
     */
    searchProjetsFavoris(projetFavori: ProjetFavori): Observable<ProjetFavori[]> {

        return this._httpClient.post<ProjetFavori[]>('api/real-estate-projects/favoris/search', projetFavori)
            .pipe(
                tap((projetsFavoris: ProjetFavori[]) => {

                    // Sort the projets by the dateCreation field by default
                    projetsFavoris.sort((a, b) => +a.dateCreation - +b.dateCreation);

                    let images = [
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

                    let logos = [
                        'assets/images/pages/marketplace/projet1/promoteur.png',
                        'assets/images/pages/marketplace/projet2/promoteur.jpeg',
                        'assets/images/pages/marketplace/projet3/promoteur.png',
                        'assets/images/pages/marketplace/projet4/promoteur.png',
                        'assets/images/pages/marketplace/projet5/promoteur.png'
                    ];

                    let villes: Ville[] = JSON.parse(localStorage.getItem('villes'));
                    let typesBiens: TypeBien[] = JSON.parse(localStorage.getItem('typesBiens'));
                    let quartiers: Quartier[] = JSON.parse(localStorage.getItem('quartiers'));

                    for (let i = 0; i < projetsFavoris?.length; i++) {
                        projetsFavoris[i].realEstateProject.images = images[i % 5];
                        projetsFavoris[i].realEstateProject.promoter.logoPath = logos[i % 5];
                        this.fillReferentielLabels(projetsFavoris[i].realEstateProject, villes, typesBiens, quartiers);
                    }

                    this._projetsFavoris.next(projetsFavoris);
                })
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

    private fillReferentielLabels(projet: Projet, villes, typesBiens, quartiers) {
        projet.descriptionSmall = projet?.description ? projet?.description.substring(0, 90) + '...' : "";
        // projet.libelleVille = villes?.length > 0 ? villes.find(e => e.codeVille == projet.codeVille)?.description : "";
        // projet.libelleTypeBien = typesBiens?.length > 0 ? typesBiens.find(e => e.code == projet.codeTypeBien)?.libelle : "";
        // projet.libelleQuartier = quartiers?.length > 0 ? quartiers.find(e => e.code == projet.codeQuartier)?.libelle : "";
        projet.libelleVille = villes?.find(e => e.codeVille == projet.codeVille)?.description;
        projet.libelleTypeBien = typesBiens?.find(e => e.code == projet.codeTypeBien)?.libelle;
        projet.libelleQuartier = quartiers?.find(e => e.code == projet.codeQuartier)?.libelle;
    }

}
