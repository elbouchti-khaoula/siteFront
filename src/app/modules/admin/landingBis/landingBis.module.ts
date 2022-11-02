import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'app/shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { RouterModule } from '@angular/router';
import { LandingBisComponent } from 'app/modules/admin/landingBis/landingBis.component';
import { landingBisRoutes } from 'app/modules/admin/landingBis/landingBis.routing';
import { TranslocoLocaleModule } from '@ngneat/transloco-locale';
import { TranslocoModule } from '@ngneat/transloco';
import { CarouselModule } from '@marcreichel/angular-carousel';

@NgModule({
    declarations: [
        LandingBisComponent
    ],
    imports     : [
        RouterModule.forChild(landingBisRoutes),
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatExpansionModule,
        MatSelectModule,
        MatSliderModule,
        SharedModule,
        TranslocoModule,
        TranslocoLocaleModule,
        CarouselModule
    ]
})
export class LandingBisModule
{
}
