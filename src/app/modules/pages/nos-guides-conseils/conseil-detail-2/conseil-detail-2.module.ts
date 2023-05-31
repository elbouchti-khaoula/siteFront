import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Detail2Component } from './conseil-detail-2.component';
import { nosGuidesConseilsRoutes } from './conseil-detail-2.routing';
import { SharedModule } from 'app/shared/shared.module';
import { FuseCardModule } from '@fuse/components/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ContactezNousModule } from 'app/modules/pages/landing/contactez-nous/contactez-nous.module';




@NgModule({
    declarations: [
        Detail2Component,
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
export class Detail2Module
{
}
