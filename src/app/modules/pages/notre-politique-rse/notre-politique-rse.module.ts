import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NotrePolitiqueRseComponent } from './notre-politique-rse.component';
import { notrePolitiqueRseRoutes } from './notre-politique-rse.routing';
import { SharedModule } from 'app/shared/shared.module';
import { FuseCardModule } from '@fuse/components/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ContactezNousModule } from '../landing/contactez-nous/contactez-nous.module';
import { DetailParInitiativeComponent } from './detail-par-initiative/detail-par-initiative.component';
import { PageHeaderModule } from 'app/modules/common/page-header/page-header.module';
import { SwiperModule } from 'swiper/angular';
import { Navigation, Pagination } from 'swiper';
@NgModule({
    declarations: [
        NotrePolitiqueRseComponent,
        DetailParInitiativeComponent
    ],
    imports     : [
        RouterModule.forChild(notrePolitiqueRseRoutes),
        FuseCardModule,
        SharedModule,
        MatButtonModule,
        MatIconModule,
        ContactezNousModule,
        PageHeaderModule,
        SwiperModule
    ]
})
export class NotrePolitiqueRseModule
{
}
