import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EspaceConnectedComponent } from './espace-connected.component';
import { EspaceConnectedRoutes } from './espace-connected.routing';
import { SharedModule } from 'app/shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { VosAvantagesModule } from '../../pages/landing/nos-avantages/vos-avantages.module';
import { NousChoisirModule } from '../../pages/landing/nouschoisir/nous-choisir.module';

@NgModule({
    declarations: [
        EspaceConnectedComponent,
    ],
    imports     : [
        RouterModule.forChild(EspaceConnectedRoutes),
        SharedModule,
        VosAvantagesModule,
        MatIconModule,
        NousChoisirModule
    ]
})
export class EspaceConnectedModule
{

}
