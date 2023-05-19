import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EspaceConnectedClientComponent } from './espace-connected-client.component';
import { EspaceConnectedRoutes } from './espace-connected-client.routing';
import { SharedModule } from 'app/shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { VosAvantagesModule } from '../../pages/landing/nos-avantages/vos-avantages.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { ProjetsFilterModule } from 'app/modules/common/projetsFilter/projets-filter.module';
import { FuseCardModule } from '@fuse/components/card';


@NgModule({
    declarations: [
        EspaceConnectedClientComponent,
    ],
    imports     : [
        RouterModule.forChild(EspaceConnectedRoutes),
        SharedModule,
        VosAvantagesModule,
        MatIconModule,
        MatMenuModule,
        ProjetsFilterModule,
        MatCardModule,
        MatExpansionModule,
       MatButtonModule,
       FuseCardModule
    ]
})
export class EspaceConnectedClientModule
{

}
