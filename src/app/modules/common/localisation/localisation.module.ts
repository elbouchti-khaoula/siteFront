import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { MatIconModule } from '@angular/material/icon';

import { GoogleMapsModule } from '@angular/google-maps';
import { LocalisationComponent } from './localisation.component';

@NgModule({
    declarations: [
        LocalisationComponent
    ],
    imports     : [
        RouterModule,
        SharedModule,
        GoogleMapsModule,
        MatIconModule
    ],
    exports     : [
        LocalisationComponent
    ]
})
export class LocalisationModule
{
}
