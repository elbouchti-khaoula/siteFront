import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FuseCardModule } from '@fuse/components/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { DemandeSAVComponent } from './demande-sav.component';
import { demandeCreditRoutes } from './demande-sav.routing';
import { BienvenueModule } from 'app/modules/common/bienvenue/bienvenue.module';
import { CheckListModule } from 'app/modules/common/check-list/check-list.module';

@NgModule({
    declarations: [
        DemandeSAVComponent
    ],
    imports     : [
        RouterModule.forChild(demandeCreditRoutes),
        SharedModule,
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatProgressBarModule,
        MatFormFieldModule,
        MatInputModule,
        FuseCardModule,
        BienvenueModule,
        CheckListModule
    ],
    exports     : [
        DemandeSAVComponent
    ]
})
export class DemandeSAVModule
{
}