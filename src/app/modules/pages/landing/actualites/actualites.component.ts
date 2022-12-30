import { Component, ElementRef, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { gsap } from "gsap";

@Component({
    selector       : 'actualites',
    templateUrl    : './actualites.component.html',
    styleUrls       : ['./actualites.component.scss'],
    encapsulation  : ViewEncapsulation.None
})
export class ActualitesComponent
{
    @Input() isScreenSmall: boolean;
    @ViewChild('landingWrapper', { read: ElementRef }) public landingWrapper: ElementRef<any>;
    @ViewChild('landingInnerContent', { read: ElementRef }) public landingInnerContent: ElementRef<any>;

    /**
     * Constructor
     */
    constructor()
    {
    }

    public onMouseMove(event: MouseEvent) {
        let dimension = this.landingWrapper.nativeElement.getBoundingClientRect();
        if (event.clientX > dimension.width / 2) {
            gsap.to(this.landingWrapper.nativeElement, {duration: 2, scrollLeft:"+=700px", ease: "power2.easeOut" });
        } else {
            gsap.to(this.landingWrapper.nativeElement, {duration: 2, scrollLeft:"-=700px", ease: "power2.easeOut" });
        }
    }

}
