import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AccountService } from 'app/core/services/accounts/accounts.service';
import { AuthenticationService } from 'app/core/auth/authentication.service';
import { SmsService } from 'app/core/services/sms/sms.service';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
import { Subject, finalize, takeUntil, takeWhile, tap, timer } from 'rxjs';

@Component({
    selector: 'sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['../common/auth.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class AuthSignUpComponent implements OnInit {
    @ViewChild('signUpNgForm') signUpNgForm: NgForm;

    @ViewChild('signUpNgForm2') signUpNgForm2: NgForm;

    @ViewChild('signUpNgForm3') signUpNgForm3: NgForm;

    @ViewChild('signUpNgForm4') signUpNgForm4: NgForm;

    @ViewChild('chooseFormNgForm') chooseFormNgForm: NgForm;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    countdown: number = 3;
    countdownMapping: any = {
        '=1': '# second',
        'other': '# seconds'
    };

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: ''
    };
    user: User;
    chooseForm: UntypedFormGroup;
    signUpForm: UntypedFormGroup;
    signUpForm2: UntypedFormGroup;
    signUpForm3: UntypedFormGroup;
    signUpForm4: UntypedFormGroup;
    showAlert: boolean = false;
    isClient: boolean = false;
    isNum: boolean = false;
    isSendSms: boolean = false;
    numeros;

    /**
     * Constructor
     */
    constructor(
        private _accountService: AccountService,
        private _authenticationService: AuthenticationService,
        private _smsService: SmsService,
        private _userService: UserService,
        private _formBuilder: UntypedFormBuilder,
        private _router: Router,
        private _matDialog: MatDialog
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Create the form

        this.chooseForm = this._formBuilder.group({
            clientAWB: [false]
        });

        this.signUpForm = this._formBuilder.group({
            lastName: ['', Validators.required],
            firstName: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            cin: ['', [Validators.required]],
            dateNaissance: ['', [Validators.required]],
            agreements: [''],
            clientAWB: ['']
        });

        this.signUpForm2 = this._formBuilder.group({
            lastName: ['', Validators.required],
            firstName: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            telephone: ['', [Validators.required]],
            pass1: ['', [Validators.required]],
            pass2: ['', [Validators.required]],
            agreements: [''],
            clientAWB: ['']
        });

        this.signUpForm3 = this._formBuilder.group({
            num: ['', Validators.required]
        });

        this.signUpForm4 = this._formBuilder.group({
            code: ['', Validators.required],
            pass1: ['', [Validators.required]],
            pass2: ['', [Validators.required]]
        });

        this.onChanges()

    }

    /**
    * On destroy
    */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    onChanges(): void {
        this.chooseForm.get("clientAWB").valueChanges.subscribe(val => {
            this.isClient = val
            if (this.isClient) {
                this.isNum = false
                this.isSendSms = false
            }
            this.showAlert = false;
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign up
     */
    signUp(): void {

        if (this.signUpForm.invalid) {
            return;
        }

        this.showAlert = false;
        this.signUpForm.disable();

        localStorage.setItem('firstName', this.signUpForm.get('firstName').value)
        localStorage.setItem('lastName', this.signUpForm.get('lastName').value)
        localStorage.setItem('cin', this.signUpForm.get('cin').value)
        localStorage.setItem('email', this.signUpForm.get('email').value)
        localStorage.setItem('dateNaissance', this.signUpForm.get('dateNaissance').value)

        this._accountService.checkUserTelephones(this.signUpForm.value).subscribe(
            response => {

                let numsList = response.nums

                if (numsList == undefined) {
                    this.alert = {
                        type: 'warning',
                        message: 'Auncun numéro correspondant, veuillez contacter votre agence.'
                    };
                    this.showAlert = true;
                    this.signUpForm.enable();
                }
                else {
                    this.numeros = numsList
                    this.isClient = true
                    this.isNum = true
                    this.isSendSms = false
                    this.signUpForm.enable();
                }
            },
            (error: HttpErrorResponse) => {
                if (error.status == 404) {
                    this.alert = {
                        type: 'warning',
                        message: 'Auncun client correspondant, cin ou date de naissasnce incorrecte.'
                    };
                    this.showAlert = true;
                    this.signUpForm.enable();
                }
                else {
                    this.alert = {
                        type: 'error',
                        message: 'Une erreur s\'est produite.'
                    };
                    this.showAlert = true;
                    this.signUpForm.enable();
                }
            }
        );


    }

    signUp2(): void
    {   

        if ( this.signUpForm2.invalid)
        {
            return;
        }

        this.signUpForm2.disable();
        this.showAlert = false;

        this._userService.signUp(this.signUpForm2.value)
        //this._authService.signUp(this.signUpForm2.value)
            .subscribe(
                () => {

                    // send mail
                    let currentUser = this._authenticationService.connectedUser;
                    this._userService.sendMailToUser(currentUser.id)
                    //this._authService.sendMail()
                        .subscribe(
                            () => {

                                this.alert = {
                                    type   : 'success',
                                    message: 'Un lien d\'activation vous a été envoyé à votre adresse mail.'
                                };

                                this.showAlert = true;

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
                                //this._authService.deleteUser().subscribe();
                                this._userService.deleteUser(currentUser.id).subscribe();

                                this.alert = {
                                    type   : 'error',
                                    message: 'Erreur lors de l\'envoi du lien d\'activation par email.'
                                };
                                this.signUpForm2.enable();
                                this.showAlert = true;
                            }
                        );

                },
                (response) => {

                    if (response.status == 409) {
                        this.alert = {
                            type: 'warning',
                            message: 'Compte existant.'
                        };
                        this.signUpForm2.enable();
                        this.showAlert = true;
                    }
                    else {
                        this.alert = {
                            type: 'error',
                            message: 'Une erreur s\'est produite.'
                        };
                        this.signUpForm2.enable();
                        this.showAlert = true;
                    }
                }
            );

    }

    sendSms(): void {

        if (this.signUpForm3.invalid) {
            return;
        }

        this.showAlert = false;
        this.signUpForm3.disable();

        let code = this.getRandom(6).toString(6)
        localStorage.setItem('code', code)

        this._smsService.sendSms(code, this.signUpForm3.get('num').value).subscribe(
            response => {

                if(response.error != undefined || response.error != null){
                    this.alert = {
                        type: 'error',
                        message: 'Erreur lors de l\'envoi du code d\'activation via \'sms.'
                    }
    
                    this.isClient = true
                    this.isNum = false
                    this.isSendSms = false
    
                    this.showAlert = true;
                    this.signUpForm3.enable();
                }
                else {
                    this.alert = {
                        type: 'success',
                        message: 'Un code d\'activation vous a été envoyé via sms.'
                    }

                    this.isClient = true
                    this.isNum = false
                    this.isSendSms = true

                    this.showAlert = true;
                    this.signUpForm3.enable();
                }

            },
            (error: HttpErrorResponse) => {

                this.alert = {
                    type: 'error',
                    message: 'Erreur lors de l\'envoi du code d\'activation via \'sms.'
                }

                this.isClient = true
                this.isNum = false
                this.isSendSms = false

                this.showAlert = true;
                this.signUpForm3.enable();
            }
        );

    }

    activerCompte(): void {

        if (this.signUpForm4.invalid) {
            return;
        }

        this.showAlert = false;
        this.signUpForm4.disable();

        if (localStorage.getItem('code') == this.signUpForm4.get('code').value) {

            let user = {
                firstName: this.signUpForm.get('firstName').value,
                lastName: this.signUpForm.get('lastName').value,
                cin: this.signUpForm.get('cin').value,
                dateNaissance: this.signUpForm.get('dateNaissance').value,
                email: this.signUpForm.get('email').value,
                telephone: this.signUpForm3.get('num').value,
                password: this.signUpForm4.get('pass1').value,
                clientAWB: this.chooseForm.get('clientAWB').value
            }

            // console.log('signUp')
            // console.log(user)

            this._userService.signUp(this.signUpForm.value)
            // this._authService.signUp(user)
                .subscribe(
                    () => {

                        // send mail
                        let currentUser = this._authenticationService.connectedUser;
                        this._userService.sendMailToUser(currentUser.id)
                        // this._authService.sendMail()
                            .subscribe(
                                () => {

                                    this.alert = {
                                        type: 'success',
                                        message: 'Un lien d\'activation vus a été envoyé à votre adresse mail.'
                                    };

                                    this.showAlert = true;
                                    this.signUpForm4.enable();
                                    this.signUpNgForm4.resetForm();

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
                                    // this._authService.deleteUser().subscribe();
                                    this._userService.deleteUser(currentUser.id).subscribe();

                                    this.alert = {
                                        type: 'error',
                                        message: 'Erreur lors de l\'envoi du lien d\'activation par email.'
                                    };

                                    this.isClient = true
                                    this.isNum = false
                                    this.isSendSms = false

                                    this.showAlert = true;
                                    this.signUpForm4.enable();
                                    this.signUpNgForm4.resetForm();
                                }
                            );
                    },
                    (response) => {

                        if (response.status == 409) {

                            this.alert = {
                                type: 'warning',
                                message: 'Compte existant.'
                            };

                            this.isClient = true
                            this.isNum = false
                            this.isSendSms = false

                            this.showAlert = true;
                            this.signUpForm4.enable();
                            this.signUpNgForm4.resetForm();
                        }
                        else {

                            this.alert = {
                                type: 'error',
                                message: 'Une erreur s\'est produite.'
                            };

                            this.isClient = true
                            this.isNum = false
                            this.isSendSms = false

                            this.showAlert = true;
                            this.signUpForm4.enable();
                            this.signUpNgForm4.resetForm();
                        }
                    }
                );
        }
        else {

            this.alert = {
                type: 'error',
                message: 'Code d\'activation incorrect.'
            }

            this.showAlert = true;
            this.signUpForm4.enable();
            this.signUpNgForm4.resetForm();
        }


    }

    // signUp2(): void {

    //     if (this.signUpForm2.invalid) {
    //         return;
    //     }

    //     this.signUpForm2.disable();
    //     this.showAlert = false;

    //     this._authService.signUp(this.signUpForm2.value)
    //         .subscribe(
    //             () => {

    //                 // send mail
    //                 this._authService.sendMail()
    //                     .subscribe(
    //                         () => {

    //                             this.alert = {
    //                                 type: 'success',
    //                                 message: 'Un lien d\'activation vous a été envoyé à votre adresse mail.'
    //                             };

    //                             this.showAlert = true;

    //                             // Redirect after the countdown
    //                             timer(1000, 1000)
    //                                 .pipe(
    //                                     finalize(() => {
    //                                         this._router.navigate(['landing']);
    //                                     }),
    //                                     takeWhile(() => this.countdown > 0),
    //                                     takeUntil(this._unsubscribeAll),
    //                                     tap(() => this.countdown--)
    //                                 )
    //                                 .subscribe();
    //                         },
    //                         (response) => {

    //                             // Delete user
    //                             this._authService.deleteUser().subscribe();

    //                             this.alert = {
    //                                 type: 'error',
    //                                 message: 'Erreur lors de l\'envoi du lien d\'activation par email.'
    //                             };
    //                             this.signUpForm2.enable();
    //                             this.showAlert = true;
    //                         }
    //                     );

    //             },
    //             (response) => {

    //                 if (response.status == 409) {
    //                     this.alert = {
    //                         type: 'warning',
    //                         message: 'Compte existant.'
    //                     };
    //                     this.signUpForm2.enable();
    //                     this.showAlert = true;
    //                 }
    //                 else {
    //                     this.alert = {
    //                         type: 'error',
    //                         message: 'Une erreur s\'est produite.'
    //                     };
    //                     this.signUpForm2.enable();
    //                     this.showAlert = true;
    //                 }
    //             }
    //         );

    // }

    getRandom(length) {

        return Math.floor(Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1));

    }

}
