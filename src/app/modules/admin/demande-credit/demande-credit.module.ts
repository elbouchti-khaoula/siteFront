import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FuseCardModule } from '@fuse/components/card';
import { MatSidenavModule } from '@angular/material/sidenav';

import { DemandeCreditComponent } from './demande-credit.component';
import { demandeCreditRoutes } from './demande-credit.routing';
import { ChangerAgenceModule } from './changer-agence/changer-agence.module';
import { TableauAmortissementModule } from '../tableau-amortissement/tableau-amortissement.module';
import { BienvenueModule } from 'app/modules/common/bienvenue/bienvenue.module';

@NgModule({
    declarations: [
        DemandeCreditComponent
    ],
    imports     : [
        RouterModule.forChild(demandeCreditRoutes),
        SharedModule,
        MatButtonModule,
        MatIconModule,
        FuseCardModule,
        MatSidenavModule,
        ChangerAgenceModule,
        TableauAmortissementModule,
        BienvenueModule
    ],
    exports     : [
        DemandeCreditComponent
    ]
})
export class DemandeCreditModule
{
}
