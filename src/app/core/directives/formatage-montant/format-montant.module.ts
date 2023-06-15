import { NgModule } from '@angular/core';
import { FormatMontantDirective } from './format-montant.directive';

@NgModule({
    declarations: [
        FormatMontantDirective
    ],
    exports     : [
        FormatMontantDirective
    ]
})
export class FormatMontantModule
{
}
