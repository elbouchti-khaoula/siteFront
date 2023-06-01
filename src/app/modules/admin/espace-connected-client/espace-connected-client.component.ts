import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { SimulationDetailleeService } from 'app/core/projects/projects.service';
import { RecordsInProgressService } from 'app/core/records-in-progress/records-in-progress.service';
import { Subject, takeUntil } from 'rxjs';


@Component({
    selector        : 'espace-connected-client',
    templateUrl     : './espace-connected-client.component.html',
    styleUrls       : ['./espace-connected-client.component.scss'],
    encapsulation   : ViewEncapsulation.None,
    animations      : fuseAnimations
})
export class EspaceConnectedClientComponent implements OnInit, OnDestroy
{

        // get count credit
        countCredit: number;
        countSimulation: number;

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
        private _recordsInProgressService: RecordsInProgressService,
        private _simulationService: SimulationDetailleeService,



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

            // get count mes credit
             const email = 'firstname.lastname@gmail.com';
             const cin = '640891'; 

                this._recordsInProgressService.getCountCreditByEmailAndCin(email,cin).subscribe(
                count => {
                    this.countCredit = count;
                },
                error => {
                    console.log('Une erreur s\'est produite lors de la récupération du nombre de crédits : ', error);
                }
                );

                const email2 = 'firstname.lastname@gmail.com';
                const cin2 = '640891'; 
               /* this._simulationService.getCountSimulation(email2,cin2).subscribe(
                    count => {
                        this.countSimulation = count;
                    },
                    error => {
                        console.log('Une erreur s\'est produite lors de la récupération du nombre de crédits : ', error);
                    }
                    );*/


          


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
    scrollToElement(el: HTMLElement) {
        el.scrollIntoView();
    }

    panelOpenState = false;



  





}
