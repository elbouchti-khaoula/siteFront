import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import { debounceTime, Subject, takeUntil } from 'rxjs';

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

    choix: boolean;
    abonne: boolean;
    connecte: boolean;

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
        private _formBuilder: UntypedFormBuilder,
        private _router: Router,
        private _matDialog: MatDialog
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
                client    : ['', [Validators.required]],
                name      : ['', Validators.required],
                prenom    : ['', [Validators.required]],
                email     : ['', [Validators.required, Validators.email]],
                CIN       : [''],
                telephone    : [''],
                datenaissance    : ['', [Validators.required]],
                agreements: ['', Validators.requiredTrue]
            }
        );

        this.choix = true;
        this.abonne = false;
        this.connecte = false;

        this.signUpForm.get('client').valueChanges
        .pipe(
          debounceTime(100),
          takeUntil(this._unsubscribeAll)
        )
        .subscribe((value) => {
           console.log('traitement');
           console.log(this.signUpForm.get('client').value);

           if(this.signUpForm.get('client').value == 'false'){
                console.log('dkhel true');
                this.choix = false;
                this.abonne = true;
                this.connecte = false;
           }
           if(this.signUpForm.get('client').value == 'true'){
                console.log('dkhel false');
                this.choix = false;
                this.abonne = false;
                this.connecte = true;
           }
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

        // Sign up
        this._authService.signUp(this.signUpForm.value)
            .subscribe(
                () => {
                    alert('dkhel 1');
                    // Navigate to the confirmation required page
                    this._router.navigateByUrl('/confirmation-required');
                },
                (response) => {
                    alert('dkhel 2');
                    alert(response);
                    // Re-enable the form
                    this.signUpForm.enable();

                    // Reset the form
                    this.signUpNgForm.resetForm();

                    // Set the alert
                    this.alert = {
                        type   : 'error',
                        message: 'Something went wrong, please try again.'
                    };

                    // Show the alert
                    this.showAlert = true;
                }
            );
    }
}
