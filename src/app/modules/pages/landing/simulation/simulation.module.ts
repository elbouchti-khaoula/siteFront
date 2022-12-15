import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { AnimateAfterAppearModule } from '@fuse/animations/directive/animate-after-appear.module';
import { SimulationComponent } from './simulation.component';

@NgModule({
    declarations: [
        SimulationComponent
    ],
    imports     : [
        RouterModule,
        MatButtonModule,
        MatSliderModule,
        SharedModule,
        AnimateAfterAppearModule
    ],
    exports     : [
        SimulationComponent
    ]
})
export class SimulationModule
{
}
