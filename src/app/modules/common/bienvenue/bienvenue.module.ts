import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { BienvenueComponent } from './bienvenue.component';

@NgModule({
    declarations: [
        BienvenueComponent
    ],
    imports     : [
        SharedModule
    ],
    exports     : [
        BienvenueComponent
    ]
})
export class BienvenueModule
{
}
