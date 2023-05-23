import { Component, ViewEncapsulation } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { fuseAnimations } from '@fuse/animations';


@Component({
    selector     : 'nos-guides-conseils',
    templateUrl  : './nos-guides-conseils.component.html',
    styleUrls       : ['./nos-guides-conseils.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class NosGuidesConseilsComponent
{
    
    /**
     * Constructor
     */
    constructor()
    {
    }

    imageVisDet10 = 'assets/images/pages/nos-offres-miftah/Santé_1946243179.jpg';
    imageVisDet14= 'assets/images/pages/nos-offres-miftah/Attaalim_2007116861.jpg';
    imageVisDet5 = 'assets/images/pages/nos-offres-miftah/Professionel 2_284936198.jpg';
    imageVisDet7 = 'assets/images/pages/nos-offres-miftah/MRE-BILA HOUDOUD_2042991488.jpg';


    
}
