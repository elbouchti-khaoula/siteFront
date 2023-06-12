import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';

import { NosConventionsComponent } from './nos-conventions.component';
import { nosConventionsRoutes } from './nos-conventions.routing';
import { PageHeaderModule } from 'app/modules/common/page-header/page-header.module';

@NgModule({
    declarations: [
        NosConventionsComponent,
    ],
    imports     : [
        RouterModule.forChild(nosConventionsRoutes),
        SharedModule,
        MatButtonModule,
        MatIconModule,
        MatExpansionModule,
        PageHeaderModule
    ]
})
export class NosConventionsModule
{
}
