import { Component, ViewEncapsulation } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { fuseAnimations } from '@fuse/animations';


@Component({
    selector     : 'nous-connaite',
    templateUrl  : './nous-connaite.component.html',
    styleUrls       : ['./nous-connaite.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class NousConnaitreComponent
{
    
    /**
     * Constructor
     */
    constructor()
    {
    }

    showDiv = true;
    showDiv2 = false;
    showDiv3 = false;

    imageSrc = 'assets/images/pages/nous-connaitre/Icon 1_2.svg';
    imageSrc2 = 'assets/images/pages/nous-connaitre/Icon 2.svg';
    imageSrc3 = 'assets/images/pages/nous-connaitre/Icon 3.svg';



    onDivClick(event) {
        console.log("Div clicked!");
        if (event.target.classList.contains('div-1')) {
            this.showDiv2 = false;
            this.showDiv = true;
            this.showDiv3 = false;

            this.imageSrc = 'assets/images/pages/nous-connaitre/Icon 1_2.svg';
            this.imageSrc2 = 'assets/images/pages/nous-connaitre/Icon 2.svg';
            this.imageSrc3 = 'assets/images/pages/nous-connaitre/Icon 3.svg';

           

          } else {
            this.showDiv = false;
        
            
          }

        

 
    }

    onDivClick2(event) {
        console.log("Div clicked 2!");
        if (event.target.classList.contains('div-2')) {
            this.showDiv2 = true;
            this.showDiv = false;
            this.showDiv3 = false;
            this.imageSrc = 'assets/images/pages/nous-connaitre/Icon 1.svg';
            this.imageSrc2 = 'assets/images/pages/nous-connaitre/Icon 2_2.svg';
            this.imageSrc3 = 'assets/images/pages/nous-connaitre/Icon 3.svg';
          
            
          } else {
            this.showDiv2 = false;
          
          }

      

    }

    onDivClick3(event) {
        console.log("Div clicked 3!");
        if (event.target.classList.contains('div-3')) {
            this.showDiv2 = false;
            this.showDiv = false;
            this.showDiv3 = true;

            this.imageSrc = 'assets/images/pages/nous-connaitre/Icon 1.svg';
            this.imageSrc2 = 'assets/images/pages/nous-connaitre/Icon 2.svg';
            this.imageSrc3 = 'assets/images/pages/nous-connaitre/Icon 3_2.svg';


          } else {
            this.showDiv3 = false;
          }
    }

    
}
