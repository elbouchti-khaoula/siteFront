import { animate, animation, AnimationMetadata, state, style, transition, trigger } from '@angular/animations';
import { paramsIn, paramsOut } from '@fuse/animations/defaults';

// -----------------------------------------------------------------------------------------------------
// @ Slide in top
// -----------------------------------------------------------------------------------------------------
const slideInTopAnim = animation(
    [
        style({
            transform: 'translate3d(0, -100%, 0)'
        }),
        animate(
            '{{duration}}ms {{delay}}ms {{curve}}', 
            style({
                transform: 'translate3d(0, 0, 0)'
            })
        )
    ],
    {
        params: paramsIn
    }
);

// -----------------------------------------------------------------------------------------------------
// @ Slide in bottom
// -----------------------------------------------------------------------------------------------------
const slideInBottomAnim = animation(
    [
        style({
            transform: 'translate3d(0, 100%, 0)'
        }),
        animate(
            '{{duration}}ms {{delay}}ms {{curve}}', 
            style({
                transform: 'translate3d(0, 0, 0)'
            })
        )
    ],
    {
        params: paramsIn
    }
);

// -----------------------------------------------------------------------------------------------------
// @ Slide in left
// -----------------------------------------------------------------------------------------------------
const slideInLeftAnim = animation(
    [
        style({
            transform: 'translate3d(-100%, 0, 0)'
        }),
        animate(
            '{{duration}}ms {{delay}}ms {{curve}}', 
            style({
                transform: 'translate3d(0, 0, 0)'
            })
        )
    ],
    {
        params: paramsIn
    }
);

// -----------------------------------------------------------------------------------------------------
// @ Slide in right
// -----------------------------------------------------------------------------------------------------
const slideInRightAnim = animation(
    [
        style({
            transform: 'translate3d(100%, 0, 0)'
        }),
        animate(
            '{{duration}}ms {{delay}}ms {{curve}}', 
            style({
                transform: 'translate3d(0, 0, 0)'
            })
        )
    ],
    {
        params: paramsIn
    }
);

// -----------------------------------------------------------------------------------------------------
// @ Slide out top
// -----------------------------------------------------------------------------------------------------
const slideOutTopAnim = animation(
    [
        style({
            transform: 'translate3d(0, 0, 0)'
        }),
        animate(
            '{{duration}}ms {{delay}}ms {{curve}}', 
            style({
                transform: 'translate3d(0, -100%, 0)'
            })
        )
    ],
    {
        params: paramsOut
    }
);

// -----------------------------------------------------------------------------------------------------
// @ Slide out bottom
// -----------------------------------------------------------------------------------------------------
const slideOutBottomAnim = animation(
    [
        style({
            transform: 'translate3d(0, 0, 0)'
        }),
        animate(
            '{{duration}}ms {{delay}}ms {{curve}}', 
            style({
                transform: 'translate3d(0, 100%, 0)'
            })
        )
    ],
    {
        params: paramsOut
    }
);

// -----------------------------------------------------------------------------------------------------
// @ Slide out left
// -----------------------------------------------------------------------------------------------------
const slideOutLeftAnim = animation(
    [
        style({
            transform: 'translate3d(0, 0, 0)'
        }),
        animate(
            '{{duration}}ms {{delay}}ms {{curve}}', 
            style({
                transform: 'translate3d(-100%, 0, 0)'
            })
        )
    ],
    {
        params: paramsOut
    }
);

// -----------------------------------------------------------------------------------------------------
// @ Slide out right
// -----------------------------------------------------------------------------------------------------
const slideOutRightAnim = animation(
    [
        style({
            transform: 'translate3d(0, 0, 0)'
        }),
        animate(
            '{{duration}}ms {{delay}}ms {{curve}}', 
            style({
                transform: 'translate3d(100%, 0, 0)'
            })
        )
    ],
    {
        params: paramsOut
    }
);

export { slideInTopAnim, slideInBottomAnim, slideInLeftAnim, slideInRightAnim, slideOutTopAnim, slideOutBottomAnim, slideOutLeftAnim, slideOutRightAnim };
