import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EspaceMultiMediaComponent } from './espace-multimedia.component';
import { nosGuidesConseilsRoutes } from './espace-multimedia.routing';
import { SharedModule } from 'app/shared/shared.module';
import { FuseCardModule } from '@fuse/components/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ContactezNousModule } from '../landing/contactez-nous/contactez-nous.module';




@NgModule({
    declarations: [
        EspaceMultiMediaComponent,
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
export class EspaceMultiMediaModule
{
}
