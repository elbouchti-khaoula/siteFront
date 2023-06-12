import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FuseCardModule } from '@fuse/components/card';
import { MatSidenavModule } from '@angular/material/sidenav';

import { consulterSimulationRoutes } from './consulter-simulation.routing';
import { ConsulterSimulationComponent } from './consulter-simulation.component';
import { TableauAmortissementModule } from '../tableau-amortissement/tableau-amortissement.module';
import { DetailsSimulationModule } from 'app/modules/common/details-simulation/details-simulation.module';
import { PageHeaderModule } from 'app/modules/common/page-header/page-header.module';

@NgModule({
    declarations: [
        ConsulterSimulationComponent
    ],
    imports     : [
        RouterModule.forChild(consulterSimulationRoutes),
        SharedModule,
        MatButtonModule,
        MatIconModule,
        FuseCardModule,
        MatSidenavModule,
        TableauAmortissementModule,
        DetailsSimulationModule,
        PageHeaderModule
    ],
    exports     : [
        ConsulterSimulationComponent
    ]
})
export class ConsulterSimulationModule
{
}
