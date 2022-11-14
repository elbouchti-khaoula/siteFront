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
import { GoogleMapsModule } from '@angular/google-maps'

import { projetsSearchRoutes } from './projets-search.routing';

import { ProjetsFilterComponent } from './projetsFilter/projets-filter.component';
import { ProjetsSearchComponent } from './projets-search.component';
import { ProjetsResultComponent } from './projetsResult/projets-result.component';
import { ProjetContactComponent } from './projetsResult/contact/contact.component';
import { ProjetsComponent } from './projetsResult/projets/projets.component';
import { LocalisationComponent } from './projetsResult/localisation/localisation.component';

import { ProjetModule } from './projet/projet.module';

@NgModule({
    declarations: [
        ProjetsSearchComponent,
        ProjetsFilterComponent,
        ProjetsResultComponent,
        ProjetsComponent,
        LocalisationComponent,
        ProjetContactComponent,
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
        GoogleMapsModule,
        ProjetModule,
    ]
})
export class ProjetsSearchModule
{
}
