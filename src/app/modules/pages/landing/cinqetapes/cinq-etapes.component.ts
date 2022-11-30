import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector       : 'cinq-etapes',
    templateUrl    : './cinq-etapes.component.html',
    encapsulation  : ViewEncapsulation.None,
    animations     : fuseAnimations
})
export class CinqEtapesComponent implements OnInit, OnDestroy
{

    isXsScreen: boolean;
    animationsEnabled: boolean = false;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    
    /**
     * Constructor
     */
    constructor(private _fuseMediaWatcherService: FuseMediaWatcherService)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
     ngOnInit(): void
     {
         // Subscribe to media changes
         this._fuseMediaWatcherService.onMediaChange$
             .pipe(takeUntil(this._unsubscribeAll))
             .subscribe(({matchingAliases}) => {
 
                 // Check if the screen is small
                 this.isXsScreen = !matchingAliases.includes('sm');
             });
     }
 
     /**
      * On destroy
      */
     ngOnDestroy(): void
     {
         // Unsubscribe from all subscriptions
         this._unsubscribeAll.next(null);
         this._unsubscribeAll.complete();
     }
 
     // -----------------------------------------------------------------------------------------------------
     // @ Public methods
     // -----------------------------------------------------------------------------------------------------

    onAppear() {
        this.animationsEnabled = true;
    }

    onDisappear() {
        this.animationsEnabled = false;
    }

}
