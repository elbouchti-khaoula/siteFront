import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, of, switchMap, take, tap, throwError } from 'rxjs';
import { CategorieSocioProfessionnelle, Ville, Quartier, TypeBien, Nationalite, ObjetFinancement, Agence, EnvoiMail, OperationSAVRef, DocumentInstitutionnel, OperationSAVDocument } from './referentiel.types';
import { saveAs } from "file-saver";

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
    sendMail(envoiMail: EnvoiMail): Observable<EnvoiMail> {

        console.log("+-+- enter envoiMail", envoiMail);

        return this._httpClient.post<EnvoiMail>('api/repositories/mail', envoiMail)
            .pipe(
                map((envoiMailRes: EnvoiMail) => {

                    // Return a new observable with the response
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

        return this._httpClient.post<DocumentInstitutionnel[]>('/api/repositories/documents/search', document)
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
        this._httpClient.get('/api/repositories/document/' + id, { responseType: 'blob' })
            .subscribe((blob: any) => {
                // const blob = new Blob([response.body], { type: 'application/pdf' });
                // const filename = 'Demande Client Financier.pdf';
                saveAs(blob, fileName);
            });
    }

}

