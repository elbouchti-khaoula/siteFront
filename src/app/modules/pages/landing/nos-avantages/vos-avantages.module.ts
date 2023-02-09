import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'app/shared/shared.module';
import { VosAvantagesComponent } from './vos-avantages.component';

@NgModule({
    declarations: [
        VosAvantagesComponent
    ],
    imports     : [
        SharedModule,
        MatIconModule
    ],
    exports     : [
        VosAvantagesComponent
    ]
})
export class VosAvantagesModule
{
}
