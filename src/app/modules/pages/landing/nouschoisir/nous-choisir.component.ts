import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector        : 'nous-choisir',
    templateUrl     : './nous-choisir.component.html',
    styleUrls       : ['./nous-choisir.component.scss'],
    encapsulation   : ViewEncapsulation.None,
    changeDetection : ChangeDetectionStrategy.OnPush
})
export class NousChoisirComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
