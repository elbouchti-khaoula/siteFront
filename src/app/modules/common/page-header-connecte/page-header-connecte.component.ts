import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'page-header-connecte',
    templateUrl: './page-header-connecte.component.html',
    encapsulation: ViewEncapsulation.None
})
export class PageHeaderConnecteComponent {

    @Input() headerStyle: string = "";
    @Input() headerLibelle: string = "";
    @Input() subHeaderLibelle: string;
    @Input() hideSmallScreen: boolean = false;

    /**
     * Constructor
     */
    constructor()
    {
    }

}
