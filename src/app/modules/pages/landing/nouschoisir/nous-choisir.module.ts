import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { NousChoisirComponent } from './nous-choisir.component';
import { CarouselModule } from '@marcreichel/angular-carousel';
// import { SwiperModule } from 'swiper/angular';

@NgModule({
    declarations: [
        NousChoisirComponent
    ],
    imports     : [
        RouterModule,
        SharedModule,
        CarouselModule,
        // SwiperModule
    ],
    exports     : [
        NousChoisirComponent
    ]
})
export class NousChoisirModule
{
}
