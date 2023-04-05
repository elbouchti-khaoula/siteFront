import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { CinqEtapesComponent } from './cinq-etapes.component';

@NgModule({
    declarations: [
        CinqEtapesComponent
    ],
    imports     : [
        SharedModule,
        MatIconModule,
    ],
    exports     : [
        CinqEtapesComponent
    ]
})
export class CinqEtapesModule
{
}
