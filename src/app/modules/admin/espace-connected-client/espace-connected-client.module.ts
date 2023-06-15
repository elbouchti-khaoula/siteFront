import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FuseCardModule } from '@fuse/components/card';
import { MatExpansionModule } from '@angular/material/expansion';

import { EspaceConnectedClientComponent } from './espace-connected-client.component';
import { EspaceConnectedRoutes } from './espace-connected-client.routing';
import { ParcoursSmallModule } from 'app/modules/common/parcours-small/parcours-small.module';
import { PageHeaderConnecteModule } from 'app/modules/common/page-header-connecte/page-header-connecte.module';

@NgModule({
    declarations: [
        EspaceConnectedClientComponent,
    ],
    imports: [
        RouterModule.forChild(EspaceConnectedRoutes),
        SharedModule,
        MatIconModule,
        MatButtonModule,
        MatExpansionModule,
        ParcoursSmallModule,
        FuseCardModule,
        PageHeaderConnecteModule
    ]
})
export class EspaceConnectedClientModule {

}
