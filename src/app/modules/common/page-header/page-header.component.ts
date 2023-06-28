import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'page-header',
    templateUrl: './page-header.component.html',
    encapsulation: ViewEncapsulation.None
})
export class PageHeaderComponent {

    @Input() hideSmallScreen: boolean = false;
    @Input() headerStyle: string = "";
    @Input() headerLibelle: string;
    @Input() subHeaderLibelle: string;
    @Input() hideSubHeaderSmallScreen: boolean = false;
    @Input() textColor: string = "text-default";

    /**
     * Constructor
     */
    constructor()
    {
    }

}
