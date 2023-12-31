import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'espace-connected-client',
    templateUrl: './espace-connected-client.component.html',
    styleUrls: ['./espace-connected-client.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class EspaceConnectedClientComponent implements OnInit, OnDestroy {

    countSimulation: number;
    countProjetFavoris: number;
    countDemandesCredits: number;
    countCredit: number;
    countDemandesSAV: number;
    panelOpenState = false;

    imageSrc = 'assets/images/pages/nous-connaitre/Icon 1_2.svg';
    imageSrc2 = 'assets/images/pages/nous-connaitre/Icon 2.svg';
    imageSrc3 = 'assets/images/pages/nous-connaitre/Icon 3.svg';

    isXsScreen: boolean;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _activatedRoute: ActivatedRoute
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    /**
     * On init
     */
    ngOnInit(): void {
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({ matchingAliases }) => {

                // Check if the screen is xsSmall
                this.isXsScreen = !matchingAliases.includes('sm');
            });

        // et count mes projets favoris
        this.countProjetFavoris = this._activatedRoute.snapshot.data.countProjetFavoris;
        // get count mes credit en cours
        this.countCredit = this._activatedRoute.snapshot.data.countCredit;
        // get count mes simulations
        this.countSimulation = this._activatedRoute.snapshot.data.countSimulation;
        // get count mes demandes credits
        this.countDemandesCredits = this._activatedRoute.snapshot.data.countDemandesCredits;
        // get count mes demandes SAV
        this.countDemandesSAV = this._activatedRoute.snapshot.data.countDemandesSAV;
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

}
