import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
// import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSortModule } from '@angular/material/sort';
import { SharedModule } from 'app/shared/shared.module';
import { TableauAmortissementComponent } from './tableau-amortissement.component';

@NgModule({
    declarations: [
        TableauAmortissementComponent
    ],
    imports     : [
        MatButtonModule,
        MatIconModule,
        MatPaginatorModule,
        // MatProgressBarModule,
        MatSortModule,
        SharedModule
    ],
    exports     : [
        TableauAmortissementComponent
    ]
})
export class TableauAmortissementModule
{
}
