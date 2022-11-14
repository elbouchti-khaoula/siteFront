import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
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
        private viewScroller: ViewportScroller
    ) {
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
