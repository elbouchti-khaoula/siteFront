import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'recherche-ville',
    templateUrl: './recherche-ville.component.html',
    styleUrls: ['./recherche-ville.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class RechercheVilleComponent {

    @Input() isScreenSmall: boolean;

    /**
     * Constructor
     */
    constructor(
    ) {
    }

}
