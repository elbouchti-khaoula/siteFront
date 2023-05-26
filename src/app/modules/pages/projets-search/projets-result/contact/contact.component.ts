import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { SalesForceService } from 'app/core/salesforce/salesforce.service';
import { catchError, Subject, takeUntil, throwError } from 'rxjs';
import { Projet } from 'app/core/projets/projets.types';

@Component({
    selector: 'projet-contact',
    templateUrl: './contact.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjetContactComponent implements OnInit {
    isScreenSmall: boolean;
    visible: boolean;
    @Input() drawer: MatDrawer;
    @Input() projet: Projet;
    @ViewChild('projetContactNgForm') projetContactNgForm: NgForm;
    alert: any;
    projetContactForm: FormGroup;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _formBuilder: FormBuilder,
        private _router: Router,
        private _salesForceService: SalesForceService
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
        this.projetContactForm = this._formBuilder.group(
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

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    closeDrawer(): void {
        this.visible = false;
        this.drawer.close();
    }

    /**
     * Clear the form
     */
    clearForm(): void {
        // Reset the form
        this.projetContactNgForm.resetForm();
    }

    /**
     * Send the form
     */
    sendForm(): void {
        this._salesForceService.createWeb2Lead(
            this.projet.id,
            this.projetContactForm.get('nom').value,
            this.projetContactForm.get('prenom').value,
            this.projetContactForm.get('email').value,
            this.projetContactForm.get('telephone').value,
            this.projetContactForm.get('message').value,
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
                this.visible = true;
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
