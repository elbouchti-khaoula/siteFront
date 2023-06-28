import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NosLettresWiComponent } from './nos-lettres-wi.component';
import { nosLettresWiComponentRoutes } from './nos-lettres-wi.routing';
import { SharedModule } from 'app/shared/shared.module';
import { FuseCardModule } from '@fuse/components/card';
import { MatIconModule } from '@angular/material/icon';
import { ContactezNousModule } from 'app/modules/common/contactez-nous/contactez-nous.module';
import { PageHeaderModule } from 'app/modules/common/page-header/page-header.module';

@NgModule({
    declarations: [
        NosLettresWiComponent,
    ],
    imports     : [
        RouterModule.forChild(nosLettresWiComponentRoutes),
        SharedModule,
        FuseCardModule,
        MatIconModule,
        ContactezNousModule,
        PageHeaderModule
    ]
})
export class NosLettresWiModule
{
}
