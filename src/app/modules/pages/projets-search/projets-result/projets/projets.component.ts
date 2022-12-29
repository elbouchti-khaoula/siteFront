import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { filter, map, Observable, Subject, takeUntil } from 'rxjs';
import { Projet } from '../../common/projets.types';
import { ProjetsService } from '../../common/projets.service';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { MatDrawerContainer } from '@angular/material/sidenav';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
    selector: 'projets',
    templateUrl: './projets.component.html',
    styleUrls: ['./projets.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ProjetsComponent implements
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
    private fragment: string;

    @ViewChild('drawerContainerProjets') drawerContainerProjets: MatDrawerContainer;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _projetsService: ProjetsService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _router: Router,
        private _route: ActivatedRoute
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
        // Get the URL between what's after '/' and befor '?' 
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
        this._route.fragment
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(fragment => {
                this.fragment = fragment;
            });

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

    ngAfterViewInit() {
        setTimeout(() => {
            try {
                document.querySelector('#' + this.fragment).scrollIntoView();
            } catch (e) {
            }
        });

        if ("projet-details".localeCompare(this.refineURL(this.previousUrl)) === 0) {
            const topval = Number(localStorage.getItem('projetsPosition'));
            this.drawerContainerProjets.scrollable.getElementRef().nativeElement.scrollTop = topval;
            // console.log("+-+-- topval projet-details", topval);
        } else {
            // console.log("+-+-- topval other");
            localStorage.setItem('projetsPosition', "0");
            this.drawerContainerProjets.scrollable.getElementRef().nativeElement.scrollTop = 0;
        }

        this.drawerContainerProjets.scrollable.elementScrolled()
            .subscribe((_scrolled: Event) => {
                const pos = this.drawerContainerProjets.scrollable.getElementRef().nativeElement.scrollTop;
                // console.log('+-+-+- pos', pos);
                localStorage.setItem('projetsPosition', pos.toString());
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
