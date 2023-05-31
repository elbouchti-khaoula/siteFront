import { Component, ViewEncapsulation } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { fuseAnimations } from '@fuse/animations';
import { Router } from '@angular/router';



@Component({
    selector: 'nos-guides-conseils',
    templateUrl: './nos-guides-conseils.component.html',
    styleUrls: ['./nos-guides-conseils.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class NosGuidesConseilsComponent {

    /**
     * Constructor
     */
    constructor(private router: Router) {
    }
    isScreenSmall: boolean;
    imageVisDet1 = 'assets/images/pages/nos-guides-et-conseils/detail1.jpg';
    imageVisDet2 = 'assets/images/pages/nos-guides-et-conseils/detail2.jpg';
    imageVisDet3 = 'assets/images/pages/nos-guides-et-conseils/detail3.jpg';
    imageVisDet4 = 'assets/images/pages/nos-guides-et-conseils/detail4.jpg';

    desc1: boolean;
    desc2: boolean;
    desc3: boolean;
    desc4: boolean;


    toggle1() {
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
    toggle2() {
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
    toggle3() {
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
    toggle4() {
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
    redirectToConseil1() {
        this.router.navigate(['/conseil-detail-1']);
    }
    redirectToConseil2() {
        this.router.navigate(['/conseil-detail-2']);
    }
    redirectToConseil3() {
        this.router.navigate(['/conseil-detail-3']);
    }
    redirectToConseil4() {
        this.router.navigate(['/conseil-detail-4']);
    }




}
