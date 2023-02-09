import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoLocaleModule } from '@ngneat/transloco-locale';
import { TranslocoModule } from '@ngneat/transloco';

import { LandingComponent } from './landing.component';
import { landingRoutes } from './landing.routing';

import { ProjetsFilterModule } from '../common/projetsFilter/projets-filter.module';
import { VosAvantagesModule } from './nos-avantages/vos-avantages.module';
import { RechercheVilleModule } from './recherche-ville/recherche-ville.module';
import { SimulationModule } from '../common/simulation/simulation.module';
import { NousChoisirModule } from './nouschoisir/nous-choisir.module';
import { CinqEtapesModule } from './cinqetapes/cinq-etapes.module';
import { ActualitesModule } from './actualites/actualites.module';
import { ContactezNousModule } from './contactez-nous/contactez-nous.module';

@NgModule({
    declarations: [
        LandingComponent
    ],
    imports     : [
        RouterModule.forChild(landingRoutes),
        SharedModule,
        MatButtonModule,
        MatIconModule,
        TranslocoModule,
        TranslocoLocaleModule,

        ProjetsFilterModule,
        VosAvantagesModule,
        RechercheVilleModule,
        SimulationModule,
        NousChoisirModule,
        CinqEtapesModule,
        ActualitesModule,
        ContactezNousModule
    ]
})
export class LandingModule
{
}
