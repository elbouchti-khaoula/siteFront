import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Params } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { Subject, takeUntil } from 'rxjs';
import { ReferentielService } from 'app/core/referentiel/referentiel.service';
import { Ville } from 'app/core/referentiel/referentiel.types';

@Component({
    selector: 'agences',
    templateUrl: './agences.component.html',
    styleUrls: ['./agences.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class AgencesComponent implements OnInit, OnDestroy {

    isScreenSmall: boolean;
    searchForm: UntypedFormGroup;
    queryParams: Params;
    villes: Ville[];

    @ViewChild('agencesResult', { read: ElementRef }) public agencesResult: ElementRef<any>;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _referentielService: ReferentielService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _formBuilder: UntypedFormBuilder
    ) 
    {
    }

    refineURL(currURL: string): string {
        // Get the URL between what's after '/' and before '?' 
        // 1- get URL after'/'
        var afterDomain = currURL?.substring(currURL.lastIndexOf('/') + 1);
        // 2- get the part before '?'
        var beforeQueryString = afterDomain?.split("?")[0];

        return beforeQueryString;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Prepare the search form with defaults
        this.searchForm = this._formBuilder.group(
            {
                codeVille: [null]
            }
        );

        // Get the villes
        this._referentielService.villes$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((response: Ville[]) => {

                // Update the villes
                this.villes = response;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Subscribe to media changes
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({ matchingAliases }) => {

                // Check if the screen is small
                this.isScreenSmall = !matchingAliases.includes('md');

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
     * reset form
     */
    reset(): void {
        this.searchForm.reset();
        this._referentielService.getAgences().subscribe(() => {

            this.agencesResult.nativeElement.scrollIntoView({ behavior: "smooth" });
        });
    }

    /**
     * Perform the search
     */
    search(): void {
        this._referentielService.getAgencesByVille(this.searchForm.get('codeVille').value)
            .subscribe(() => {

                this.agencesResult.nativeElement.scrollIntoView({ behavior: "smooth" });

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
    }

}
