import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FuseCardModule } from '@fuse/components/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MesSimulationsComponent } from './mes-simulations.component';
import { mesSimulationsRoutes } from './mes-simulations.routing';
import { BienvenueModule } from 'app/modules/common/bienvenue/bienvenue.module';

@NgModule({
    declarations: [
        MesSimulationsComponent
    ],
    imports     : [
        RouterModule.forChild(mesSimulationsRoutes),
        SharedModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
        FuseCardModule,
        MatSidenavModule,
        BienvenueModule
    ],
    exports     : [
        MesSimulationsComponent
    ]
})
export class MesSimulationsModule
{
}
