import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'page-header',
    templateUrl: './page-header.component.html',
    encapsulation: ViewEncapsulation.None
})
export class PageHeaderComponent {

    @Input() headerStyle: string = "";
    @Input() headerLibelle: string = "";
    @Input() hideSmallScreen: boolean = false;

    /**
     * Constructor
     */
    constructor()
    {
    }

}
