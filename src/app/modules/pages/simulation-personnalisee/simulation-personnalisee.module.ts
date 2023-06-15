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
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { FormatMontantModule } from 'app/core/directives/formatage-montant/format-montant.module';
import { FormatTelephoneModule } from 'app/core/directives/formatage-telephone/format-tele.module';
import { FormatEntierModule } from 'app/core/directives/formatage-entier/format-entier.module';
import { CaptchaModule } from 'app/modules/common/captcha/captcha.module';
import { PageHeaderConnecteModule } from 'app/modules/common/page-header-connecte/page-header-connecte.module';

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
        FormatMontantModule,
        FormatTelephoneModule,
        FormatEntierModule,
        CaptchaModule,
        PageHeaderConnecteModule
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
