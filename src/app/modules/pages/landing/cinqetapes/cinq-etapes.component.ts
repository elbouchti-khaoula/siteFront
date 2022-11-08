import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector       : 'cinq-etapes',
    templateUrl    : './cinq-etapes.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CinqEtapesComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
