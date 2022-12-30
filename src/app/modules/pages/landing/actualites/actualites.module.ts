import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { ActualitesComponent } from './actualites.component';


@NgModule({
    declarations: [
        ActualitesComponent
    ],
    imports     : [
        RouterModule,
        SharedModule,
        MatButtonModule,
    ],
    exports     : [
        ActualitesComponent

    ]
})
export class ActualitesModule
{
}
