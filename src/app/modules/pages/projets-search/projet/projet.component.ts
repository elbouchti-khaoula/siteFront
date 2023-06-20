import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ProjetsService } from 'app/core/services/projets/projets.service';
import { Projet, ProjetFavori } from 'app/core/services/projets/projets.types';
import { fuseAnimations } from '@fuse/animations';
import { Location } from "@angular/common";
import { cloneDeep } from 'lodash-es';
import { MatDialog } from '@angular/material/dialog';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { User } from 'app/core/user/user.types';
import { AuthenticationService } from 'app/core/auth/authentication.service';
import { Router } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { NousRappelerPopupComponent } from './nous-rappeler-popup/nous-rappeler-popup.component';
import { ContactPromoteurPopupComponent } from './contact-promoteur-popup/contact-promoteur-popup.component';

// import { SwiperComponent } from "swiper/angular";
// import Swiper core and required modules
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

    pagination = {
        clickable: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '">' + '<i></i>' + '<b></b>' + "</span>";
        },
    };

    user: User;
    projet: Projet;
    existeVideo : boolean;
    existeMaquetteOrPlan : boolean;
    existeBrochure : boolean;
    iframeSrc: SafeUrl;

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

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _location: Location,
        private _router: Router,
        private _projetsService: ProjetsService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _matDialog: MatDialog,
        private _fuseConfirmationService: FuseConfirmationService,
        private _authenticationService: AuthenticationService,
        private sanitizer: DomSanitizer
    )
    {
        let id = 'OQL6KiB10bA';
        let suffix = `?controls=0&autoplay=1&mute=1&loop=1&modestbranding=1&fs=0&rel=0&showinfo=0&disablekb=1&playlist=${id}`;
        let url = `https://www.youtube.com/embed/${id}`;
        this.iframeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(url + suffix);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.user = this._authenticationService.connectedUser;

        // Selected projet
        this._projetsService.projet$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((response: Projet) => {
                this.projet = response;

                this.markerPositions.push(new google.maps.LatLng(response.gpsLatitude, response.gpsLongitude).toJSON());
                this.mapOptions.center = new google.maps.LatLng(response.gpsLatitude, response.gpsLongitude).toJSON();

                // this.existeVideo = true;
                this.existeVideo = response?.medias?.some(e => e.type === "VIDEO");
                this.existeMaquetteOrPlan = response?.medias?.some(e => e.type == "MAQUETTE" || e.type == "PLAN");
                this.existeBrochure = response?.medias?.some(e => e.type == "BROCHURE");

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

    ajouterAuxFavoris() {

        if (!this.user) {
            this._router.navigate(['sign-in'], { queryParams: { redirectURL: this._router.url } });
        } else {
            const projetFavori: ProjetFavori = {
                userName: this.user.username,
                userEmail: this.user.email,
                statutFavorite: 'ENCOURS',
                realEstateProject: { id: this.projet.id },
                dateCreation: new Date()
            }

            this._projetsService.addProjetFavori(projetFavori)
                .subscribe((response: ProjetFavori) => {
                    if (response === null) {
                        // Open the dialog
                        this._fuseConfirmationService.open(
                            {
                                "title": "Projet favori",
                                "message": "Le projet favori existe déjà",
                                "icon": {
                                    "show": true,
                                    "name": "heroicons_outline:information-circle",
                                    "color": "warn"
                                },
                                "actions": {
                                    "confirm": {
                                        "show": true,
                                        "label": "Ok",
                                        "color": "warn"
                                    },
                                    "cancel": {
                                        "show": false,
                                        "label": "Cancel"
                                    }
                                },
                                "dismissible": false
                            }
                        );
                    } else {
                        this.projet.estFavoris = true;

                        // Open the dialog
                        this._fuseConfirmationService.open(
                            {
                                "title": "Projet favori",
                                "message": "Le projet est ajouté aux favoris avec succès",
                                "icon": {
                                    "show": true,
                                    "name": "heroicons_outline:check-circle",
                                    "color": "success"
                                },
                                "actions": {
                                    "confirm": {
                                        "show": true,
                                        "label": "Ok",
                                        "color": "primary"
                                    },
                                    "cancel": {
                                        "show": false,
                                        "label": "Cancel"
                                    }
                                },
                                "dismissible": false
                            }
                        );
                    }
                });
        }
    }

    /**
     * Open the dialog
     */
    openFaitesVousRappelerDialog(): void
    {
        this._matDialog.open(NousRappelerPopupComponent, {
            autoFocus: false,
            data: {
                projet: cloneDeep(this.projet)
            }
        });
    }

    /**
     * Open the dialog
     */
    openContacterPromoteurDialog(): void
    {
        this._matDialog.open(ContactPromoteurPopupComponent, {
            autoFocus: false,
            data: {
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
    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }
}
