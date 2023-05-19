import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { ParcoursComponent } from './parcours.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    declarations: [
        ParcoursComponent
    ],
    imports     : [
        RouterModule,
        SharedModule,
        MatButtonModule,
        MatIconModule
    ],
    exports     : [
        ParcoursComponent
    ]
})
export class ParcoursModule
{
}
