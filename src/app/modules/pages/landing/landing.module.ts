import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { LandingComponent } from './landing.component';
import { landingRoutes } from './landing.routing';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { TranslocoLocaleModule } from '@ngneat/transloco-locale';
import { TranslocoModule } from '@ngneat/transloco';
import { CinqEtapesModule } from './cinqetapes/cinq-etapes.module';
import { SimulationModule } from './simulation/simulation.module';
import { NousChoisirModule } from './nouschoisir/nous-choisir.module';
import { ActualitesModule } from './actualites/actualites.module';

@NgModule({
    declarations: [
        LandingComponent,
    ],
    imports     : [
        RouterModule.forChild(landingRoutes),
        SharedModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatExpansionModule,
        MatSelectModule,
        TranslocoModule,
        TranslocoLocaleModule,

        SimulationModule,
        NousChoisirModule,
        ActualitesModule,
        CinqEtapesModule,
    ]
})
export class LandingModule
{
}
