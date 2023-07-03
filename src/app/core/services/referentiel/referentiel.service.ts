import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, of, switchMap, take, tap, throwError } from 'rxjs';
import { CategorieSocioProfessionnelle, Ville, Quartier, TypeBien, Nationalite, ObjetFinancement, Agence, EnvoiMail, OperationSAVRef, DocumentInstitutionnel, OperationSAVDocument } from './referentiel.types';
import { saveAs } from "file-saver";
import { Reclamation } from 'app/modules/pages/reclamation/reclamation.types';

export const CSP_PRIVE = "SALA"
export const CSP_PUBLIC = "FONC"

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
    private _operationsSAVRef: BehaviorSubject<OperationSAVRef[] | null> = new BehaviorSubject(null);
    private _operationSAVDocuments: BehaviorSubject<OperationSAVDocument[] | null> = new BehaviorSubject(null);
    private _documents: BehaviorSubject<DocumentInstitutionnel[] | null> = new BehaviorSubject(null);

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

    /**
     * Getter for operationsSAVRef
     */
    get operationsSAVRef$(): Observable<OperationSAVRef[]> {
        return this._operationsSAVRef.asObservable();
    }

    /**
     * Getter for operationsSAVDocuments
     */
    get operationSAVDocuments$(): Observable<OperationSAVDocument[]> {
        return this._operationSAVDocuments.asObservable();
    }

    /**
     * Getter for documents
     */
    get documents$(): Observable<DocumentInstitutionnel[]> {
        return this._documents.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Get categories socio-professionnelle
     */
    getCategories(): Observable<CategorieSocioProfessionnelle[]> {
        return this._httpClient.get<CategorieSocioProfessionnelle[]>('api/repositories/categories-socio-professionelles')
            .pipe(
                tap((response: CategorieSocioProfessionnelle[]) => {
                    // Sort the Catégories Socio-Professionnelle by the libelle field by default
                    response.sort((a, b) => a.libelle.localeCompare(b.libelle));

                    localStorage.setItem('categoriesSocioProfessionnelle', JSON.stringify(response));

                    this._categoriesSocioProf.next(response);
                })
            );
    }

    /**
     * Get nationalités
     */
    getNationalites(): Observable<Nationalite[]> {
        return this._httpClient.get<Nationalite[]>('api/repositories/nationalites')
            .pipe(
                tap((response: Nationalite[]) => {
                    // Sort the Nationalités by the libelle field by default
                    response.sort((a, b) => a.libelle.localeCompare(b.libelle));

                    localStorage.setItem('nationalites', JSON.stringify(response));

                    this._nationalites.next(response);
                })
            );
    }

    /**
     * Get objets de financement
     */
    getObjetsFinancement(): Observable<ObjetFinancement[]> {
        return this._httpClient.get<ObjetFinancement[]>('api/repositories/objets-financement')
            .pipe(
                tap((response: ObjetFinancement[]) => {
                    // Sort the ObjetsFinancement by the libelle field by default
                    response.sort((a, b) => a.libelle.localeCompare(b.libelle));

                    localStorage.setItem('objetsFinancement', JSON.stringify(response));

                    this._objetsFinancement.next(response);
                })
            );
    }

    /**
     * Get villes
     */
    getVilles(): Observable<Ville[]> {
        return this._httpClient.get<Ville[]>('api/repositories/villes')
            .pipe(
                tap((response: Ville[]) => {
                    // Sort the villes by the description field by default
                    response.sort((a, b) => a.description.localeCompare(b.description));

                    response.some((item, idx) =>
                        item.description == 'CASABLANCA' &&
                        response.unshift(
                            // remove the found item, in-place (by index with splice), 
                            // returns an array of a single item removed
                            response.splice(idx, 1)[0]
                        )
                    )

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
    getTypesBiens(): Observable<TypeBien[]> {
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
    getAgences(): Observable<Agence[]> {
        return this._httpClient.get<Agence[]>('api/repositories/agences')
            .pipe(
                tap((response: Agence[]) => {
                    // Sort the agences by the nom field by default
                    response.sort((a, b) => a.nom.localeCompare(b.nom));

                    let villes: Ville[] = JSON.parse(localStorage.getItem('villes'));
                    for (let i = 0; i < response?.length; i++) {
                        response[i].libelleVille = villes?.length > 0 ? villes.find((e) => e.codeVille == response[i].codeVille)?.description : "";
                    }

                    localStorage.setItem('agences', JSON.stringify(response));

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
                    return throwError(() => 'Could not found agence with id of ' + id + '!');
                }

                return of(agence);
            })
        );
    }

    /**
     * Get Opérations SAV réferentiel
     */
    getOperationsSAVRef(): Observable<OperationSAVRef[]> {
        return this._httpClient.get<OperationSAVRef[]>('api/repositories/operations')
            .pipe(
                tap((response: OperationSAVRef[]) => {
                    // Sort the opérations SAV ref by the nom field by default
                    response.sort((a, b) => a.nomOperation.localeCompare(b.nomOperation));

                    localStorage.setItem('operationSAVref', JSON.stringify(response));

                    this._operationsSAVRef.next(response);
                })
            );
    }

    /**
     * Get Opérations SAV documents
     */
    getOperationSAVDocuments(operationId: number): Observable<OperationSAVDocument[]> {
        return this._httpClient.get<OperationSAVDocument[]>(`api/repositories/operation/documents/${operationId}`)
            .pipe(
                tap((response: OperationSAVDocument[]) => {
                    // Sort the opérationSAV documents by the libelle field by default
                    response.sort((a, b) => a.libelle.localeCompare(b.libelle));

                    this._operationSAVDocuments.next(response);
                })
            );
    }

    /**
     * send mail accusé réception of reclamation
     */
    sendMailReclamation(reclamationCree: Reclamation): Observable<EnvoiMail> {
        return this.sendMail(this.getMessage(reclamationCree));
    }

    /**
     * send mail
     */
    sendMail(envoiMail: EnvoiMail): Observable<EnvoiMail> {

        console.log("+-+- enter envoiMail", envoiMail);

        return this._httpClient.post<EnvoiMail>('api/repositories/mail', envoiMail)
            .pipe(
                map((envoiMailRes: EnvoiMail) => {

                    return envoiMailRes;
                })
            );
    }

    /**
    * Search documents institutionnels with given query
    *
    * @param document
    */
    searchDocuments(document: DocumentInstitutionnel): Observable<DocumentInstitutionnel[]> {

        return this._httpClient.post<DocumentInstitutionnel[]>('api/repositories/documents/search', document)
            .pipe(
                tap((documents: DocumentInstitutionnel[]) => {

                    // Sort the documents institutionneles by the dateCreation field by default
                    //documents.sort((a, b) => +a.dateCreation - +b.dateCreation);

                    // Sort the agences by the libelle field by default
                    documents.sort((a, b) => a.nom.localeCompare(b.nom));

                    this._documents.next(documents);
                })
            );
    }

    downloadPDF(id: number, fileName: String) {
        this._httpClient.get('api/repositories/document/' + id, { responseType: 'blob' })
            .subscribe((blob: any) => {
                // const blob = new Blob([response.body], { type: 'application/pdf' });
                // const filename = 'Demande Client Financier.pdf';
                saveAs(blob, fileName);
            });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------
    private getMessage(reclamation: Reclamation) {
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

