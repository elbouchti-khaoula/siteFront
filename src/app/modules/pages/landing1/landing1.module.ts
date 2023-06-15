import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoLocaleModule } from '@ngneat/transloco-locale';
import { TranslocoModule } from '@ngneat/transloco';

import { Landing1Component } from './landing1.component';
import { landing1Routes } from './landing1.routing';

import { ProjetsFilterModule } from 'app/modules/common/projetsFilter/projets-filter.module';
import { SimulationModule } from 'app/modules/common/simulation/simulation.module';
import { ContactezNousModule } from 'app/modules/common/contactez-nous/contactez-nous.module';
import { ParcoursModule } from 'app/modules/common/parcours/parcours.module';
import { ParcoursSmallModule } from 'app/modules/common/parcours-small/parcours-small.module';
import { VosAvantagesModule } from '../landing/nos-avantages/vos-avantages.module';
import { RechercheVilleModule } from '../landing/recherche-ville/recherche-ville.module';
import { NousChoisirModule } from '../landing/nous-choisir/nous-choisir.module';
import { CinqEtapesModule } from '../landing/cinq-etapes/cinq-etapes.module';
import { ActualitesModule } from '../landing/actualites/actualites.module';

@NgModule({
    declarations: [
        Landing1Component
    ],
    imports     : [
        RouterModule.forChild(landing1Routes),
        SharedModule,
        MatButtonModule,
        MatIconModule,
        TranslocoModule,
        TranslocoLocaleModule,

        ProjetsFilterModule,
        ParcoursModule,
        ParcoursSmallModule,
        VosAvantagesModule,
        RechercheVilleModule,
        SimulationModule,
        NousChoisirModule,
        CinqEtapesModule,
        ActualitesModule,
        ContactezNousModule
    ]
})
export class Landing1Module
{
}
