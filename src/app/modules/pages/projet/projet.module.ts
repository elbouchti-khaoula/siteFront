import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { SwiperModule } from 'swiper/angular';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatDialogModule } from '@angular/material/dialog';

import { SimulationModule } from 'app/modules/common/simulation/simulation.module';
import { FormatTelephoneModule } from 'app/core/directives/formatage-telephone/format-tele.module';
import { ContactPromoteurModule } from 'app/modules/common/contact-promoteur/contact-promoteur.module';

import { ProjetComponent } from './projet.component';
import { MeRappelerPopupComponent } from './me-rappeler-popup/me-rappeler-popup.component';
import { ContactPromoteurPopupComponent } from './contact-promoteur-popup/contact-promoteur-popup.component';
import { projetRoutes } from './projet.routing';

@NgModule({
    declarations: [
        ProjetComponent,
        MeRappelerPopupComponent,
        ContactPromoteurPopupComponent
    ],
    imports     : [
        RouterModule.forChild(projetRoutes),
        SharedModule,
        SimulationModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatDividerModule,
        SwiperModule,
        GoogleMapsModule,
        MatDialogModule,
        FormatTelephoneModule,
        ContactPromoteurModule
    ],
    exports     : [
        ProjetComponent
    ]
})
export class ProjetModule
{
}
