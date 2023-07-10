import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { Subject, takeUntil } from 'rxjs';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { Router } from '@angular/router';

@Component({
    selector: 'landing1',
    templateUrl: './landing1.component.html',
    styleUrls: ['./landing1.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})

export class Landing1Component implements OnInit {

    montantValue: number = null;
    dureeValue: number = null;
    tauxValue: number = null;

    opened: boolean = true;
    isScreenSmall: boolean;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    @ViewChild('simulationId', { read: ElementRef }) public simulationId: ElementRef<any>;

    /**
     * Constructor
     */
    constructor(
        private _router: Router,
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
        // Subscribe to media changes
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({ matchingAliases }) => {

                // Check if the screen is small
                this.isScreenSmall = !matchingAliases.includes('md');
            });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    scrollToSimulation() {
        this.simulationId.nativeElement.scrollIntoView({ behavior: "smooth" });
    }

    /**
     * Toggle the panel
     */
    toggle(): void
    {
        if ( this.opened )
        {
            this.opened = false;
        }
        else
        {
            this.opened = true;
        }
    }

    /**
     * Perform the search and navigate
     */
    navigateToSimulationPersonnalisee(): void {
        // Add query params using the router
        this._router.navigate(
            ['/simulation-personnalisee'],
            {
                queryParams: { montant: this.montantValue, duree: this.dureeValue }
            }
        );
    }

}
