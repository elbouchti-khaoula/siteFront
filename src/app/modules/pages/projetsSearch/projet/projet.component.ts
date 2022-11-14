import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ProjetsService } from '../common/projets.service';
import { Subject, takeUntil } from 'rxjs';
import { Projet } from '../common/projets.types';

import { SwiperComponent } from "swiper/angular";
//import Swiper core and required modules
import SwiperCore, { Autoplay, EffectCoverflow, Pagination, Navigation, SwiperOptions } from "swiper";
//install Swiper modules
SwiperCore.use([Autoplay, EffectCoverflow, Pagination, Navigation]);

@Component({
    selector: 'projet',
    templateUrl: './projet.component.html',
    styleUrls: ['./projet.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjetComponent implements OnInit {

    projet: Projet;
    // public swiperConfig: SwiperOptions = {};
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    pagination = {
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '">' + '<i></i>' + '<b></b>' + "</span>";
        },
      };

    /**
     * Constructor
     */
    constructor(
        private _projetsService: ProjetsService,
        private _changeDetectorRef: ChangeDetectorRef,
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        // swiper config, which we pass to the HTML
        // this.swiperConfig = {
        //     // loop: true,
        //     // slidesPerView: 1,
        //     // autoHeight: true,
        //     // autoplay: {
        //     //     delay: 3000,//animation과 시간 맞춰줘야함,
        //     //     disableOnInteraction: false,
        //     // },
        //     // effect: 'fade',
        //     // fadeEffect: {
        //     //     crossFade: true
        //     // },
        //     pagination: {
        //         // el: '.swiper-pagination',
        //         clickable: true,
        //         //   renderBullet: function (index, className) {
        //         //     // Create a pagination element
        //         //     return '<div class="' + className + '">' +
        //         //       '<div class="products-preview__inner">' +
        //         //       '<img src="'+ slidesArr[index]['pagination']['icon'] +'" alt="" class="products-preview__icon">' +
        //         //       '<div class="products-preview__name">'+ slidesArr[index]['pagination']['name'] +'</div>' +
        //         //       '<div class="products-preview__txt">'+ slidesArr[index]['pagination']['text'] +'</div>' +
        //         //       '</div>' +
        //         //       '</div>';
        //         //   },
        //         renderBullet: function (index, className) {
        //             return '<span class="' + className + '">' + '<i></i>' + '<b></b>'  + '</span>';
        //         },
        //     }
        // };



        // Selected projet
        this._projetsService.projet$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((projet: Projet) => {
                this.projet = projet;

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

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }
}
