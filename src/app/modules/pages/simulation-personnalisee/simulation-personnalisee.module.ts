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
import { FormatMontantDirective } from './format-montant.directive';
@NgModule({
    declarations: [
        SimulationPersonaliseeComponent,
        FormatMontantDirective
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
        MatCommonModule
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
