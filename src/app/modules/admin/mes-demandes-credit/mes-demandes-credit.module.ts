import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FuseCardModule } from '@fuse/components/card';
import { MesDemandesCreditComponent } from './mes-demandes-credit.component';
import { mesDemandesCreditRoutes } from './mes-demandes-credit.routing';
import { PageHeaderConnecteModule } from 'app/modules/common/page-header-connecte/page-header-connecte.module';

@NgModule({
    declarations: [
        MesDemandesCreditComponent
    ],
    imports     : [
        RouterModule.forChild(mesDemandesCreditRoutes),
        SharedModule,
        MatButtonModule,
        MatIconModule,
        FuseCardModule,
        PageHeaderConnecteModule
    ],
    exports     : [
        MesDemandesCreditComponent
    ]
})
export class MesDemandesCreditModule
{
}
