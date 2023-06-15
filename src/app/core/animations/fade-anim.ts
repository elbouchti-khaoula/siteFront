import { animate, animation, style } from '@angular/animations';
import { paramsIn, paramsOut } from '@fuse/animations/defaults';

// -----------------------------------------------------------------------------------------------------
// @ Fade in
// -----------------------------------------------------------------------------------------------------
const fadeInAnim = animation(
    [
        style({
            opacity: 0
        }),
        animate(
            '{{duration}}ms {{delay}}ms {{curve}}', 
            style({
                opacity: 1,
            })
        )
    ],
    {
        params: paramsIn
    }
);

// -----------------------------------------------------------------------------------------------------
// @ Fade in top
// -----------------------------------------------------------------------------------------------------
const fadeInTopAnim = animation(
    [
        style({
            opacity: 0,
            transform: 'translate3d(0, -100%, 0)'
        }),
        animate(
            '{{duration}}ms {{delay}}ms {{curve}}', 
            style({
                opacity: 1,
                transform: 'translate3d(0, 0, 0)'
            })
        )
    ],
    {
        params: paramsIn
    }
);

// -----------------------------------------------------------------------------------------------------
// @ Fade in bottom
// -----------------------------------------------------------------------------------------------------
const fadeInBottomAnim = animation(
    [
        style({
            opacity: 0,
            transform: 'translate3d(0, 100%, 0)'
        }),
        animate(
            '{{duration}}ms {{delay}}ms {{curve}}', 
            style({
                opacity: 1,
                transform: 'translate3d(0, 0, 0)'
            })
        )
    ],
    {
        params: paramsIn
    }
)

// -----------------------------------------------------------------------------------------------------
// @ Fade in left
// -----------------------------------------------------------------------------------------------------
const fadeInLeftAnim = animation(
    [
        style({
            opacity: 0,
            transform: 'translate3d(-100%, 0, 0)'
        }),
        animate(
            '{{duration}}ms {{delay}}ms {{curve}}', 
            style({
                opacity: 1,
                transform: 'translate3d(0, 0, 0)'
            })
        )
    ],
    {
        params: paramsIn
    }
)

// -----------------------------------------------------------------------------------------------------
// @ Fade in right
// -----------------------------------------------------------------------------------------------------
const fadeInRightAnim = animation(
    [
        style({
            opacity: 0,
            transform: 'translate3d(100%, 0, 0)'
        }),
        animate(
            '{{duration}}ms {{delay}}ms {{curve}}', 
            style({
                opacity: 1,
                transform: 'translate3d(0, 0, 0)'
            })
        )
    ],
    {
        params: paramsIn
    }
)

// -----------------------------------------------------------------------------------------------------
// @ Fade out
// -----------------------------------------------------------------------------------------------------
const fadeOutAnim = animation(
    [
        style({
            opacity: 1
        }),
        animate(
            '{{duration}}ms {{delay}}ms {{curve}}', 
            style({
                opacity: 0
            })
        )
    ],
    {
        params: paramsOut
    }
);

// -----------------------------------------------------------------------------------------------------
// @ Fade out top
// -----------------------------------------------------------------------------------------------------
const fadeOutTopAnim = animation(
    [
        style({
            opacity: 1,
            transform: 'translate3d(0, 0, 0)'
        }),
        animate(
            '{{duration}}ms {{delay}}ms {{curve}}', 
            style({
                opacity: 0,
                transform: 'translate3d(0, -100%, 0)'
            })
        )
    ],
    {
        params: paramsOut
    }
);

// -----------------------------------------------------------------------------------------------------
// @ Fade out bottom
// -----------------------------------------------------------------------------------------------------
const fadeOutBottomAnim = animation(
    [
        style({
            opacity: 1,
            transform: 'translate3d(0, 0, 0)'
        }),
        animate(
            '{{duration}}ms {{delay}}ms {{curve}}', 
            style({
                opacity: 0,
                transform: 'translate3d(0, 100%, 0)'
            })
        )
    ],
    {
        params: paramsOut
    }
);

// -----------------------------------------------------------------------------------------------------
// @ Fade out left
// -----------------------------------------------------------------------------------------------------
const fadeOutLeftAnim = animation(
    [
        style({
            opacity: 1,
            transform: 'translate3d(0, 0, 0)'
        }),
        animate(
            '{{duration}}ms {{delay}}ms {{curve}}', 
            style({
                opacity: 0,
                transform: 'translate3d(-100%, 0, 0)'
            })
        )
    ],
    {
        params: paramsOut
    }
);

// -----------------------------------------------------------------------------------------------------
// @ Fade out right
// -----------------------------------------------------------------------------------------------------
const fadeOutRightAnim = animation(
    [
        style({
            opacity: 1,
            transform: 'translate3d(0, 0, 0)'
        }),
        animate(
            '{{duration}}ms {{delay}}ms {{curve}}', 
            style({
                opacity: 0,
                transform: 'translate3d(100%, 0, 0)'
            })
        )
    ],
    {
        params: paramsOut
    }
);

export { fadeInAnim, fadeInTopAnim, fadeInBottomAnim, fadeInLeftAnim, fadeInRightAnim, fadeOutAnim, fadeOutTopAnim, fadeOutBottomAnim, fadeOutLeftAnim, fadeOutRightAnim };
