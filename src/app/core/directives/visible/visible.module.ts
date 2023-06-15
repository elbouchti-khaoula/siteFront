import { NgModule } from '@angular/core';
import { OnHiddenDirective, OnVisibleDirective } from './visible.directive';

@NgModule({
    declarations: [
        OnVisibleDirective,
        OnHiddenDirective
    ],
    exports     : [
        OnVisibleDirective,
        OnHiddenDirective
    ]
})
export class VisibilityModule
{
}
