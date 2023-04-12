import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AgencesComponent } from './agences.component';
import { agencesRoutes } from './agences.routing';
import { LocalisationModule } from 'app/modules/common/localisation/localisation.module';
import { AgencesResultComponent } from './agence-result/agences-result.component';

@NgModule({
    declarations: [
        AgencesComponent,
        AgencesResultComponent
    ],
    imports     : [
        RouterModule.forChild(agencesRoutes),
        SharedModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatSelectModule,
        MatSidenavModule,
        LocalisationModule
    ]
})
export class AgencesModule
{
}
