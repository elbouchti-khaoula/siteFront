import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Projet } from '../../common/projets.types';
import { ProjetsService } from '../../common/projets.service';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';

@Component({
    selector: 'projets',
    templateUrl: './projets.component.html',
    styleUrls: ['./projets.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ProjetsComponent implements OnInit, OnDestroy {
    drawerMainOpened: boolean = true;
    drawerMainMode: 'over' | 'side' = 'side';

    drawerChildOpened: boolean = false;
    drawerChildComponent: 'contact' | 'projet-info';

    projets$: Observable<Projet[]>;
    projets: Projet[];

    projetsCount: number = 0;

    filteredProjets: Projet[];
    selectedProjet: Projet;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _projetsService: ProjetsService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseMediaWatcherService: FuseMediaWatcherService
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Get the projets
        this.projets$ = this._projetsService.projets$;
        this._projetsService.projets$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((projets: Projet[]) => {
                this.projets = this.filteredProjets = projets;

                // Update the counts
                this.projetsCount = projets.length;

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

    /**
     * Select projet
     *
     * @param projet
     */
    selectProjet(projet: Projet): void {
        this.selectedProjet = projet;

        // Close the drawer on 'over' mode
        // if (this.drawerMode === 'over') {
        //     this.drawer.close();
        // }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Filter the projets
     *
     * @param query
     */
    // filterProjets(query: string): void {
    //     // Reset the filter
    //     if (!query) {
    //         this.filteredProjets = this.projets;
    //         return;
    //     }

    //     this.filteredProjets = this.projets.filter(projet => projet.contact.name.toLowerCase().includes(query.toLowerCase()));
    // }

    toggleMain(): void
    {
        if ( this.drawerMainOpened )
        {
            this.drawerMainOpened = false;
        }
        else
        {
            this.drawerMainOpened = true;
        }
    }

    /**
     * Open the profile sidebar
     */
    openContact(): void {
        this.drawerChildComponent = 'contact';
        this.drawerChildOpened = true;

        // Mark for check
        this._changeDetectorRef.markForCheck();
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
