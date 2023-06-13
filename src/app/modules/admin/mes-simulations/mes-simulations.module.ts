import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FuseCardModule } from '@fuse/components/card';
import { MesSimulationsComponent } from './mes-simulations.component';
import { mesSimulationsRoutes } from './mes-simulations.routing';
import { PageHeaderConnecteModule } from 'app/modules/common/page-header-connecte/page-header-connecte.module';

@NgModule({
    declarations: [
        MesSimulationsComponent
    ],
    imports     : [
        RouterModule.forChild(mesSimulationsRoutes),
        SharedModule,
        MatButtonModule,
        MatIconModule,
        FuseCardModule,
        PageHeaderConnecteModule
    ],
    exports     : [
        MesSimulationsComponent
    ]
})
export class MesSimulationsModule
{
}
