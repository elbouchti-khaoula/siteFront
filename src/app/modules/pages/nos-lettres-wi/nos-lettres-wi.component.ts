import { ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { fuseAnimations } from '@fuse/animations';
import { Subject, takeUntil } from 'rxjs';
import { DocumentInstitutionnel } from 'app/core/referentiel/referentiel.types';
import { ReferentielService } from 'app/core/referentiel/referentiel.service';


@Component({
    selector     : 'nos-lettres-wi',
    templateUrl  : './nos-lettres-wi.component.html',
    styleUrls       : ['./nos-lettres-wi.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class NosLettresWiComponent
{
    

    private _unsubscribeAll: Subject<any> = new Subject<any>();
    lettres: DocumentInstitutionnel[];

    
    /**
     * Constructor
     */
    constructor(

        private _changeDetectorRef: ChangeDetectorRef,
        private _referentielService: ReferentielService)
        
    
    {

  

    }



    ngOnInit(): void {
        this._referentielService.documents$
                .pipe(takeUntil(this._unsubscribeAll))
                .subscribe((response: DocumentInstitutionnel[]) => {
    
                    this.lettres = response;
    
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
    


      telechargerLettre(id:number) {
        this._referentielService.downloadPDF(id);
    
    }

    
}
