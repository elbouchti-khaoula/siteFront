import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FuseCardModule } from '@fuse/components/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { MesCreditsComponent } from './mes-credits.component';
import { mesCreditsRoutes } from './mes-credits.routing';
import { BienvenueModule } from 'app/modules/common/bienvenue/bienvenue.module';
import { OperationsSAVRefModule } from './opeartion-sav-ref/operations-sav-ref.module';

@NgModule({
    declarations: [
        MesCreditsComponent
    ],
    imports     : [
        RouterModule.forChild(mesCreditsRoutes),
        SharedModule,
        MatButtonModule,
        MatIconModule,
        FuseCardModule,
        MatProgressBarModule,
        BienvenueModule,
        OperationsSAVRefModule
    ],
    exports     : [
        MesCreditsComponent
    ]
})
export class MesCreditsModule
{
}
