import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { OperationsSAVRefComponent } from './operations-sav-ref.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
    declarations: [
        OperationsSAVRefComponent
    ],
    imports     : [
        SharedModule,
        MatDialogModule,
        MatIconModule,
        MatButtonModule
    ]
})
export class OperationsSAVRefModule
{
}
