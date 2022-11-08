import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'projets-result',
    templateUrl: './projets-result.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjetsResultComponent
{
    /**
     * Constructor
     */
     constructor()
     {
     }
}
