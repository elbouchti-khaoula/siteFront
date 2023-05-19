import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FuseCardModule } from '@fuse/components/card';
import { MesProjetsFavorisComponent } from './mes-projets-favoris.component';
import { mesProjetsFavorisRoutes } from './mes-projets-favoris.routing';
import { BienvenueModule } from 'app/modules/common/bienvenue/bienvenue.module';

@NgModule({
    declarations: [
        MesProjetsFavorisComponent
    ],
    imports     : [
        RouterModule.forChild(mesProjetsFavorisRoutes),
        SharedModule,
        MatButtonModule,
        MatIconModule,
        FuseCardModule,
        BienvenueModule
    ],
    exports     : [
        MesProjetsFavorisComponent
    ]
})
export class MesProjetsFavorisModule
{
}
