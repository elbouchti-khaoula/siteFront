import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from 'app/shared/shared.module';
import { SwiperModule } from 'swiper/angular';
import { MatDividerModule } from '@angular/material/divider';
import { SimulationModule } from 'app/modules/pages/landing/simulation/simulation.module';
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
        SwiperModule,
        MatDividerModule
    ],
    exports     : [
        ProjetComponent
    ]
})
export class ProjetModule
{
}
