import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from 'app/shared/shared.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CarouselModule } from '@marcreichel/angular-carousel';
// import { AgmCoreModule } from '@agm/core';

import { projetsSearchRoutes } from './projets-search.routing';
import { ProjetsComponent } from './projetsResult/projets/projets.component';
import { LocalisationComponent } from './projetsResult/localisation/localisation.component';
import { ProjetsFilterComponent } from './projetsFilter/projets-filter.component';
import { ProjetsResultComponent } from './projetsResult/projets-result.component';
import { ProjetsSearchComponent } from './projets-search.component';

@NgModule({
    declarations: [
        ProjetsSearchComponent,
        ProjetsFilterComponent,
        ProjetsResultComponent,
        ProjetsComponent,
        LocalisationComponent
    ],
    imports     : [
        RouterModule.forChild(projetsSearchRoutes),
        SharedModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatSidenavModule,
        CarouselModule,
        // AgmCoreModule
    ]
})
export class ProjetsSearchModule
{
}
