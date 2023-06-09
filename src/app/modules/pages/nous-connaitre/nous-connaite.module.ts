import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NousConnaitreComponent } from './nous-connaite.component';
import { nousConnaiteRoutes } from './nous-connaite.routing';
import { SharedModule } from 'app/shared/shared.module';
import { FuseCardModule } from '@fuse/components/card';
import { MatIconModule } from '@angular/material/icon';
import { PageHeaderModule } from 'app/modules/common/page-header/page-header.module';

@NgModule({
    declarations: [
        NousConnaitreComponent,
    ],
    imports     : [
        RouterModule.forChild(nousConnaiteRoutes),
        FuseCardModule,
        SharedModule,
        MatIconModule,
        PageHeaderModule
    ]
})
export class NousConnaitreModule
{
}
