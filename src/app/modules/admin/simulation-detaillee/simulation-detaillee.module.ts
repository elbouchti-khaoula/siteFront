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
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { SimulationDetailleeComponent } from './simulation-detaillee.component';
import { simulationDetailleeRoutes } from './simulation-detaillee.routing';
import { DetailsSimulationModule } from 'app/modules/common/details-simulation/details-simulation.module';
import { MAT_AUTOCOMPLETE_SCROLL_STRATEGY, MatAutocompleteModule } from '@angular/material/autocomplete';
import { BlockScrollStrategy, Overlay } from '@angular/cdk/overlay';
import { FormatMontantModule } from 'app/core/directives/formatage-montant/format-montant.module';
import { FormatTelephoneModule } from 'app/core/directives/formatage-telephone/format-tele.module';
import { FormatEntierModule } from 'app/core/directives/formatage-entier/format-entier.module';
import { CaptchaModule } from 'app/modules/common/captcha/captcha.module';
import { PageHeaderConnecteModule } from 'app/modules/common/page-header-connecte/page-header-connecte.module';

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
        DetailsSimulationModule,
        MatAutocompleteModule,
        FormatMontantModule,
        FormatTelephoneModule,
        FormatEntierModule,
        CaptchaModule,
        PageHeaderConnecteModule
    ],
    
    providers   : [
        DecimalPipe,
        CurrencyPipe,
        { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' },
        {
            provide : MAT_DATE_FORMATS,
            useValue: {
                parse  : {
                    dateInput: 'DD/MM/YYYY'
                },
                display: {
                    dateInput: 'DD/MM/YYYY',
                    monthYearLabel: 'MMMM YYYY',
                    dateA11yLabel: 'LL',
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
