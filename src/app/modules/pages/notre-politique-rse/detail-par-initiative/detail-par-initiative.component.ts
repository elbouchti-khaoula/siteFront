import { Component, ViewEncapsulation } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { fuseAnimations } from '@fuse/animations';


@Component({
    selector     : 'detail-par-initiative',
    templateUrl  : './detail-par-initiative.component.html',
    styleUrls       : ['./detail-par-initiative.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class DetailParInitiativeComponent
{
    isScreenSmall: boolean;
     /**
     * Constructor
     */
     constructor()
     {
     }
 
    
 
 
    

    
}
