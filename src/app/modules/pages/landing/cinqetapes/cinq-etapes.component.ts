import { Component, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';

@Component({
    selector       : 'cinq-etapes',
    templateUrl    : './cinq-etapes.component.html',
    styleUrls      : ['./cinq-etapes.component.scss'],
    encapsulation  : ViewEncapsulation.None,
    animations     : fuseAnimations
})
export class CinqEtapesComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }

    animationsEnabled: boolean = false;

    onAppear() {
        this.animationsEnabled = true;
    }

    onDisappear() {
        this.animationsEnabled = false;
    }

}
