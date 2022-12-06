import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { AnimateAfterAppearModule } from '@fuse/animations/directive/animate-after-appear.module';
import { CinqEtapesComponent } from './cinq-etapes.component';

@NgModule({
    declarations: [
        CinqEtapesComponent
    ],
    imports     : [
        SharedModule,
        AnimateAfterAppearModule
    ],
    exports     : [
        CinqEtapesComponent
    ]
})
export class CinqEtapesModule
{
}
