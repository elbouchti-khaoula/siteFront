import { NgModule } from '@angular/core';
import { AnimateCounterService } from './animate-counter.service';

@NgModule({
    providers: [
        AnimateCounterService
    ]
})
export class AnimateCounterModule
{
    /**
     * Constructor
     */
    constructor(private _animateCounterService: AnimateCounterService)
    {
    }
}
