import { NgModule } from '@angular/core';
import { FormatEntierDirective } from './format-entier.directive';

@NgModule({
    declarations: [
        FormatEntierDirective
    ],
    exports     : [
        FormatEntierDirective
    ]
})
export class FormatEntierModule
{
}
