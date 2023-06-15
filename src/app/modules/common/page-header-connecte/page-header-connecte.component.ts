import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthenticationService } from 'app/core/auth/authentication.service';
import { User } from 'app/core/user/user.types';

@Component({
    selector: 'page-header-connecte',
    templateUrl: './page-header-connecte.component.html',
    encapsulation: ViewEncapsulation.None
})
export class PageHeaderConnecteComponent implements OnInit {

    @Input() headerStyle: string = "";
    @Input() headerLibelle: string;
    @Input() subHeaderLibelle: string;
    @Input() hideSmallScreen: boolean = false;
    @Input() showUser: boolean = false;
    user: User;

    /**
     * Constructor
     */
    constructor(private _authenticationService: AuthenticationService)
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
