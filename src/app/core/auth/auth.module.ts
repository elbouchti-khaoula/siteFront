import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from 'app/core/auth/auth.interceptor';
import { AuthenticationService } from './authentication.service';

@NgModule({
    imports  : [
        HttpClientModule
    ],
    providers: [
        AuthenticationService,
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
