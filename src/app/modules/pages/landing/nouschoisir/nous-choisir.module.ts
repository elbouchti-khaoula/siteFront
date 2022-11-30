import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { NousChoisirComponent } from './nous-choisir.component';
import { CarouselModule } from '@marcreichel/angular-carousel';

@NgModule({
    declarations: [
        NousChoisirComponent
    ],
    imports     : [
        RouterModule,
        SharedModule,
        CarouselModule
    ],
    exports     : [
        NousChoisirComponent
    ]
})
export class NousChoisirModule
{
}
