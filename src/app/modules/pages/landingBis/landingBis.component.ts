import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatSliderChange } from '@angular/material/slider';
import { fuseAnimations } from '@fuse/animations';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { Subject, takeUntil } from 'rxjs';
// import { formatNumber } from '@angular/common';
// import { BehaviorSubject } from 'rxjs'
// import { default as routerAnimations} from '../../../route-animations';

// import { SwiperComponent } from "swiper/angular";
// // import Swiper core and required modules
// import SwiperCore, { Autoplay, Pagination } from "swiper";
// // install Swiper modules
// SwiperCore.use([Autoplay, Pagination]);

@Component({
    selector        : 'landingBis',
    templateUrl     : './landingBis.component.html',
    styleUrls       : ['./landingBis.component.scss'],
    encapsulation   : ViewEncapsulation.None,
    // animations      : [routerAnimations('routeAnimations')],
    animations      : fuseAnimations
})
export class LandingBisComponent implements OnInit, OnDestroy
{
    searchForm: UntypedFormGroup;
    isOpened = false;
    montantValue: number = 0;
    dureeValue: number = 1;
    tauxValue: number = 1;
    mensualite: number = 0;
    dateApp = new Date();

    animationsEnabled: boolean = false;

    hasAppeared1: boolean = false;
    hasAppeared2: boolean = false;

    // @ViewChild('mushroom') box: ElementRef;

    // private slideSubject = new BehaviorSubject<number>(0);
    // readonly slideValue$ = this.slideSubject.asObservable();
    // updateSliderValue(event: MatSliderChange) {
    //     this.slideSubject.next(event.value);
    // }

    isXsScreen: boolean;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _formBuilder: UntypedFormBuilder,
        private _fuseMediaWatcherService: FuseMediaWatcherService
    ) {
    }

    // @HostBinding('@routeAnimations')
    // public animatePage = true;

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    /**
     * On init
     */
    ngOnInit(): void {
        // Create the form
        this.searchForm = this._formBuilder.group({
            region: null,
            ville: null,
            quartier: null,
            typeBien: null,
            prixMin: null,
            prixMax: null
        });
        this.simulateur();

        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({ matchingAliases }) => {

                // Check if the screen is xsSmall
                this.isXsScreen = !matchingAliases.includes('sm');
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

    get getDocDir(): string {
        return document.dir;
    }

    // get getHtmlDir(): string {
    //     return document.getElementsByTagName("html")[0].getAttribute("dir");
    // }

    // get getLocale(): string {
    //     return this._translocoLocaleService.getLocale();
    // }

    // -----------------------------------------------------------------------------------------------------
    // @ simulation
    // -----------------------------------------------------------------------------------------------------
    onAppear1() {
        this.hasAppeared1 = true;
        // console.log("I have appeared! 1");   // This is a good idea for debugging
    }
    onDisappear1() {
        this.hasAppeared1 = false;
    }

    onAppear2() {
        this.hasAppeared2 = true;
    }
    onDisappear2() {
        this.hasAppeared2 = false;
    }

    simulateur() {
        var montant = this.montantValue;
        var duree = this.dureeValue * 12
        var taux = this.tauxValue / 100;
        var m = (montant * (taux / 12)) / (1 - Math.pow((1 + (taux / 12)), -duree));
        return (Math.round(m * 100) / 100);
        // return (Math.round(m * 100) / 100).toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        // return formatNumber((Math.round(m * 100) / 100), 'en-US', '1.2-2');
    }

    updateMontant(event: MatSliderChange) {
        this.montantValue = event.value;
        this.mensualite = this.simulateur();
    }

    updateDuree(event: MatSliderChange) {
        this.dureeValue = event.value;
        this.mensualite = this.simulateur();
    }

    updateTaux(event: MatSliderChange) {
        this.tauxValue = event.value;
        this.mensualite = this.simulateur();
    }

    formatLabelMontant(value: number): string {
        return `  ${value} Dhs  `;
    }

    formatLabelDuree(value: number) {
        return `  ${value} ans  `;
    }

    formatLabelTaux(value: number) {
        return `  ${value} %  `;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ cinq étapes
    // -----------------------------------------------------------------------------------------------------
    // solution 1
    animateBottom(el: HTMLElement) {
        el.style.animation = `anim-bottom 1s ${el.dataset.delay} forwards ease-out`;
    }

    animateTop(el: HTMLElement) {
        el.style.animation = `anim-top 1s ${el.dataset.delay} forwards ease-out`;
    }

    animateNone(el: HTMLElement) {
        el.style.animation = 'none';
    }

    // solution 2
    onAppear() {
        this.animationsEnabled = true;
    }

    onDisappear() {
        this.animationsEnabled = false;
    }

}
