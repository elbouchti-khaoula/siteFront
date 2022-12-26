import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { NousChoisirComponent } from './nous-choisir.component';

@NgModule({
    declarations: [
        NousChoisirComponent
    ],
    imports     : [
        RouterModule,
        SharedModule
    ],
    exports     : [
        NousChoisirComponent
    ]
})
export class NousChoisirModule
{
}
