import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReclamationComponent } from './reclamation.component';
import { reclamationRoutes } from './reclamation.routing';
import { SharedModule } from 'app/shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRippleModule } from '@angular/material/core';
import { FuseCardModule } from '@fuse/components/card';
import { FuseAlertModule } from '@fuse/components/alert';
import { FormatTelephoneModule } from '@fuse/directives/formatage-telephone/format-tele.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CaptchaModule } from '@fuse/captcha/captcha.module';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
    declarations: [
        ReclamationComponent,
    ],
    imports     : [
        RouterModule.forChild(reclamationRoutes),
        SharedModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatRippleModule,
        FuseCardModule,
        FuseAlertModule,
        MatCheckboxModule,
        FuseAlertModule,
        FormatTelephoneModule,
        ReactiveFormsModule,
        CommonModule,
        CaptchaModule
    ]
})
export class ReclamationModule
{
}
