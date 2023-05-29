import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { OperationSAVRef } from 'app/core/referentiel/referentiel.types';
import { ReferentielService } from 'app/core/referentiel/referentiel.service';

@Component({
    selector: 'operations-sav-ref',
    templateUrl: './operations-sav-ref.component.html',
    encapsulation: ViewEncapsulation.None
})
export class OperationsSAVRefComponent implements OnInit, OnDestroy {
    isScreenSmall: boolean;
    operationsSAVRef: OperationSAVRef[] = [];
    selectedOperationSAV: OperationSAVRef;
    dossierId: number;

    // Private
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        @Inject(MAT_DIALOG_DATA) private _data: { dossierId: number },
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

        if (this._data.dossierId) {
            this.dossierId = this._data.dossierId;
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
     * Select agence
     *
     * @param agence
     */
    selectAgence(operation: OperationSAVRef): void {
        this.selectedOperationSAV = operation;
    }

}
