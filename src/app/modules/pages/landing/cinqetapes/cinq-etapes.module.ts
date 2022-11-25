import { NgModule } from '@angular/core';
import { VisibilityModule } from '@fuse/directives/visible/visible.module';
import { SharedModule } from 'app/shared/shared.module';
import { CinqEtapesComponent } from './cinq-etapes.component';

@NgModule({
    declarations: [
        CinqEtapesComponent
    ],
    imports     : [
        SharedModule,
        VisibilityModule
    ],
    exports     : [
        CinqEtapesComponent
    ]
})
export class CinqEtapesModule
{
}
