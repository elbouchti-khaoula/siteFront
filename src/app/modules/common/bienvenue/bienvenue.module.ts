import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { BienvenueComponent } from './bienvenue.component';

@NgModule({
    declarations: [
        BienvenueComponent
    ],
    imports     : [
        SharedModule,
        MatIconModule
    ],
    exports     : [
        BienvenueComponent
    ]
})
export class BienvenueModule
{
}
