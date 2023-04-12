import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { SwiperModule } from 'swiper/angular';
import { GoogleMapsModule } from '@angular/google-maps';

import { SimulationModule } from 'app/modules/common/simulation/simulation.module';
import { ProjetComponent } from './projet.component';
import { FaitesVousRappelerComponent } from './faites-vous-rappeler/faites-vous-rappeler.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
    declarations: [
        ProjetComponent,
        FaitesVousRappelerComponent
    ],
    imports     : [
        RouterModule,
        SharedModule,
        SimulationModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatDividerModule,
        SwiperModule,
        GoogleMapsModule,
        MatDialogModule
    ],
    exports     : [
        ProjetComponent
    ]
})
export class ProjetModule
{
}
