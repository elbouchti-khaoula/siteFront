import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ProjetsService } from 'app/core/services/projets/projets.service';
import { Projet } from 'app/core/services/projets/projets.types';
import { MatDrawer } from '@angular/material/sidenav';
import { ReferentielService } from 'app/core/services/referentiel/referentiel.service';
import { Agence, Ville } from 'app/core/services/referentiel/referentiel.types';

@Component({
    selector: 'localisation',
    templateUrl: './localisation.component.html',
    encapsulation: ViewEncapsulation.None
})
export class LocalisationComponent implements OnInit, OnDestroy {

    @Input() parentComponent: 'agences' | 'projets';
    @Input() drawer: MatDrawer;

    center: google.maps.LatLngLiteral = {
        lat: 31.791702, // 33.55,
        lng: -7.092620 // -7.6
    };
    zoom = 5.5;

    mapOptions: google.maps.MapOptions = {
        center: this.center,
        zoom: this.zoom,
        // gestureHandling: "none",
        disableDefaultUI: true,
    }
    markerOptions: google.maps.MarkerOptions = {
        draggable: false
    };
    markerPositions: google.maps.LatLngLiteral[] = [];

    private _unsubscribeAll: Subject<any> = new Subject<any>();
    // display: any;
    // moveMap(event: google.maps.MapMouseEvent) {
    //     if (event.latLng != null) this.center = (event.latLng.toJSON());
    // }
    // move(event: google.maps.MapMouseEvent) {
    //     if (event.latLng != null) this.display = event.latLng.toJSON();
    // }

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _projetsService: ProjetsService,
        private _referentielService: ReferentielService
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        // Subscribe to ville changes
        this._referentielService.ville$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((response: Ville) => {

                if (response) {
                    this.mapOptions = {
                        ...this.mapOptions,
                        center: new google.maps.LatLng(response.gpsLatitude, response.gpsLongitude).toJSON(),
                        zoom: 10
                    }
                } else {
                    this.mapOptions = {
                        ...this.mapOptions,
                        center: this.center,
                        zoom: this.zoom,
                    }
                }

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        if (this.parentComponent === 'projets') {
            // Get the projets
            this._projetsService.projets$
                .pipe(takeUntil(this._unsubscribeAll))
                .subscribe((response: Projet[]) => {

                    this.markerPositions = [];
                    if (response && response.length > 0) {
                        for (const project of response) {
                            this.markerPositions.push(new google.maps.LatLng(project.gpsLatitude, project.gpsLongitude).toJSON());
                        }
                    }

                    // Mark for check
                    this._changeDetectorRef.markForCheck();
                });
        } else {
            // Get the agences
            this._referentielService.agences$
                .pipe(takeUntil(this._unsubscribeAll))
                .subscribe((response: Agence[]) => {

                    this.markerPositions = [];
                    if (response && response.length > 0) {
                        for (const agence of response) {
                            this.markerPositions.push(new google.maps.LatLng(agence.gpsLatitude, agence.gpsLongitude).toJSON());
                        }
                    }

                    // Mark for check
                    this._changeDetectorRef.markForCheck();
                });
        }
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
