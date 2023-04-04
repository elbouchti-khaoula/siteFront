import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { catchError, Subject, takeUntil, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { SalesForceService } from 'app/core/salesforce/salesforce.service';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { Projet } from '../../projets.types';

@Component({
    selector       : 'faites-vous-rappeler',
    templateUrl    : './faites-vous-rappeler.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FaitesVousRappelerComponent implements OnInit, OnDestroy
{
    isScreenSmall: boolean;
    alert: any;
    projet: Projet;
    @ViewChild('faitesVousRappelerNgForm') faitesVousRappelerNgForm: NgForm;
    faitesVousRappelerForm: FormGroup;
    // Private
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        @Inject(MAT_DIALOG_DATA) private _data: { projet: Projet },
        public matDialogRef: MatDialogRef<FaitesVousRappelerComponent>,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder,
        private _router: Router,
        private _salesForceService: SalesForceService
    )
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
        if ( this._data.projet.id )
        {
            this.projet = this._data.projet;
        }

        // Subscribe to media changes
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({ matchingAliases }) => {

                // Check if the screen is small
                this.isScreenSmall = !matchingAliases.includes('md');
            });
            
        // Prepare the form
        this.faitesVousRappelerForm = this._formBuilder.group({
            nom         : ['', Validators.required],
            prenom      : ['', Validators.required],
            email       : ['', [Validators.required, Validators.email]],
            telephone   : ['', Validators.required],
            message     : ['']
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

    /**
     * Clear the form
     */
    clearForm(): void {
        // Reset the form
        this.faitesVousRappelerNgForm.resetForm();
    }

    /**
    /**
     * Send the form
     */
    sendForm(): void {
        this._salesForceService.createWeb2Lead(
            this.projet.id,
            this.faitesVousRappelerForm.get('nom').value,
            this.faitesVousRappelerForm.get('prenom').value,
            this.faitesVousRappelerForm.get('email').value,
            this.faitesVousRappelerForm.get('telephone').value,
            this.faitesVousRappelerForm.get('message').value,
            "Flux Marketplace",
            "Faites-vous rappeler : "
        )
            .pipe(
                catchError((error) => {
                    // Log the error
                    console.error(error);

                    if (error.status === 500) {
                        this._router.navigateByUrl('/500-server-error');
                    } else if (error.status === 404) {
                        this._router.navigateByUrl('/404-not-found');
                    } else {
                        this._showAlertMessage('error', 'Erreur, veuillez contactez un administrateur', true);
                    }

                    // Throw an error
                    return throwError(error);
                }))
            .subscribe((response: string) => {
                this._showAlertMessage('success', 'Votre message est envoyé.', false);
            });

        // Clear the form
        this.clearForm();
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
