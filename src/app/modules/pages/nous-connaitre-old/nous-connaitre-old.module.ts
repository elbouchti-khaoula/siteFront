import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { MatIconModule } from '@angular/material/icon';

import { NousConnaitreOldComponent } from './nous-connaitre-old.component';
import { nousConnaitreRoutes } from './nous-connaitre-old.routing';

@NgModule({
    declarations: [
        NousConnaitreOldComponent,
    ],
    imports     : [
        RouterModule.forChild(nousConnaitreRoutes),
        SharedModule,
        MatIconModule
    ]
})
export class NousConnaitreOldModule
{
}
