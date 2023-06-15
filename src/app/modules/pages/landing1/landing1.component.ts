import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { Subject, takeUntil } from 'rxjs';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';

@Component({
    selector: 'landing1',
    templateUrl: './landing1.component.html',
    styleUrls: ['./landing1.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})

export class Landing1Component implements OnInit {
    isScreenSmall: boolean;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    @ViewChild('simulationId', { read: ElementRef }) public simulationId: ElementRef<any>;

    /**
     * Constructor
     */
    constructor(
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

}
