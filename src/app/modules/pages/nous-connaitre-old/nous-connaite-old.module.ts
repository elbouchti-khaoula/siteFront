import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NousConnaiteOldComponent } from './nous-connaite-old.component';
import { nousConnaiteRoutes } from './nous-connaite-old.routing';
import { SharedModule } from 'app/shared/shared.module';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    declarations: [
        NousConnaiteOldComponent,
    ],
    imports     : [
        RouterModule.forChild(nousConnaiteRoutes),
        SharedModule,
        MatIconModule
    ]
})
export class NousConnaitreOldModule
{
}
