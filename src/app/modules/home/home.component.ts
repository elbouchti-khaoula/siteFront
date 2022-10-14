import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector     : 'home',
    templateUrl  : './home.component.html',
    encapsulation: ViewEncapsulation.None
})
export class HomeComponent
{
    
    estAcquereur: boolean = true;
    
    /**
     * Constructor
     */
    constructor()
    {
    }
}
