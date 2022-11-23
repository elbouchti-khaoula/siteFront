import { NgModule } from '@angular/core';
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
        
    ],
    exports     : [
        ActualitesComponent

    ]
})
export class ActualitesModule
{
}
