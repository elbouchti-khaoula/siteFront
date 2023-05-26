import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NotrePolitiqueRseComponent } from './notre-politique-rse.component';
import { notrePolitiqueRseRoutes } from './notre-politique-rse.routing';
import { SharedModule } from 'app/shared/shared.module';
import { FuseCardModule } from '@fuse/components/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BienvenueModule } from 'app/modules/common/bienvenue/bienvenue.module';
import { ContactezNousModule } from '../landing/contactez-nous/contactez-nous.module';
import { DetailParInitiativeComponent } from './detail-par-initiative/detail-par-initiative.component';



@NgModule({
    declarations: [
        NotrePolitiqueRseComponent,
        DetailParInitiativeComponent
    ],
    imports     : [
        RouterModule.forChild(notrePolitiqueRseRoutes),
        FuseCardModule,
        SharedModule,
        MatButtonModule,
        MatIconModule,
        BienvenueModule,
        ContactezNousModule
    ]
})
export class NotrePolitiqueRseModule
{
}
