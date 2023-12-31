import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CarouselModule } from '@marcreichel/angular-carousel';
import { FuseCardModule } from '@fuse/components/card';

import { projetsSearchRoutes } from './projets-search.routing';
import { ProjetsSearchComponent } from './projets-search.component';
import { ProjetsResultComponent } from './projets-result/projets-result.component';
import { ProjetContactComponent } from './projets-result/contact/contact.component';

import { ProjetsFilterModule } from 'app/modules/common/projets-filter/projets-filter.module';
import { LocalisationModule } from 'app/modules/common/localisation/localisation.module';
import { FormatTelephoneModule } from 'app/core/directives/formatage-telephone/format-tele.module';
import { PageHeaderConnecteModule } from 'app/modules/common/page-header-connecte/page-header-connecte.module';
import { ContactPromoteurModule } from 'app/modules/common/contact-promoteur/contact-promoteur.module';

@NgModule({
    declarations: [
        ProjetsSearchComponent,
        ProjetsResultComponent,
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
        FuseCardModule,

        ProjetsFilterModule,
        LocalisationModule,
        FormatTelephoneModule,
        PageHeaderConnecteModule,
        ContactPromoteurModule
    ]
})
export class ProjetsSearchModule
{
}
