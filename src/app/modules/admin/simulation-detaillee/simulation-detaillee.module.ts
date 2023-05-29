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
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { SimulationDetailleeComponent } from './simulation-detaillee.component';
import { simulationDetailleeRoutes } from './simulation-detaillee.routing';
import { BienvenueModule } from 'app/modules/common/bienvenue/bienvenue.module';
import { DetailsSimulationModule } from 'app/modules/common/details-simulation/details-simulation.module';
import { MAT_AUTOCOMPLETE_SCROLL_STRATEGY, MatAutocompleteModule } from '@angular/material/autocomplete';
import { BlockScrollStrategy, Overlay } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { FormatMontantModule } from '@fuse/directives/formatage-montant/format-montant.module';
import { FormatTelephoneModule } from '@fuse/directives/formatage-telephone/format-tele.module';
import { FormatEntierModule } from '@fuse/directives/formatage-entier/format-entier.module';
import { CaptchaModule } from '@fuse/captcha/captcha.module';
import { ReactiveFormsModule } from '@angular/forms';
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
        BienvenueModule,
        DetailsSimulationModule,
        MatAutocompleteModule,
        CommonModule,
        FormatMontantModule,
        FormatTelephoneModule,
        FormatEntierModule,
        ReactiveFormsModule,
        CaptchaModule
    ],
    
    providers   : [
        DecimalPipe,
        CurrencyPipe,
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
        },
        {
            provide   : MAT_AUTOCOMPLETE_SCROLL_STRATEGY,
            useFactory: (overlay: Overlay) => (): BlockScrollStrategy => overlay.scrollStrategies.block(),
            deps      : [Overlay]
        }
    ],
    exports     : [
        SimulationDetailleeComponent
    ]
})
export class SimulationDetailleeModule
{
}
