import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, NgForm, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import { Subject } from 'rxjs';

@Component({
    selector     : 'sign-up',
    templateUrl  : './sign-up.component.html',
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class AuthSignUpComponent implements OnInit
{
    @ViewChild('signUpNgForm') signUpNgForm: NgForm;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    alert: { type: FuseAlertType; message: string } = {
        type   : 'success',
        message: ''
    };
    signUpForm: UntypedFormGroup;
    showAlert: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _authService: AuthService,
        private _formBuilder: UntypedFormBuilder
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
        // Create the form
        this.signUpForm = this._formBuilder.group({
            clientAWB       : [false],
            lastName        : ['', Validators.required],
            firstName       : ['', [Validators.required]],
            email           : ['', [Validators.required, Validators.email]],
            cin             : [''],
            telephone       : ['', [Validators.required]],
            dateNaissance   : [''],
            pass1           : ['', [Validators.required]],
            pass2           : ['', [Validators.required]],
            agreements      : ['']
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
     * Sign up
     */
    signUp(): void
    {   
        // Do nothing if the form is invalid
        if ( this.signUpForm.invalid )
        {
            return;
        }

        // Disable the form
        this.signUpForm.disable();

        // Hide the alert
        this.showAlert = false;


        this._authService.signUp(this.signUpForm.value)
            .subscribe(
                () => {
                    
                    // Set the alert
                    this.alert = {
                        type   : 'success',
                        message: 'Un lien d\'activation vus a été envoyé à votre adresse mail.'
                    };
                    // Show the alert
                    this.showAlert = true;
                    
                    // send mail
                    this._authService.sendMail()
                        .subscribe(
                            () => {
                                console.log('success');
                            },
                            (response) => {
                                console.log(response);
                            }
                        );
                },
                (response) => {

                    console.log(response);

                    if (response.status == 409) {
                        // Set the alert
                        this.alert = {
                            type: 'warning',
                            message: 'Compte existant.'
                        };
                    }
                    else {
                        // Set the alert
                        this.alert = {
                            type: 'error',
                            message: 'Une erreur s\'est produite.'
                        };
                    }

                    // Re-enable the form
                    this.signUpForm.enable();

                    // Reset the form
                    this.signUpNgForm.resetForm();

                    // Show the alert
                    this.showAlert = true;
                }
            );
    }

}
