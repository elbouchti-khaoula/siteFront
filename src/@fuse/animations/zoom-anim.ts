import { animate, animation, AnimationMetadata, state, style, transition, trigger } from '@angular/animations';
import { paramsIn, paramsOut } from '@fuse/animations/defaults';

// -----------------------------------------------------------------------------------------------------
// @ Zoom in
// -----------------------------------------------------------------------------------------------------
const zoomInAnim = animation(
    [
        style({
            opacity  : 0,
            transform: 'scale(0.5)'
        }),
        animate(
            '{{duration}}ms {{delay}}ms {{curve}}', 
            style({
                opacity  : 1,
                transform: 'scale(1)'
            })
        )
    ],
    {
        params: paramsIn
    }
);

// -----------------------------------------------------------------------------------------------------
// @ Zoom out
// -----------------------------------------------------------------------------------------------------
const zoomOutAnim = animation(
    [
        style({
            opacity  : 1,
            transform: 'scale(1)'
        }),
        animate(
            '{{duration}}ms {{delay}}ms {{curve}}', 
            style({
                opacity  : 0,
                transform: 'scale(0.5)'
            })
        )
    ],
    {
        params: paramsOut
    }
);

export { zoomInAnim, zoomOutAnim };

