import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { fuseAnimations } from '@fuse/animations';
import { ReferentielService } from 'app/core/referentiel/referentiel.service';
import { DocumentInstitutionnel } from 'app/core/referentiel/referentiel.types';
import { Subject, takeUntil } from 'rxjs';
import { saveAs } from "file-saver";
import { HttpClient} from '@angular/common/http';

@Component({
    selector: 'notre-politique-rse',
    templateUrl: './notre-politique-rse.component.html',
    styleUrls: ['./notre-politique-rse.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class NotrePolitiqueRseComponent implements OnInit, OnDestroy {
    isScreenSmall: boolean;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    chartes: DocumentInstitutionnel[];

    /**
    * Constructor
    */
    constructor(
        private _httpClient: HttpClient,
        private _changeDetectorRef: ChangeDetectorRef,
        private _referentielService: ReferentielService) {
    }

    ngOnInit(): void {
        this._referentielService.documents$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((response: DocumentInstitutionnel[]) => {

                this.chartes = response;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
    }

    /**
    * On destroy
    */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

  
    telecharger() {
        this._httpClient.get('/assets/file/Charte RSE. VF.pdf', { responseType: 'blob' })
            .subscribe((blob: any) => {
                saveAs(blob, "charte.pdf");
       });
    }

}
