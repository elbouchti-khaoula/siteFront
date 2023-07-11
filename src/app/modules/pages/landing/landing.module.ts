import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoLocaleModule } from '@ngneat/transloco-locale';
import { TranslocoModule } from '@ngneat/transloco';
import { FuseCardModule } from '@fuse/components/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { LandingComponent } from './landing.component';
import { landingRoutes } from './landing.routing';

import { ProjetsFilterModule } from 'app/modules/common/projets-filter/projets-filter.module';
import { SimulationModule } from 'app/modules/common/simulation/simulation.module';
import { ContactezNousModule } from 'app/modules/common/contactez-nous/contactez-nous.module';
import { ParcoursModule } from 'app/modules/common/parcours/parcours.module';
import { ParcoursSmallModule } from 'app/modules/common/parcours-small/parcours-small.module';
import { VosAvantagesModule } from './nos-avantages/vos-avantages.module';
import { RechercheVilleModule } from './recherche-ville/recherche-ville.module';
import { NousChoisirModule } from './nous-choisir/nous-choisir.module';
import { CinqEtapesModule } from './cinq-etapes/cinq-etapes.module';
import { ActualitesModule } from './actualites/actualites.module';

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
        FuseCardModule,
        MatTabsModule,
        MatFormFieldModule,
        MatInputModule,

        
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
export class LandingModule
{
}
