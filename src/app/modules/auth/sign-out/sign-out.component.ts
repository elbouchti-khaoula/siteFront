import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { finalize, Subject, takeUntil, takeWhile, tap, timer } from 'rxjs';
import { AuthenticationService } from 'app/core/auth/authentication.service';

@Component({
    selector     : 'auth-sign-out',
    templateUrl  : './sign-out.component.html',
    styleUrls    : ['../common/auth.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AuthSignOutComponent implements OnInit, OnDestroy
{
    countdown: number = 4;
    countdownMapping: any = {
        '=1'   : '# second',
        'other': '# seconds'
    };
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _authenticationService: AuthenticationService,
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
        // Sign out
        this._authenticationService.signOut();

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
}
