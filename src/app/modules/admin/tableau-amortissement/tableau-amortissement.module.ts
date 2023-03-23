import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRippleModule } from '@angular/material/core';
import { MatSortModule } from '@angular/material/sort';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from 'app/shared/shared.module';
import { TableauAmortissementComponent } from './tableau-amortissement.component';
import { tableauAmortissementRoutes } from './tableau-amortissement.routing';

@NgModule({
    declarations: [
        TableauAmortissementComponent
    ],
    imports     : [
        RouterModule.forChild(tableauAmortissementRoutes),
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatRippleModule,
        MatSortModule,
        MatSlideToggleModule,
        MatTooltipModule,
        SharedModule
    ]
})
export class TableauAmortissementModule
{
}
