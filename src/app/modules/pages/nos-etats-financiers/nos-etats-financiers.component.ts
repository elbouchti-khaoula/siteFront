import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { fuseAnimations } from '@fuse/animations';
import { DocumentInstitutionnel } from 'app/core/referentiel/referentiel.types';
import { Subject, takeUntil } from 'rxjs';
import { ReferentielService } from 'app/core/referentiel/referentiel.service';
import {saveAs} from "file-saver";

@Component({
    selector     : 'nos-etats-financiers',
    templateUrl  : './nos-etats-financiers.component.html',
    styleUrls       : ['./nos-etats-financiers.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class NosEtatsFinanciersComponent  implements OnInit, OnDestroy 
{
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    etatsFinanciers: DocumentInstitutionnel[];

    /**
     * Constructor
     */
    constructor(

      
        private _changeDetectorRef: ChangeDetectorRef,
        private _referentielService: ReferentielService)
    {
    }


    // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  ngOnInit(): void {
    this._referentielService.documents$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((response: DocumentInstitutionnel[]) => {

                this.etatsFinanciers = response;

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

  telecharger(id:number) {
    this._referentielService.downloadPDF(id);






}

    

    
}
