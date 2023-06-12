import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FuseCardModule } from '@fuse/components/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { MesCreditsComponent } from './mes-credits.component';
import { mesCreditsRoutes } from './mes-credits.routing';
import { OperationsSAVRefModule } from './opeartion-sav-ref/operations-sav-ref.module';
import { PageHeaderModule } from 'app/modules/common/page-header/page-header.module';

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
        OperationsSAVRefModule,
        PageHeaderModule
    ],
    exports     : [
        MesCreditsComponent
    ]
})
export class MesCreditsModule
{
}
