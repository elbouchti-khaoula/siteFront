import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { RechercheVilleComponent } from './recherche-ville.component';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        RechercheVilleComponent
    ],
    imports     : [
        RouterModule,
        SharedModule,
        MatIconModule,
    ],
    exports     : [
        RechercheVilleComponent
    ]
})
export class RechercheVilleModule
{
}
