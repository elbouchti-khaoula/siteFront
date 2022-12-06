import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnimateAfterAppearDirective } from './animate-after-appear.directive';
import { IntersectionObserverService, IntersectionObserverServiceConfig } from '../services/intersection-observer.service';

@NgModule({
    imports: [
        CommonModule,
    ],
    exports: [
        AnimateAfterAppearDirective,
    ],
    declarations: [
        AnimateAfterAppearDirective
    ],
    providers: [
        IntersectionObserverService
    ]
})
export class AnimateAfterAppearModule {

    public static forRoot(config?: IntersectionObserverServiceConfig): ModuleWithProviders<AnimateAfterAppearModule> {
        return {
            ngModule: AnimateAfterAppearModule,
            providers: [
                {
                    provide: IntersectionObserverServiceConfig, useValue: config
                }
            ]
        };
    }
}