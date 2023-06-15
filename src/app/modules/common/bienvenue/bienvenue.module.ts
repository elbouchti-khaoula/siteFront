import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { BienvenueComponent } from './bienvenue.component';

@NgModule({
    declarations: [
        BienvenueComponent
    ],
    imports     : [
        SharedModule,
        MatIconModule,
        MatExpansionModule
    ],
    exports     : [
        BienvenueComponent
    ]
})
export class BienvenueModule
{
}
