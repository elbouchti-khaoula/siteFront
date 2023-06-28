import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NosEtatsFinanciersComponent } from './nos-etats-financiers.component';
import { nosEtatsFinanciersRoutes } from './nos-etats-financiers.routing';
import { SharedModule } from 'app/shared/shared.module';
import { FuseCardModule } from '@fuse/components/card';
import { MatIconModule } from '@angular/material/icon';
import { ContactezNousModule } from 'app/modules/common/contactez-nous/contactez-nous.module';
import { PageHeaderModule } from 'app/modules/common/page-header/page-header.module';

@NgModule({
    declarations: [
        NosEtatsFinanciersComponent,
    ],
    imports     : [
        RouterModule.forChild(nosEtatsFinanciersRoutes),
        FuseCardModule,
        SharedModule,
        ContactezNousModule,
        MatIconModule,
        PageHeaderModule
    ]
})
export class NosEtatsFinanciersModule
{
}
