import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from 'app/core/auth/auth.interceptor';
import { AuthenticationService } from './authentication.service';
import { SmsService } from '../sms/sms.service';
import { AccountService } from '../accounts/accounts.service';

@NgModule({
    imports  : [
        HttpClientModule
    ],
    providers: [
        AuthenticationService,
        SmsService, 
        AccountService,
        {
            provide : HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi   : true
        }
    ]
})
export class AuthModule
{
}
