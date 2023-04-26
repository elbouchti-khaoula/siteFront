import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector       : 'parcours',
    templateUrl    : './parcours.component.html',
    styleUrls       : ['./parcours.component.scss'],
    encapsulation  : ViewEncapsulation.None
})
export class ParcoursComponent
{

    @Input() inputMethod: () => void

    /**
     * Constructor
     */
    constructor()
    {
    }

}
