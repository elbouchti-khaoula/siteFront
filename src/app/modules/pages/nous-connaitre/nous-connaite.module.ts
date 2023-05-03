import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NousConnaitreComponent } from './nous-connaite.component';
import { nousConnaiteRoutes } from './nous-connaite.routing';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
    declarations: [
        NousConnaitreComponent,
    ],
    imports     : [
        RouterModule.forChild(nousConnaiteRoutes),
        SharedModule
    ]
})
export class NousConnaitreModule
{
}
