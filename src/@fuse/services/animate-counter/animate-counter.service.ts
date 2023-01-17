import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AnimateCounterService {

    /**
     * Constructor
     */
    constructor() {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    // Counter animation function
    animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = timestamp => {
            //  Set the actual time
            if (!startTimestamp) startTimestamp = timestamp;
            
            // Calculate progress (the time versus the set duration)
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            
            // Calculate the value compared to the progress and set the value in the HTML
            obj.nativeElement.innerHTML = Math.floor(progress * (end - start) + start);
            // obj.nativeElement.textContent = Math.floor(progress * (end - start) + start);
            
            // If progress is not 100%, an call a new animation of step
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        // Call a last animation of step
        window.requestAnimationFrame(step);
    }
}
