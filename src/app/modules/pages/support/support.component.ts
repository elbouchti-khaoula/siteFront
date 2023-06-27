import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { catchError, Subject, takeUntil, throwError } from 'rxjs';
import { SalesForceService } from 'app/core/services/salesforce/salesforce.service';
import { AuthenticationService } from 'app/core/auth/authentication.service';

@Component({
    selector: 'support',
    templateUrl: './support.component.html',
    styleUrls: ['./support.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupportComponent implements OnInit, OnDestroy {
    isScreenSmall: boolean;
    isCaptchaValid: boolean = false;
    @Input() drawer: MatDrawer;
    @ViewChild('supportNgForm') supportNgForm: NgForm;
    supportForm: FormGroup;
    alert: any;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _formBuilder: FormBuilder,
        private _router: Router,
        private _salesForceService: SalesForceService,
        private _authenticationService: AuthenticationService
    ) {
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

        // Create the support form
        this.supportForm = this._formBuilder.group({
            nom         : ['', Validators.required],
            prenom      : ['', Validators.required],
            email       : ['', [Validators.required, Validators.email]],
            telephone   : ['', Validators.required],
            message     : ['']
        });

        this._initInfosConnectedUser();
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
        this.supportNgForm.resetForm();
    }

    /**
    /**
     * Send the form
     */
    sendForm(): void {
        this._salesForceService.createWeb2Lead(
            null,
            this.supportForm.get('nom').value,
            this.supportForm.get('prenom').value,
            this.supportForm.get('email').value,
            this.supportForm.get('telephone').value.replace(/-/g, '').substring(0, 10),
            this.supportForm.get('message').value,
            "Site WAFA IMMOBILIER",
            "Contacter nous : "
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
                    return throwError(() => error);
                }))
            .subscribe((response: string) => {
                this._showAlertMessage('success', 'Votre message est envoyé avec succès.', false);
            });

        // Clear the form
        this.clearForm();
    }

    
    // -----------------------------------------------------------------------------------------------------
    // @ private methods
    // -----------------------------------------------------------------------------------------------------

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

    private _initInfosConnectedUser() {
        let currentUser = this._authenticationService.connectedUser;
    
        if (currentUser?.email) {
            this.supportForm.get('email').setValue(currentUser?.email);
        }
    
        if (currentUser?.lastName) {
            this.supportForm.get('nom').setValue(currentUser?.lastName);
        }
    
        if (currentUser?.firstName) {
            this.supportForm.get('prenom').setValue(currentUser?.firstName);
        }
    
        if (currentUser?.telephone) {
            this.supportForm.get('telephone').setValue(currentUser?.telephone);
        }
    
        this._changeDetectorRef.detectChanges();
    }
}
