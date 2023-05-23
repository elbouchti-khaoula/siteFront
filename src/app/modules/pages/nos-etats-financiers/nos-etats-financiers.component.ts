import { Component, ViewEncapsulation } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { fuseAnimations } from '@fuse/animations';


@Component({
    selector     : 'nos-etats-financiers',
    templateUrl  : './nos-etats-financiers.component.html',
    styleUrls       : ['./nos-etats-financiers.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class NosEtatsFinanciersComponent
{
    
    /**
     * Constructor
     */
    constructor()
    {
    }

    

    
}
