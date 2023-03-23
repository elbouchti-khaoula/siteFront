import { CdkScrollable } from '@angular/cdk/scrolling';
import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ReferentielService } from '../../common/referentiel.service';
import { Agence } from '../../common/referentiel.types';

@Component({
    selector: 'agences-result',
    templateUrl: './agences-result.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class AgencesResultComponent implements OnInit, OnDestroy {

    drawerMainOpened: boolean = true;
    drawerMainMode: 'over' | 'side' = 'side';
    agences$: Observable<Agence[]>;
    agences: Agence[];
    agencesCount: number = 0;
    filteredAgences: Agence[];
    selectedAgence: Agence;

    @ViewChild('agencesList', { read: CdkScrollable }) public agencesList: CdkScrollable;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _referentielService: ReferentielService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseMediaWatcherService: FuseMediaWatcherService
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Get the agences
        this.agences$ = this._referentielService.agences$;
        this._referentielService.agences$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((response: Agence[]) => {

                this.agences = this.filteredAgences = response;

                // Update the counts
                this.agencesCount = response?.length;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Subscribe to media changes
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({ matchingAliases }) => {

                // Set the drawerMode if the given breakpoint is active
                if (matchingAliases.includes('lg')) {
                    this.drawerMainMode = 'side';
                    this.drawerMainOpened = true;
                }
                else {
                    this.drawerMainMode = 'over';
                    this.drawerMainOpened = false;
                }

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
     * Select agence
     *
     * @param agence
     */
    selectAgence(agence: Agence): void {
        this.selectedAgence = agence;
    }

    toggleMain(): void {
        if (this.drawerMainOpened) {
            this.drawerMainOpened = false;
        }
        else {
            this.drawerMainOpened = true;
        }
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
