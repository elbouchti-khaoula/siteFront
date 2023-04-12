import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { ProjetsFilterComponent } from './projets-filter.component';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { DisableControlModule } from '@fuse/directives/disabled/disabled.module';

@NgModule({
    declarations: [
        ProjetsFilterComponent
    ],
    imports     : [
        RouterModule,
        SharedModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        DisableControlModule
    ],
    exports     : [
        ProjetsFilterComponent
    ]
})
export class ProjetsFilterModule
{
}
