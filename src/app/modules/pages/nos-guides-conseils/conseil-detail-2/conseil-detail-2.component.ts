import { Component, ViewEncapsulation } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { fuseAnimations } from '@fuse/animations';
import { Router } from '@angular/router';



@Component({
    selector     : 'conseil-detail-2',
    templateUrl  : './conseil-detail-2.component.html',
    styleUrls       : ['./conseil-detail-2.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class Detail2Component
{
    
    /**
     * Constructor
     */
    constructor(private router: Router)
    {
    }
    isScreenSmall :boolean ;
    imageVisDet10 = 'assets/images/pages/nos-offres-miftah/Santé_1946243179.jpg';
    imageVisDet14= 'assets/images/pages/nos-offres-miftah/Attaalim_2007116861.jpg';
    imageVisDet5 = 'assets/images/pages/nos-offres-miftah/Professionel 2_284936198.jpg';
    imageVisDet7 = 'assets/images/pages/nos-guides-et-conseils/conseil3.png';

    desc1 : boolean ;
    desc2 : boolean ;
    desc3 : boolean ;
    desc4 : boolean ;


    toggle1(){
        if (this.desc1) {
            this.desc1 = false;
        }
        else {
            this.desc1 = true; // sinon, on l'affiche
            this.desc2 = false;
            this.desc3 = false;
            this.desc4 = false;

          }
         
    }
    toggle2(){
        if (this.desc2) {
            this.desc2 = false;
        }
        else {
            this.desc2 = true; // sinon, on l'affiche
            this.desc1 = false;
            this.desc3 = false;
            this.desc4 = false;


          }
         
    }
    toggle3(){
        if (this.desc3) {
            this.desc3 = false;
        }
        else {
            this.desc3 = true; // sinon, on l'affiche
            this.desc2 = false;
            this.desc1 = false;
            this.desc4 = false;


          }
         
    }
    toggle4(){
        if (this.desc4) {
            this.desc4 = false;
        }
        else {
            this.desc4 = true; // sinon, on l'affiche
            this.desc2 = false;
            this.desc3 = false;
            this.desc1 = false;

          }
         
    }
    


    
}
