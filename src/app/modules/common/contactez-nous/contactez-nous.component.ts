import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector       : 'contactez-nous',
    templateUrl    : './contactez-nous.component.html',
    encapsulation  : ViewEncapsulation.None
})
export class ContactezNousComponent
{
    @Input() isScreenSmall: boolean;
    
    /**
     * Constructor
     */
    constructor()
    {
    }

}
