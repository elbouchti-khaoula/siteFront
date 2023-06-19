import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FuseCardModule } from '@fuse/components/card';
import { FuseAlertModule } from '@fuse/components/alert';
import { SharedModule } from 'app/shared/shared.module';
import { AuthSignUpComponent } from 'app/modules/auth/sign-up/sign-up.component';
import { authSignupRoutes } from 'app/modules/auth/sign-up/sign-up.routing';
import { MatRadioModule } from '@angular/material/radio';
import { FormatTelephoneModule } from 'app/core/directives/formatage-telephone/format-tele.module';
import { MatSelectModule } from '@angular/material/select';
import {AccountService} from '../../../core/services/accounts/accounts.service';
import {SmsService} from '../../../core/services/sms/sms.service';


@NgModule({
    declarations: [
        AuthSignUpComponent
    ],
    providers: [
        AccountService,SmsService
    ],
    imports     : [
        RouterModule.forChild(authSignupRoutes),
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatProgressSpinnerModule,
        FuseCardModule,
        FuseAlertModule,
        SharedModule,
        MatRadioModule,
        FormatTelephoneModule
    ]
})
export class AuthSignUpModule
{
}
