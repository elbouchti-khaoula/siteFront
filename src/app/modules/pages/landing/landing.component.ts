import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, UntypedFormBuilder, UntypedFormGroup, ValidationErrors } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { ViewportScroller } from '@angular/common';
import { NavigationExtras, Router } from '@angular/router';

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
        private _viewScroller: ViewportScroller,
        private _router: Router
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
        this.searchForm = this._formBuilder.group(
            {
                ville: [null],
                quartier: [null],
                typeBien: [null],
                prixMin: [null],
                prixMax: [null]
            },
            { validators: this.atLeastOneValue }
        );
    }

    atLeastOneValue(form: FormGroup): ValidationErrors {
        return Object.keys(form.value).some(key => !!form.value[key]) ?
            null :
            { atLeastOneValue: '* Veuillez saisir au moins un critère' };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    scrollTo(tag: string) {
        this._viewScroller.scrollToAnchor(tag);
    }

    /**
     * Reset the search form using the default
     */
    reset(): void {
        this.searchForm.reset();
    }

    /**
     * Perform the search
     */
    navigateToMarketPlace(): void {
        if (!(this.searchForm.pristine || this.searchForm.invalid)) {
            // Add query params using the router
            this._router.navigate(
                ['/projetsSearch'],
                { queryParams: this.searchForm.value }
            );
        }
    }

    // navigateToMarketPlace() {
    //     const navigationExtras: NavigationExtras = { state: { ville: 'ville1' } };
    //     this._router.navigate(['/projetsSearch'], navigationExtras);
    // }

}
