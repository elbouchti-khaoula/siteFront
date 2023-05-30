import { NgModule } from '@angular/core';
import { FormatTelephoneDirective } from './format-tele.directive';

@NgModule({
    declarations: [
        FormatTelephoneDirective
    ],
    exports     : [
        FormatTelephoneDirective
    ]
})
export class FormatTelephoneModule
{
}
