import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { filter, map, Observable, Subject, takeUntil } from 'rxjs';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { NavigationEnd, Router } from '@angular/router';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { Projet } from 'app/core/projets/projets.types';
import { ProjetsService } from 'app/core/projets/projets.service';

@Component({
    selector: 'projets-result',
    templateUrl: './projets-result.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ProjetsResultComponent implements
    OnInit,
    OnDestroy,
    AfterViewInit
{

    drawerMainOpened: boolean = true;
    drawerMainMode: 'over' | 'side' = 'side';

    drawerChildOpened: boolean = false;
    drawerChildComponent: 'contact' | 'projet-info';

    projets$: Observable<Projet[]>;
    projets: Projet[];
    projetsCount: number = 0;
    filteredProjets: Projet[];
    selectedProjet: Projet;

    private previousUrl: string;
    @ViewChild('projectsList', { read: CdkScrollable }) public projectsList: CdkScrollable;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _projetsService: ProjetsService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _router: Router
    ) {
        this._router.events
            .pipe(
                takeUntil(this._unsubscribeAll),
                filter((event): event is NavigationEnd => event instanceof NavigationEnd),
                map(event => this.refineURL(event.url) === 'projets-search')
            )
            .subscribe((_ev: any) => {
                this.previousUrl = this._router.getCurrentNavigation()?.previousNavigation?.initialUrl?.toString();
                // console.log("+-+- previousUrl", this.previousUrl);
                // const refineUrl = this.refineURL(this.previousUrl);
                // if (refineUrl.localeCompare("projets-search") === 0) {
                //     console.log("+-+-+- here 2 ev.url === this.previousUrl", 'projets-search', refineUrl, this.previousUrl);
                // } else {
                //     console.log("+-+-+- here 3 ev.url != this.previousUrl", 'projets-search', refineUrl, this.previousUrl);
                // }
            });
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
        // Get the projets
        this.projets$ = this._projetsService.projets$;

        this._projetsService.projets$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((response: Projet[]) => {

                this.projets = this.filteredProjets = response;

                // Update the counts
                this.projetsCount = response?.length;

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
     * After view init
     */
    ngAfterViewInit() {
        if (this.projets && this.projets.length > 0) {
            if ("projet-details".localeCompare(this.refineURL(this.previousUrl)) === 0) {
                const resultPosition = Number(localStorage.getItem('projetsPosition'));
                this.projectsList.getElementRef().nativeElement.scrollTop = resultPosition;
                // console.log("+-+-- resultPosition projet-details", topval);
            } else {
                localStorage.setItem('projetsPosition', "0");
                this.projectsList.getElementRef().nativeElement.scrollTop = 0;
                // console.log("+-+-- resultPosition other");
            }

            this.projectsList.elementScrolled()
                .subscribe((_scrolled: Event) => {
                    const resultPosition = this.projectsList.getElementRef().nativeElement.scrollTop;
                    // console.log('+-+-+- resultPosition', resultPosition);
                    localStorage.setItem('projetsPosition', resultPosition.toString());
                });
        }
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
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

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
    openContact(projet: Projet): void {
        this.selectedProjet = projet;

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
