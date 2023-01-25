import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NousConnaiteComponent } from './nous-connaite.component';
import { nousConnaiteRoutes } from './nous-connaite.routing';
import { SharedModule } from 'app/shared/shared.module';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    declarations: [
        NousConnaiteComponent,
    ],
    imports     : [
        RouterModule.forChild(nousConnaiteRoutes),
        SharedModule,
        MatIconModule
    ]
})
export class NousConnaitreModule
{
}
