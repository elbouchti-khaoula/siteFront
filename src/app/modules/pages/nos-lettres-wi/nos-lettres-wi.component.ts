import { ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { Subject, takeUntil } from 'rxjs';
import { DocumentInstitutionnel } from 'app/core/services/referentiel/referentiel.types';
import { ReferentielService } from 'app/core/services/referentiel/referentiel.service';


@Component({
    selector     : 'nos-lettres-wi',
    templateUrl  : './nos-lettres-wi.component.html',
    styleUrls       : ['./nos-lettres-wi.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class NosLettresWiComponent
{
    isScreenSmall: boolean;


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
    


      telechargerLettre(id:number,fileName:String ) {

        fileName="LettreWafaImmobilier"+id+".pdf";
        this._referentielService.downloadPDF(id,fileName);
    
    }

    
}
