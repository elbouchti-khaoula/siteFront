import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { Motif, Reclamation } from './reclamation.types';
import { ReferentielService } from 'app/core/referentiel/referentiel.service';
import { EnvoiMail } from 'app/core/referentiel/referentiel.types';

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
                    console.log("Error from first call: ");
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
                                    console.log("Error from second call: ");
                                    return throwError(() => err2);
                                }),
                                switchMap((statutCree: any) => {

                                    if (statutCree != null) {

                                        return this._referentielService.sendMail(this.getMessage(reclamationCree))
                                            .pipe(
                                                catchError(err3 => {
                                                    console.log("Error from third call: ");
                                                    return throwError(() => err3);
                                                }),
                                                switchMap((response: EnvoiMail) => {
                                                    return of(reclamationCree);
                                                })
                                            );
                                    }
                                })
                            );
                    }
                    return of(reclamationCree);
                })
            );
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------
    getMessage(reclamation: Reclamation) {
        var envoiMail: EnvoiMail;

        if (reclamation.type === "Reclamation") {
            var body: string = "Bonjour,\n\n";
            body += "Nous vous informons que nous avons bien reçu la réclamation détaillée ci-dessous le "
                + reclamation.dateReception;
            body += "\n Nous vous promettons de vous revenir dès que le nécessaire sera fait.";
            body += "<fieldset>"
                + "<legend><h2>Données sur le Réclamant</h2></legend>"
                + "<p>" + "  <b>Nom du réclamant :</b>"
                + "  <span>  " + (reclamation.nom == null ? "NC" : reclamation.nom) + "</span>"
                + "  </p>"
                + "   <p>"
                + "   <b>Prénom du réclamant :</b>"
                + "   <span>" + (reclamation.prenom == null ? "NC" : reclamation.prenom) + "</span></p>"
                + "    <p><b>CIN : </b><span>" + (reclamation.cin == null ? "NC" : reclamation.cin) + " </span></p>"
                + "</fieldset>"

                + "<fieldset>"
                + "<legend><h2>Coordonnées</h2></legend>"
                + "<p><b>E-mail:</b>" + (reclamation.email == null ? "NC" : reclamation.email) + "  </p>"
                + "   <p><b>Téléphone Portable: </b> " + (reclamation.telephone == null ? " NC" : reclamation.telephone) + "</p>"
                // + "<p><b>Téléphone Domicile: </b> " + (reclamation.getPhoneDom() == null ? " NC" : reclamation.getPhoneDom()) + "</p>"
                // + "<p><b>Téléphone Bureau:</b>  " + (reclamation.getPhoneBureau() == null ? " NC" : reclamation.getPhoneBureau()) + "</p>"
                // + "<p><b>Aupe Téléphone:</b>  " + (reclamation.getAutrePhone() == null ? " NC" : reclamation.getAutrePhone()) + "</p>   "
                // + "     <p><b>Ville:</b> " + (reclamation.getCity() == null ? "NC" : reclamation.getCity()) + "</p>"
                // + " <p><b>Adresse de Résidence:</b> " + (reclamation.getAddress() == null ? " NC" : reclamation.getAddress()) + "</p> "
                // + "<p><b>Adresse de Correspondance:</b>  "
                // + (reclamation.getPostalAddress() == null ? "NC" : reclamation.getPostalAddress()) + " </p>" 
                // + " <p><b>Fax:</b><b>" + (reclamation.getFax() == null ? "NC" : reclamation.getFax()) + " </p>   " 
                // + " <p><b>Moyen de Communication: </b> " + reclamation.getChoix() + "</p>" 
                + "</fieldset>"

                + "<fieldset>"
                + "<legend><h2>Données de la Réclamation: </h2></legend>"
                + "<p><b>Identifiant de la réclamation: </b>" + (reclamation.id == null ? "NC" : reclamation.id) + "   </p> "
                // + "  <p><b>N° de Dossier: </b>" + (reclamation.numeroDossier == null ? " NC" : reclamation.numeroDossier) + " </p>" 
                // + "  <p><b>ID Projet: </b> " + (reclamation.projetId == null ? "NC" : reclamation.projetId) + " </p>"
                + "<p><b>Date de Reception: </b> " + reclamation.dateReception + "</p>"
                + "<p><b>Motif de la réclamation : </b> " + reclamation.motifLibelle + "</p>"
                + " <p><b>Canal de Réception: </b> " + reclamation.canal + "</p>"
                + " <p><b>Description: </b> " + (reclamation.text == null ? " NC" : reclamation.text) + "</p>"
                + " <p><b>initiateur : </b> " + reclamation.initiateur + "</p>"
                + "   <p><b>Statut: </b> " + reclamation.statut + "</p>  "
                + "</fieldset>";

            envoiMail = {
                type: "Réclamation",
                destination: reclamation.email,
                // cc : "k.qasmi@wafaimmobilier.co.ma,M.SAADI@wafaimmobilier.co.ma",
                titre: "Reclamation n°: " + reclamation.id + " - Motif: " + reclamation.motifLibelle,
                message: body
            }

        } else if (reclamation.type === "AlerteEthique") {
            var body: string = "Bonjour,\n\n";
            body += reclamation.text;

            envoiMail = {
                type: "Alerte éthique",
                destination: reclamation.email,
                titre: "Alerte éthique",
                message: body
            }
        }
        return envoiMail;
    }

}
