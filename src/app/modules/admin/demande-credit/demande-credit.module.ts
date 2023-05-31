import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FuseCardModule } from '@fuse/components/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { DemandeCreditComponent } from './demande-credit.component';
import { demandeCreditRoutes } from './demande-credit.routing';
import { ChangerAgenceModule } from './changer-agence/changer-agence.module';
import { TableauAmortissementModule } from '../tableau-amortissement/tableau-amortissement.module';
import { BienvenueModule } from 'app/modules/common/bienvenue/bienvenue.module';
import { CheckListModule } from 'app/modules/common/check-list/check-list.module';
import { FormatTelephoneModule } from '@fuse/directives/formatage-telephone/format-tele.module';
import { FormatTelephonePipeModule } from '@fuse/pipes/format-telephone-pipe/format-telephone-pipe.module';
import { CaptchaModule } from 'app/core/captcha/captcha.module';

@NgModule({
    declarations: [
        DemandeCreditComponent
    ],
    imports     : [
        RouterModule.forChild(demandeCreditRoutes),
        SharedModule,
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        FuseCardModule,
        MatSidenavModule,
        ChangerAgenceModule,
        TableauAmortissementModule,
        BienvenueModule,
        CheckListModule,
        FormatTelephoneModule,
        FormatTelephonePipeModule,
        CaptchaModule
    ],
    exports     : [
        DemandeCreditComponent
    ]
})
export class DemandeCreditModule
{
}
