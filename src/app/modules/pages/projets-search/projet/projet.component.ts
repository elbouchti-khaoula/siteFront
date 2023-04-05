import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ProjetsService } from 'app/core/projets/projets.service';
import { Projet } from 'app/core/projets/projets.types';
import { fuseAnimations } from '@fuse/animations';
import { Location } from "@angular/common";
import { cloneDeep } from 'lodash-es';
import { MatDialog } from '@angular/material/dialog';
import { FaitesVousRappelerComponent } from './faites-vous-rappeler/faites-vous-rappeler.component';

import { SwiperComponent } from "swiper/angular";
//import Swiper core and required modules
import SwiperCore, { Autoplay, EffectCoverflow, Pagination, Navigation } from "swiper";
//install Swiper modules
SwiperCore.use([Autoplay, EffectCoverflow, Pagination, Navigation]);

@Component({
    selector: 'projet',
    templateUrl: './projet.component.html',
    styleUrls: ['./projet.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ProjetComponent implements OnInit, OnDestroy {

    projet: Projet;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    pagination = {
        clickable: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '">' + '<i></i>' + '<b></b>' + "</span>";
        },
    };

    mapOptions: google.maps.MapOptions = {
        center: {
            lat: 32,
            lng: -7
        },
        zoom: 13,
        // gestureHandling: "none",
        disableDefaultUI: true,
    }
    markerOptions: google.maps.MarkerOptions = {
        draggable: false
    };
    markerPositions: google.maps.LatLngLiteral[] = [];

    /**
     * Constructor
     */
    constructor(
        private _location: Location,
        private _projetsService: ProjetsService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _matDialog: MatDialog
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Selected projet
        this._projetsService.projet$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((response: Projet) => {
                this.projet = response;

                this.markerPositions.push(new google.maps.LatLng(response.gpsLatitude, response.gpsLongitude).toJSON());
                this.mapOptions.center = new google.maps.LatLng(response.gpsLatitude, response.gpsLongitude).toJSON();

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

    goBack(): void {
        this._location.back();
    }

    /**
     * Open the note dialog
     */
    openFaitesVousRappelerDialog(): void
    {
        this._matDialog.open(FaitesVousRappelerComponent, {
            autoFocus: false,
            data     : {
                projet: cloneDeep(this.projet)
            }
        });
    }
    
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
