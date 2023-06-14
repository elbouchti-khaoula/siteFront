import { Component, ElementRef, HostListener, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { Subject, takeUntil } from 'rxjs';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';

@Component({
    selector: 'landing3',
    templateUrl: './landing3.component.html',
    styleUrls: ['./landing3.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})

export class Landing3Component implements OnInit {
    isScreenSmall: boolean;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    @ViewChild('simulationId', { read: ElementRef }) public simulationId: ElementRef<any>;

    // // Declare height and width variables
    // scrHeight: any;
    // scrWidth: any;
    // @HostListener('window:resize', ['$event'])
    // getScreenSize(event?) {
    //     this.scrHeight = window.innerHeight;
    //     this.scrWidth = window.innerWidth;
    //     console.log("+-+-+- this.scrHeight, this.scrWidth", this.scrHeight, this.scrWidth);
    // }

    /**
     * Constructor
     */
    constructor(
        private _fuseMediaWatcherService: FuseMediaWatcherService
    )
    {
        // this.getScreenSize();
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
