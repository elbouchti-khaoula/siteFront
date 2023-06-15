import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { User } from 'app/core/user/user.types';
import { AuthenticationService } from 'app/core/auth/authentication.service';

@Component({
    selector: 'bienvenue',
    templateUrl: './bienvenue.component.html',
    encapsulation: ViewEncapsulation.None
})
export class BienvenueComponent implements OnInit {

    user: User;
    @Input() showWelcome: boolean = false;
    panelOpenState = false;

    /**
     * Constructor
     */
    constructor(
        private _authenticationService: AuthenticationService
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
        this.user = this._authenticationService.connectedUser;
    }

}
