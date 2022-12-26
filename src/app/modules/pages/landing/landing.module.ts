import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoLocaleModule } from '@ngneat/transloco-locale';
import { TranslocoModule } from '@ngneat/transloco';

import { LandingComponent } from './landing.component';
import { landingRoutes } from './landing.routing';
import { CinqEtapesModule } from './cinqetapes/cinq-etapes.module';
import { SimulationModule } from '../common/simulation/simulation.module';
import { NousChoisirModule } from './nouschoisir/nous-choisir.module';
import { ActualitesModule } from './actualites/actualites.module';
import { ProjetsFilterModule } from '../common/projetsFilter/projets-filter.module';
import { ContactezNousComponent } from './contactez-nous/contactez-nous.component';

@NgModule({
    declarations: [
        LandingComponent,
        ContactezNousComponent
    ],
    imports     : [
        RouterModule.forChild(landingRoutes),
        SharedModule,
        MatButtonModule,
        MatIconModule,
        TranslocoModule,
        TranslocoLocaleModule,

        ProjetsFilterModule,
        SimulationModule,
        NousChoisirModule,
        ActualitesModule,
        CinqEtapesModule,
    ]
})
export class LandingModule
{
}
