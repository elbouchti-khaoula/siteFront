import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';

import { NosConventionsComponent } from './nos-conventions.component';
import { nosConventionsRoutes } from './nos-conventions.routing';

@NgModule({
    declarations: [
        NosConventionsComponent,
    ],
    imports     : [
        RouterModule.forChild(nosConventionsRoutes),
        SharedModule,
        MatIconModule,
        MatExpansionModule
    ]
})
export class NosConventionsModule
{
}
