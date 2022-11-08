import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Projet } from '../../common/projets.types';
import { ProjetsService } from '../../common/projets.service';

@Component({
    selector: 'projets',
    templateUrl: './projets.component.html',
    styleUrls: ['./projets.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjetsComponent implements OnInit, OnDestroy 
{
    drawerOpened: boolean = false;

    projets: Projet[];
    filteredProjets: Projet[];
    selectedProjet: Projet;

    projets$: Observable<Projet[]>;
    projetsCount: number = 0;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _projetsService: ProjetsService,
        private _changeDetectorRef: ChangeDetectorRef,
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Projets
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

        // Profile
        // this._projetService.profile$
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe((profile: Profile) => {
        //         this.profile = profile;

        //         // Mark for check
        //         this._changeDetectorRef.markForCheck();
        //     });

        // Selected projet
        // this._projetsService.projet$
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe((projet: Projet) => {
        //         this.selectedProjet = projet;

        //         // Mark for check
        //         this._changeDetectorRef.markForCheck();
        //     });
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

    /**
     * Open the new projet sidebar
     */
    // openNewProjet(): void
    // {
    //     this.drawerComponent = 'new-projet';
    //     this.drawerOpened = true;

    //     // Mark for check
    //     this._changeDetectorRef.markForCheck();
    // }

    /**
     * Open the profile sidebar
     */
    // openProfile(): void
    // {
    //     this.drawerComponent = 'profile';
    //     this.drawerOpened = true;

    //     // Mark for check
    //     this._changeDetectorRef.markForCheck();
    // }

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
