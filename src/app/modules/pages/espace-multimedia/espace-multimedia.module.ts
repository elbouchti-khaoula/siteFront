import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EspaceMultiMediaComponent } from './espace-multimedia.component';
import { nosGuidesConseilsRoutes } from './espace-multimedia.routing';
import { SharedModule } from 'app/shared/shared.module';
import { FuseCardModule } from '@fuse/components/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ContactezNousModule } from 'app/modules/common/contactez-nous/contactez-nous.module';
import { PageHeaderModule } from 'app/modules/common/page-header/page-header.module';

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
        ContactezNousModule,
        PageHeaderModule
    ]
})

export class EspaceMultiMediaModule
{
}
