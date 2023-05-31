import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { SimulationPersonaliseeComponent } from './simulation-personnalisee.component';
import { simulationPersonaliseeRoutes } from './simulation-personnalisee.routing';
import { FuseCardModule } from '@fuse/components/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatCommonModule } from '@angular/material/core';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { FormatMontantModule } from '@fuse/directives/formatage-montant/format-montant.module';
import { FormatTelephoneModule } from '@fuse/directives/formatage-telephone/format-tele.module';
import { FormatEntierModule } from '@fuse/directives/formatage-entier/format-entier.module';
import { CaptchaModule } from 'app/core/captcha/captcha.module';

@NgModule({
    declarations: [
        SimulationPersonaliseeComponent
    ],
    imports     : [
        RouterModule.forChild(simulationPersonaliseeRoutes),
        SharedModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatCheckboxModule,
        MatRadioModule,
        FuseCardModule,
        MatCommonModule,
        FormatMontantModule,
        FormatTelephoneModule,
        FormatEntierModule,
        CaptchaModule
    ],
    exports     : [
        SimulationPersonaliseeComponent
    ],
    providers   : [
        DecimalPipe,
        CurrencyPipe]
})
export class SimulationPersonaliseeModule
{
}
