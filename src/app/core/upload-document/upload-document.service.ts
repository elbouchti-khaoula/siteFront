import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { PayloadUpload, Piece } from './upload-document.types';

@Injectable({
    providedIn: 'root'
})
export class UploadDocumentService {
    // Private
    private _piecesJointes: BehaviorSubject<Piece[] | null> = new BehaviorSubject(null);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for pièces jointes
     */
    get piecesJointes$(): Observable<Piece[]> {
        return this._piecesJointes.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * upload piece jointe reclamation
     */
    uploadPiecesReclamation(piece: Piece): Observable<PayloadUpload> {
        // return this._httpClient.post('api/upload/grc', piece, { responseType: 'text' });

        return this._httpClient.post<PayloadUpload>('api/upload/grc', piece)
            .pipe(
                map((response: PayloadUpload) => {

                    // Return a new observable with the response
                    return response;
                })
            );
    }

    /**
     * upload piece jointe demande de crédit
     */
    uploadPiecesDemandesCredit(piece: Piece): Observable<PayloadUpload> {
        return this._httpClient.post<PayloadUpload>('api/upload/wfdoc', piece)
            .pipe(
                map((response: PayloadUpload) => {

                    // Return a new observable with the response
                    return response;
                })
            );
    }

}
