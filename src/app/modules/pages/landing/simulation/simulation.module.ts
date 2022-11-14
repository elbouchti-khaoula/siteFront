import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';

import { SimulationComponent } from './simulation.component';

@NgModule({
    declarations: [
        SimulationComponent
    ],
    imports     : [
        RouterModule,
        MatButtonModule,
        MatSliderModule,
        SharedModule
    ],
    exports     : [
        SimulationComponent
    ]
})
export class SimulationModule
{
}
