import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { OperationSAVRef } from 'app/core/referentiel/referentiel.types';
import { ReferentielService } from 'app/core/referentiel/referentiel.service';
import { NavigationExtras, Router } from '@angular/router';
import { CreditEnCours } from 'app/core/records-in-progress/records-in-progress.types';

@Component({
    selector: 'operations-sav-ref',
    templateUrl: './operations-sav-ref.component.html',
    encapsulation: ViewEncapsulation.None
})
export class OperationsSAVRefComponent implements OnInit, OnDestroy {
    isScreenSmall: boolean;
    operationsSAVRef: OperationSAVRef[] = [];
    dossierCredit: CreditEnCours;

    // Private
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _router: Router,
        @Inject(MAT_DIALOG_DATA) private _data: { dossierCredit: CreditEnCours },
        public matDialogRef: MatDialogRef<OperationsSAVRefComponent>,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _referentielService: ReferentielService
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

        if (this._data.dossierCredit) {
            this.dossierCredit = this._data.dossierCredit;
        }

        this._referentielService.operationsSAVRef$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((response: OperationSAVRef[]) => {

                this.operationsSAVRef = response;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Subscribe to media changes
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({ matchingAliases }) => {

                // Check if the screen is small
                this.isScreenSmall = !matchingAliases.includes('md');
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

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Perform navigate
     */
    navigateCreerDemandeSAV(operation: OperationSAVRef): void {
        const navigationExtras: NavigationExtras = {
            state: {
                operation: operation,
                dossierCredit: this.dossierCredit
            }
        };
        this._router.navigate(['/espace-connecte/demande-sav'], navigationExtras);
    }

}
