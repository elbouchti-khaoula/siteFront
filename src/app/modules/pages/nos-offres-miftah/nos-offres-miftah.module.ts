import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NosOffresMiftahComponent } from './nos-offres-miftah.component';
import { NosOffresMiftahRoutes } from './nos-offres-miftah.routing';
import { SharedModule } from 'app/shared/shared.module';
import { FuseCardModule } from '@fuse/components/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';




@NgModule({
    declarations: [
        NosOffresMiftahComponent,
    ],
    imports     : [
        RouterModule.forChild(NosOffresMiftahRoutes),
        FuseCardModule,
        SharedModule,
        MatButtonModule,
        MatIconModule
    ]
})
export class NosOffresMiftahModule
{
}
