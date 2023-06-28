import { ChangeDetectorRef, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'page-header-connecte',
    templateUrl: './page-header-connecte.component.html',
    encapsulation: ViewEncapsulation.None
})
export class PageHeaderConnecteComponent implements OnInit {

    @Input() hideSmallScreen: boolean = false;
    @Input() headerStyle: string = "";
    @Input() headerLibelle: string;
    @Input() subHeaderLibelle: string;
    @Input() hideSubHeaderSmallScreen: boolean = false;
    @Input() textColor: string = "text-default";
    
    @Input() showUser: boolean = false;
    user: User;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _userService: UserService
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
        // Subscribe to user changes
        this._userService.user$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((user: User) => {
                this.user = user;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
    }

}
