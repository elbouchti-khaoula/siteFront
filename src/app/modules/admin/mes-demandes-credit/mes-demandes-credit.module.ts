import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MesDemandesCreditComponent } from './mes-demandes-credit.component';
import { mesDemandesCreditRoutes } from './mes-demandes-credit.routing';
import { BienvenueModule } from 'app/modules/common/bienvenue/bienvenue.module';

@NgModule({
    declarations: [
        MesDemandesCreditComponent
    ],
    imports     : [
        RouterModule.forChild(mesDemandesCreditRoutes),
        SharedModule,
        MatButtonModule,
        MatIconModule,
        BienvenueModule
    ],
    exports     : [
        MesDemandesCreditComponent
    ]
})
export class MesDemandesCreditModule
{
}
