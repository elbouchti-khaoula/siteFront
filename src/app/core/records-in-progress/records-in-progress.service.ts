import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { CreditEnCours, DemandeCredit, TypeDocument } from './records-in-progress.types';
import { saveAs } from "file-saver";

@Injectable({
    providedIn: 'root'
})
export class RecordsInProgressService {

    // Private
    private _demandesCredit: BehaviorSubject<DemandeCredit[] | null> = new BehaviorSubject(null);
    private _creditsEnCours: BehaviorSubject<CreditEnCours[] | null> = new BehaviorSubject(null);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for demandes de crédit
     */
    get demandesCredit$(): Observable<DemandeCredit[]> {
        return this._demandesCredit.asObservable();
    }

    /**
     * Getter for crédits en cours
     */
    get creditsEnCours$(): Observable<CreditEnCours[]> {
        return this._creditsEnCours.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Get demande de crédit
     */
    getDemandesCredit(cin: string, email: string): Observable<DemandeCredit[]> {

        return this._httpClient.post<DemandeCredit[]>('api/records-in-progress/demandes/search', { origin: "SITE", cin: cin, mail: email })
            .pipe(
                tap((response: DemandeCredit[]) => {

                    this._demandesCredit.next(response);
                })
            );
    }

    /**
     * Get Crédits en cours
     */
    getCreditsEnCours(cin: string, email: string): Observable<CreditEnCours[]> {

        return this._httpClient.post<CreditEnCours[]>('api/records-in-progress/credits/search', { origin: "SITE", cin: cin, mail: email })
            .pipe(
                tap((response: CreditEnCours[]) => {

                    this._creditsEnCours.next(response);
                })
            );
    }

    downloadDocument(dossierId: number, typeDocument: TypeDocument) {
        let fileName: string = "";
        let code: string;
        switch (typeDocument) {
            case TypeDocument.TableauAmortissement:
                code = '0WFSTABL';
                fileName = "Tableau-amortissement.pdf";
                break;
            case TypeDocument.ArreteSituation:
                code = '0WFIARRSIT';
                fileName = "Arrête-situation.pdf";
                break;
            case TypeDocument.AttestationInteret:
                code = '0WFSFICHE';
                fileName = "Attestation-intérêt.pdf";
                break;
            case TypeDocument.MainLevee:
                code = 'MLV ';
                fileName = "Main-levée.pdf";
                break;
        }

        this._httpClient.post('api/records-in-progress/document', { origin: "SITE", dossier: dossierId, type: code }, { responseType: 'blob' })
            .subscribe((blob: any) => {
                // console.log("+-+- blob", blob);
                if (blob) {
                    saveAs(blob, fileName);
                }
            });
    }

    /**
     * count mes demandes de credits
     *
     * @param cin
     */
    getCountCreditByEmailAndCin(cin: string): Observable<number> {
        return this._httpClient.post<number>('api/records-in-progress/credits/count', { origin: "SITE", cin: cin, mail: "" })
            .pipe(
                map((response: number) => response)
            );
    }

    /**
     * count mes credits
     *
     * @param cin
     */
    getCountDemandesCredits(cin: string): Observable<number> {
        return this._httpClient.post<number>('api/records-in-progress/demandes/count', { origin: "SITE", cin: cin, mail: "" })
            .pipe(
                map((response: number) => response)
            );
    }

}
