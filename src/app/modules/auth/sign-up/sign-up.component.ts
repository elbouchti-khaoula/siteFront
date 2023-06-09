import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
import { Subject, finalize, takeUntil, takeWhile, tap, timer } from 'rxjs';

@Component({
    selector     : 'sign-up',
    templateUrl  : './sign-up.component.html',
    styleUrls    : ['../common/auth.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class AuthSignUpComponent implements OnInit
{
    @ViewChild('signUpNgForm') signUpNgForm: NgForm;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    countdown: number = 3;
    countdownMapping: any = {
        '=1'   : '# second',
        'other': '# seconds'
    };

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
        private _userService: UserService,
        private _formBuilder: UntypedFormBuilder,
        private _router: Router
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


        this._userService.signUp(this.signUpForm.value)
            .subscribe(
                () => {

                    // send mail
                    let currentUser;
                    this._userService.user$.subscribe((user: User) => {
                        currentUser = user;
                    });
                    this._userService.sendMailToUser(currentUser.id)
                        .subscribe(
                            () => {
                                this.alert = {
                                    type   : 'success',
                                    message: 'Un lien d\'activation vous a été envoyé à votre adresse mail.'
                                };

                                // Redirect after the countdown
                                timer(1000, 1000)
                                .pipe(
                                    finalize(() => {
                                        this._router.navigate(['landing']);
                                    }),
                                    takeWhile(() => this.countdown > 0),
                                    takeUntil(this._unsubscribeAll),
                                    tap(() => this.countdown--)
                                )
                                .subscribe();
                            },
                            (response) => {
                                
                                // Delete user
                                // this._userService.deleteUser(id).subscribe();

                                this.alert = {
                                    type   : 'error',
                                    message: 'Erreur lors de l\'envoi du lien d\'activation par email.'
                                };
                            }
                        );
                    
                    // Show the alert
                    this.showAlert = true;

                },
                (response) => {

                    if (response.status == 409) {
                        this.alert = {
                            type: 'warning',
                            message: 'Compte existant.'
                        };
                    }
                    else {
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
