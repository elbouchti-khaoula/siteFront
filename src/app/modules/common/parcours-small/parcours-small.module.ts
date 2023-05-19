import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { ParcoursSmallComponent } from './parcours-small.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    declarations: [
        ParcoursSmallComponent
    ],
    imports     : [
        RouterModule,
        SharedModule,
        MatButtonModule,
        MatIconModule
    ],
    exports     : [
        ParcoursSmallComponent
    ]
})
export class ParcoursSmallModule
{
}
