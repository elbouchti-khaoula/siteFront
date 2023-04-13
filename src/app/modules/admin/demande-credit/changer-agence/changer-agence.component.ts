import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { Agence, Ville } from 'app/core/referentiel/referentiel.types';
import { ReferentielService } from 'app/core/referentiel/referentiel.service';

@Component({
    selector: 'changer-agence',
    templateUrl: './changer-agence.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ChangerAgenceComponent implements OnInit, OnDestroy {
    isScreenSmall: boolean;
    alert: any;

    @ViewChild('changerAgenceNgForm') changerAgenceNgForm: NgForm;
    changerAgenceForm: FormGroup;

    villes: Ville[];
    agencesCount: number = 0;
    agences: Agence[];
    selectedAgence: Agence;
    simulationId: number;

    // Private
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        @Inject(MAT_DIALOG_DATA) private _data: { simulationId: number },
        public matDialogRef: MatDialogRef<ChangerAgenceComponent>,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder,
        private _referentielService: ReferentielService,
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

        if ( this._data.simulationId )
        {
            this.simulationId = this._data.simulationId;
        }

        // Prepare the form
        this.changerAgenceForm = this._formBuilder.group({
            // typeAgence: [null, [Validators.required]],
            codeVille   : [null, [Validators.required]],
            agenceCode  : ['', [Validators.required]]
        });

        // Get the villes
        this._referentielService.villes$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((response: Ville[]) => {

                // Update the villes
                this.villes = response;

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

        this.changerAgenceForm.get('codeVille').valueChanges
            .pipe(
                debounceTime(300),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe((value) => {
                this.changerAgenceForm.get('agenceCode').setValue(null);
                
                if (value) {
                    this._referentielService.getAgencesByVille(value)
                        .subscribe((response) => {

                            this.agences = response;

                            // Update the counts
                            this.agencesCount = response?.length;
                        });
                } else {
                    this.agences = null;
                }
            });

        // this.changerAgenceForm.get('typeAgence').valueChanges.subscribe((value) => {
        //     if (value === 'digital') {
        //         this.changerAgenceForm.get('codeVille').setValue(null);
        //         this.changerAgenceForm.get('agenceCode').setValue(null);
        //     }
        // });
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
     * Clear the form
     */
    clearForm(): void {
        // Reset the form
        this.changerAgenceNgForm.resetForm();
    }

    /**
    /**
     * Send the form
     */
    sendForm(): void {
        // Clear the form
        this.clearForm();
    }

    /**
     * Select agence
     *
     * @param agence
     */
    selectAgence(agence: Agence): void {
        this.selectedAgence = agence;
        this.changerAgenceForm.get('agenceCode').setValue(agence.code);
    }

    /**
     * Show Alert message
     */
    _showAlertMessage(typeP: string, msgP: string, hide: boolean): void {
        // Show the message
        this.alert = {
            type: typeP,
            message: msgP
        };

        // Mark for check
        this._changeDetectorRef.markForCheck();

        // Hide it after 7 seconds
        if (hide) {
            setTimeout(() => {

                this.alert = null;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            }, 7000);
        }
    }
    

}
