import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'app/shared/shared.module';
import { ContactPromoteurComponent } from './contact-promoteur.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
    declarations: [
        ContactPromoteurComponent
    ],
    imports     : [
        RouterModule,
        SharedModule,
        MatIconModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
    ],
    exports     : [
        ContactPromoteurComponent
    ]
})
export class ContactPromoteurModule
{
}
