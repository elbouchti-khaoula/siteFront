import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FuseCardModule } from '@fuse/components/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import * as moment from 'moment';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SimulationDetailleeComponent } from './simulation-detaillee.component';
import { simulationDetailleeRoutes } from './simulation-detaillee.routing';
import { TableauAmortissementModule } from '../tableau-amortissement/tableau-amortissement.module';

@NgModule({
    declarations: [
        SimulationDetailleeComponent
    ],
    imports     : [
        RouterModule.forChild(simulationDetailleeRoutes),
        SharedModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatCheckboxModule,
        MatRadioModule,
        FuseCardModule,
        MatStepperModule,
        MatDatepickerModule,
        MatMomentDateModule,
        MatSidenavModule,
        TableauAmortissementModule
    ],
    providers   : [
        {
            provide : MAT_DATE_FORMATS,
            useValue: {
                parse  : {
                    dateInput: moment.ISO_8601
                },
                display: {
                    dateInput         : 'll',
                    monthYearLabel    : 'MMM YYYY',
                    dateA11yLabel     : 'LL',
                    monthYearA11yLabel: 'MMMM YYYY'
                }
            }
        }
    ],
    exports     : [
        SimulationDetailleeComponent
    ]
})
export class SimulationDetailleeModule
{
}
