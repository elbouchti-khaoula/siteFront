import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from 'app/shared/shared.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CarouselModule } from '@marcreichel/angular-carousel';
import { GoogleMapsModule } from '@angular/google-maps'

import { projetsSearchRoutes } from './projets-search.routing';

import { ProjetsSearchComponent } from './projets-search.component';
import { ProjetsResultComponent } from './projets-result/projets-result.component';
import { ProjetContactComponent } from './projets-result/contact/contact.component';
import { ProjetsComponent } from './projets-result/projets/projets.component';
import { LocalisationComponent } from './projets-result/localisation/localisation.component';

import { ProjetModule } from './projet/projet.module';
import { ProjetsFilterModule } from '../common/projetsFilter/projets-filter.module';

@NgModule({
    declarations: [
        ProjetsSearchComponent,
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
        MatSidenavModule,
        CarouselModule,
        GoogleMapsModule,

        ProjetsFilterModule,
        ProjetModule,
    ]
})
export class ProjetsSearchModule
{
}
