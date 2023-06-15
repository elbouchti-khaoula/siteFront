import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NosGuidesConseilsComponent } from './nos-guides-conseils.component';
import { nosGuidesConseilsRoutes } from './nos-guides-conseils.routing';
import { SharedModule } from 'app/shared/shared.module';
import { FuseCardModule } from '@fuse/components/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ContactezNousModule } from 'app/modules/common/contactez-nous/contactez-nous.module';

@NgModule({
    declarations: [
        NosGuidesConseilsComponent,
    ],
    imports     : [
        RouterModule.forChild(nosGuidesConseilsRoutes),
        FuseCardModule,
        SharedModule,
        MatButtonModule,
        MatIconModule,
        ContactezNousModule
    ]
})
export class NosGidesConseilsModule
{
}
