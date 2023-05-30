import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Piece } from './upload-document.types';

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
    uploadPiecesReclamation(piece: Piece): Observable<any> {
        return this._httpClient.post('api/upload/grc', piece, { responseType: 'text' });
    }

    /**
     * upload piece jointe demande de crédit
     */
    uploadPiecesDemandesCredit(piece: Piece): Observable<any> {
        return this._httpClient.post('api/upload/wfdoc', piece, { responseType: 'text' });
    }

}
