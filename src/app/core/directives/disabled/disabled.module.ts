import { NgModule } from '@angular/core';
import { DisableControlDirective } from './disabled.directive';

@NgModule({
    declarations: [
        DisableControlDirective
    ],
    exports     : [
        DisableControlDirective
    ]
})
export class DisableControlModule
{
}
