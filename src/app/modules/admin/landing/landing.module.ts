import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { LandingComponent } from './landing.component';
import { landingRoutes } from './landing.routing';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
// import { MatInputCounterModule } from '@angular-material-extensions/input-counter';

import { TranslocoLocaleModule } from '@ngneat/transloco-locale';
import { TranslocoModule } from '@ngneat/transloco';
import { CarouselModule } from '@marcreichel/angular-carousel';

// import { MatExpansionPanel } from '@angular/material/expansion';

// import {
//     animate,
//     animateChild,
//     group,
//     state,
//     style,
//     transition,
//     trigger,
//     query,
//     AnimationTriggerMetadata,
// } from '@angular/animations';


// const EXPANSION_PANEL_ANIMATION_TIMING = '10000ms cubic-bezier(0.4,0.0,0.2,1)';
// MatExpansionPanel['decorators'][0].args[0].animations = [
//     trigger('bodyExpansion', [
//         state('collapsed, void', style({ height: '0px', visibility: 'hidden' })),
//         state('expanded', style({ height: '*', visibility: 'visible' })),
//         transition('expanded <=> collapsed, void => collapsed',
//             animate(EXPANSION_PANEL_ANIMATION_TIMING)),
//     ])];


@NgModule({
    declarations: [
        LandingComponent
    ],
    imports     : [
        RouterModule.forChild(landingRoutes),
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatExpansionModule,
        MatSelectModule,
        MatSliderModule,
        // MatInputCounterModule,
        SharedModule,
        TranslocoModule,
        TranslocoLocaleModule,
        CarouselModule
    ]
})
export class LandingModule
{
}
