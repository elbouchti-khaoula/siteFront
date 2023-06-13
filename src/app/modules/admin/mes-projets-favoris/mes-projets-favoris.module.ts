import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FuseCardModule } from '@fuse/components/card';
import { MesProjetsFavorisComponent } from './mes-projets-favoris.component';
import { mesProjetsFavorisRoutes } from './mes-projets-favoris.routing';
import { PageHeaderConnecteModule } from 'app/modules/common/page-header-connecte/page-header-connecte.module';

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
        PageHeaderConnecteModule
    ],
    exports     : [
        MesProjetsFavorisComponent
    ]
})
export class MesProjetsFavorisModule
{
}
