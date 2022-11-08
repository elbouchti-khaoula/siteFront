import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { fuseAnimations } from '@fuse/animations';
import { ViewportScroller } from '@angular/common';

@Component({
    selector: 'landing',
    templateUrl: './landing.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})

export class LandingComponent implements OnInit {
    searchForm: UntypedFormGroup;
    isOpened = false;

    /**
     * Constructor
     */
    constructor(
        private _formBuilder: UntypedFormBuilder,
        private matIconRegistry: MatIconRegistry,
        private domSanitizer: DomSanitizer,
        private viewScroller: ViewportScroller
    ) {
        this.matIconRegistry.addSvgIcon(
            "property",
            this.domSanitizer.bypassSecurityTrustResourceUrl("assets/iconswi/PROPERTY.svg")
        );
        this.matIconRegistry.addSvgIcon(
            "calculation",
            this.domSanitizer.bypassSecurityTrustResourceUrl("assets/iconswi/CALCULATION.svg")
        );
        this.matIconRegistry.addSvgIcon(
            "survey",
            this.domSanitizer.bypassSecurityTrustResourceUrl("assets/iconswi/SURVEY.svg")
        );
        this.matIconRegistry.addSvgIcon(
            "agentc",
            this.domSanitizer.bypassSecurityTrustResourceUrl("assets/iconswi/AGENT.svg")
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
            ville: [''],
            quartier: [''],
            typeBien: [''],
            prixMin: [''],
            prixMax: ['']
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    scrollTo(tag: string) {
        this.viewScroller.scrollToAnchor(tag);
    }

}
