import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from 'app/shared/shared.module';
import { MatDividerModule } from '@angular/material/divider';
import { SwiperModule } from 'swiper/angular';
import { GoogleMapsModule } from '@angular/google-maps';

import { SimulationModule } from 'app/modules/pages/common/simulation/simulation.module';
import { ProjetComponent } from './projet.component';

@NgModule({
    declarations: [
        ProjetComponent,
    ],
    imports     : [
        RouterModule,
        SharedModule,
        SimulationModule,
        MatButtonModule,
        MatIconModule,
        MatDividerModule,
        SwiperModule,
        GoogleMapsModule
    ],
    exports     : [
        ProjetComponent
    ]
})
export class ProjetModule
{
}
