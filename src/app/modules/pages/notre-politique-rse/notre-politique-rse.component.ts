import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation, HostListener } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { ReferentielService } from 'app/core/services/referentiel/referentiel.service';
import { DocumentInstitutionnel } from 'app/core/services/referentiel/referentiel.types';
import { Subject, takeUntil } from 'rxjs';
import { saveAs } from "file-saver";
import { HttpClient } from '@angular/common/http';

// import { SwiperOptions } from 'swiper';
import SwiperCore, { Autoplay, EffectCoverflow, Pagination, Navigation } from "swiper";
SwiperCore.use([Autoplay, EffectCoverflow, Pagination, Navigation]);

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
    isMobile: boolean;

    @HostListener('window:resize', ['$event'])
    onResize(event) {
      this.isMobile = window.innerWidth < 768;
    }
    /**
    * Constructor
    */
    constructor(
        private _httpClient: HttpClient,
        private _changeDetectorRef: ChangeDetectorRef,
        private _referentielService: ReferentielService) {
    }
    
    pagination = {
        clickable: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '">' + '<i></i>' + '<b></b>' + "</span>";
        },
    };
    public slides = [
        {
            image: 'assets/images/pages/rse/rse-niv1/Affiche1.png',
            altText: 'Affiche 1'
        },
        {
            image: 'assets/images/pages/rse/rse-niv1/Affiche2.png',
            altText: 'Affiche 2'
        },
        {
            image: 'assets/images/pages/rse/rse-niv1/Affiche3.png',
            altText: 'Affiche 3'
        },
        {
            image: 'assets/images/pages/rse/rse-niv1/Affiche1.png',
            altText: 'Affiche 4'
        },
        {
            image: 'assets/images/pages/rse/rse-niv1/Affiche2.png',
            altText: 'Affiche 5'
        },
        {
            image: 'assets/images/pages/rse/rse-niv1/Affiche3.png',
            altText: 'Affiche 6'
        },
        {
            image: 'assets/images/pages/rse/rse-niv1/Affiche1.png',
            altText: 'Affiche 7'
        },
        {
            image: 'assets/images/pages/rse/rse-niv1/Affiche2.png',
            altText: 'Affiche 8'
        },
        {
            image: 'assets/images/pages/rse/rse-niv1/Affiche3.png',
            altText: 'Affiche 9'
        },

    ];

    ngOnInit(): void {
        this.isMobile = window.innerWidth < 768; // Définit isMobile en fonction de la largeur de l'écran au chargement de la page
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

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }
}
