import { Component, OnInit, ViewEncapsulation, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSliderChange } from '@angular/material/slider';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { gsap } from "gsap";
import { fuseAnimations } from '@fuse/animations';

@Component({
    selector        : 'landing',
    templateUrl     : './landing.component.html',
    styleUrls       : ['./landing.component.scss'],
    encapsulation   : ViewEncapsulation.None,
    animations      : fuseAnimations
})

export class LandingComponent implements OnInit {
    @ViewChild('landingWrapper', { read: ElementRef }) public landingWrapper: ElementRef<any>;
    @ViewChild('landingInnerContent', { read: ElementRef }) public landingInnerContent: ElementRef<any>;
    
    searchForm: FormGroup;
    isOpened = false;
    montantValue: number = 0;
    dureeValue: number = 1;
    tauxValue: number = 1;
    mensualite: string = "0";

    /**
     * Constructor
     */
    constructor(
        private _formBuilder: FormBuilder,
        private matIconRegistry: MatIconRegistry,
        private domSanitizer: DomSanitizer
    ) {
        this.matIconRegistry.addSvgIcon(
            "property",
            this.domSanitizer.bypassSecurityTrustResourceUrl("assets/images/landing/PROPERTY.svg")
        );
        this.matIconRegistry.addSvgIcon(
            "calculation",
            this.domSanitizer.bypassSecurityTrustResourceUrl("assets/images/landing/CALCULATION.svg")
        );
        this.matIconRegistry.addSvgIcon(
            "survey",
            this.domSanitizer.bypassSecurityTrustResourceUrl("assets/images/landing/SURVEY.svg")
        );
        this.matIconRegistry.addSvgIcon(
            "agentc",
            this.domSanitizer.bypassSecurityTrustResourceUrl("assets/images/landing/AGENT.svg")
        );
    }

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
            typeLogement: null,
            superficie: null,
            chambres: null
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    public onMouseMove(event: MouseEvent) {
        let dimension = this.landingWrapper.nativeElement.getBoundingClientRect();
        if (event.clientX > dimension.width / 2) {
            gsap.to(this.landingWrapper.nativeElement, {duration: 2, scrollLeft:"+=700px", ease: "power2.easeOut" });
        } else {
            gsap.to(this.landingWrapper.nativeElement, {duration: 2, scrollLeft:"-=700px", ease: "power2.easeOut" });
        }
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

    simulateur() {
        var montant = this.montantValue;
        var duree = this.dureeValue * 12
        var taux = this.tauxValue / 100;
        var m = (montant * (taux / 12)) / (1 - Math.pow((1 + (taux / 12)), -duree));
        return (Math.round(m * 100) / 100).toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
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

}
