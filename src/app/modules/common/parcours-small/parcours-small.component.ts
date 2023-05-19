import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector       : 'parcours-small',
    templateUrl    : './parcours-small.component.html',
    styleUrls       : ['./parcours-small.component.scss'],
    encapsulation  : ViewEncapsulation.None
})
export class ParcoursSmallComponent
{

    @Input() inputMethod: () => void

    /**
     * Constructor
     */
    constructor()
    {
    }

}
