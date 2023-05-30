import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SupportComponent } from './support.component';
import { supportRoutes } from './support.routing';
import { SharedModule } from 'app/shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FuseCardModule } from '@fuse/components/card';
import { FormatTelephoneModule } from '@fuse/directives/formatage-telephone/format-tele.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CaptchaModule } from '@fuse/captcha/captcha.module';
import { CommonModule } from '@angular/common';
@NgModule({
    declarations: [
        SupportComponent,
    ],
    imports     : [
        RouterModule.forChild(supportRoutes),
        SharedModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        FuseCardModule,
        FormatTelephoneModule,
        ReactiveFormsModule,
        CommonModule,
        CaptchaModule
    ]
})
export class SupportModule
{
}
