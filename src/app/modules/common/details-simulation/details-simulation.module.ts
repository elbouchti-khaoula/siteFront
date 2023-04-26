import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FuseCardModule } from '@fuse/components/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BienvenueModule } from 'app/modules/common/bienvenue/bienvenue.module';
import { DetailsSimulationComponent } from './details-simulation.component';
import { TableauAmortissementModule } from '../../admin/tableau-amortissement/tableau-amortissement.module';

@NgModule({
    declarations: [
        DetailsSimulationComponent
    ],
    imports     : [
        RouterModule,
        SharedModule,
        MatButtonModule,
        MatIconModule,
        FuseCardModule,
        MatSidenavModule,
        TableauAmortissementModule,
        BienvenueModule
    ],
    exports     : [
        DetailsSimulationComponent
    ]
})
export class DetailsSimulationModule
{
}
