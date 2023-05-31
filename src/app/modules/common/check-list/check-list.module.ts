import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { CheckListComponent } from './check-list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    declarations: [
        CheckListComponent
    ],
    imports     : [
        SharedModule,
        MatButtonModule,
        MatIconModule,
    ],
    exports     : [
        CheckListComponent
    ]
})
export class CheckListModule
{
}
