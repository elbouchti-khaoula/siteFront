import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'app/shared/shared.module';
import { ContactezNousComponent } from './contactez-nous.component';

@NgModule({
    declarations: [
        ContactezNousComponent
    ],
    imports     : [
        SharedModule,
        MatIconModule,
        MatButtonModule,
    ],
    exports     : [
        ContactezNousComponent
    ]
})
export class ContactezNousModule
{
}
