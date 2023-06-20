import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { SalesForceService } from 'app/core/services/salesforce/salesforce.service';
import { BehaviorSubject, catchError, Subject, takeUntil, throwError } from 'rxjs';
import { Projet } from 'app/core/services/projets/projets.types';
import { AuthenticationService } from 'app/core/auth/authentication.service';

@Component({
    selector: 'contact-promoteur',
    templateUrl: './contact-promoteur.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactPromoteurComponent implements OnInit, AfterViewInit {

    @Input() visible: BehaviorSubject<boolean>;
    @Input() projet: Projet;

    isScreenSmall: boolean;
    alert: any;
    @ViewChild('contactNgForm') contactNgForm: NgForm;
    contactForm: FormGroup;

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

        // Create the contact form
        this.contactForm = this._formBuilder.group(
            {
                nom         : ['', Validators.required],
                prenom      : ['', Validators.required],
                email       : ['', [Validators.required, Validators.email]],
                telephone   : ['', Validators.required],
                message     : ['']
            },
            // { validators: this.atLeastEmailOrPhone }
        );
    }

    // atLeastEmailOrPhone(form: FormGroup): ValidationErrors {
    //   const emailCtrl = form.get('email');
    //   const phoneCtr = form.get('telephone');
    //   if (!!emailCtrl.value || !!phoneCtr.value) {
    //     return null;
    //   }
    //   return { atLeastEmailOrPhone: '* Veuillez saisir émail ou téléphone' };
    // }

    /**
     * After view init
     */
    ngAfterViewInit(): void {
        let currentUser = this._authenticationService.connectedUser;
    
        if (currentUser?.email) {
            this.contactForm.get('email').setValue(currentUser?.email);
        }
    
        if (currentUser?.lastName) {
            this.contactForm.get('nom').setValue(currentUser?.lastName);
        }
    
        if (currentUser?.firstName) {
            this.contactForm.get('prenom').setValue(currentUser?.firstName);
        }
    
        if (currentUser?.telephone) {
            this.contactForm.get('telephone').setValue(currentUser?.telephone);
        }
    
        this._changeDetectorRef.detectChanges();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Clear the form
     */
    clearForm(): void {
        // Reset the form
        // this.contactNgForm.resetForm();
        this.contactForm.get('message').setValue(null);
    }

    /**
     * Send the form
     */
    sendForm(): void {
        this._salesForceService.createWeb2Lead(
            this.projet.id,
            this.contactForm.get('nom').value,
            this.contactForm.get('prenom').value,
            this.contactForm.get('email').value,
            this.contactForm.get('telephone').value,
            this.contactForm.get('message').value,
            "Flux Marketplace",
            "Contacter promoteur : "
        )
            .pipe(
                catchError((error: HttpErrorResponse) => {
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
                this.visible.next(true);
                this._showAlertMessage('success', 'Votre message est envoyé au promoteur. Veuillez trouver ci-dessous ses coordonnées', false);
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
