import { animate, state, style, transition, trigger } from '@angular/animations';
import { paramsIn, paramsOut } from '@fuse/animations/defaults';

// -----------------------------------------------------------------------------------------------------
// @ Fade in
// -----------------------------------------------------------------------------------------------------
const fadeIn = trigger('fadeIn',
    [
        state('void',
            style({
                opacity: 0
            })
        ),

        state('*',
            style({
                opacity: 1
            })
        ),

        // Prevent the transition if the state is false
        transition('void => false', []),

        // Transition
        transition('void => *',
            animate('{{duration}}ms {{delay}}ms {{curve}}'),
            {
                params: paramsIn
            }
        )
    ]
);

// -----------------------------------------------------------------------------------------------------
// @ Fade in top
// -----------------------------------------------------------------------------------------------------
const fadeInTop = trigger('fadeInTop',
    [
        state('void',
            style({
                opacity  : 0,
                transform: 'translate3d(0, -100%, 0)'
            })
        ),

        state('*',
            style({
                opacity  : 1,
                transform: 'translate3d(0, 0, 0)'
            })
        ),

        // Prevent the transition if the state is false
        transition('void => false', []),

        // Transition
        transition('void => *',
            animate('{{duration}}ms {{delay}}ms {{curve}}'),
            {
                params: paramsIn
            }
        )
    ]
);

// -----------------------------------------------------------------------------------------------------
// @ Fade in bottom
// -----------------------------------------------------------------------------------------------------
const fadeInBottom = trigger('fadeInBottom',
    [
        state('void',
            style({
                opacity  : 0,
                transform: 'translate3d(0, 100%, 0)'
            })
        ),

        state('*',
            style({
                opacity  : 1,
                transform: 'translate3d(0, 0, 0)'
            })
        ),

        // Prevent the transition if the state is false
        transition('void => false', []),

        // Transition
        transition('void => *',
            animate('{{duration}}ms {{delay}}ms {{curve}}'),
            {
                params: paramsIn
            }
        )
    ]
);

// -----------------------------------------------------------------------------------------------------
// @ Fade in left
// -----------------------------------------------------------------------------------------------------
const fadeInLeft = trigger('fadeInLeft',
    [
        state('void',
            style({
                opacity  : 0,
                transform: 'translate3d(-100%, 0, 0)'
            })
        ),

        state('*',
            style({
                opacity  : 1,
                transform: 'translate3d(0, 0, 0)'
            })
        ),

        // Prevent the transition if the state is false
        transition('void => false', []),

        // Transition
        transition('void => *',
            animate('{{duration}}ms {{delay}}ms {{curve}}'),
            {
                params: paramsIn
            }
        )
    ]
);

// -----------------------------------------------------------------------------------------------------
// @ Fade in right
// -----------------------------------------------------------------------------------------------------
const fadeInRight = trigger('fadeInRight',
    [
        state('void',
            style({
                opacity  : 0,
                transform: 'translate3d(100%, 0, 0)'
            })
        ),

        state('*',
            style({
                opacity  : 1,
                transform: 'translate3d(0, 0, 0)'
            })
        ),

        // Prevent the transition if the state is false
        transition('void => false', []),

        // Transition
        transition('void => *',
            animate('{{duration}}ms {{delay}}ms {{curve}}'),
            {
                params: paramsIn
            }
        )
    ]
);

const fadeInRightBis = trigger('fadeInRightBis',
    [
        transition(':enter', [
            style({
                opacity: 0, transform: 'translateX(100%)'
            }),
            animate('700ms ease-out', style({ opacity: 1, transform: 'translateX(0%)' }))
        ]),
        transition(':leave', [
            style({
                opacity: 1, transform: 'translateX(0%)'
            }),
            animate('700ms ease-in', style({ opacity: 0, transform: 'translateX(-100%)' }))
        ])
    ]
);

// -----------------------------------------------------------------------------------------------------
// @ Fade out
// -----------------------------------------------------------------------------------------------------
const fadeOut = trigger('fadeOut',
    [
        state('*',
            style({
                opacity: 1
            })
        ),

        state('void',
            style({
                opacity: 0
            })
        ),

        // Prevent the transition if the state is false
        transition('false => void', []),

        // Transition
        transition('* => void',
            animate('{{duration}}ms {{delay}}ms {{curve}}'),
            {
                params: paramsOut
            }
        )
    ]
);

// -----------------------------------------------------------------------------------------------------
// @ Fade out top
// -----------------------------------------------------------------------------------------------------
const fadeOutTop = trigger('fadeOutTop',
    [
        state('*',
            style({
                opacity  : 1,
                transform: 'translate3d(0, 0, 0)'
            })
        ),

        state('void',
            style({
                opacity  : 0,
                transform: 'translate3d(0, -100%, 0)'
            })
        ),

        // Prevent the transition if the state is false
        transition('false => void', []),

        // Transition
        transition('* => void',
            animate('{{duration}}ms {{delay}}ms {{curve}}'),
            { params: paramsOut }
        )
    ]
);

// -----------------------------------------------------------------------------------------------------
// @ Fade out bottom
// -----------------------------------------------------------------------------------------------------
const fadeOutBottom = trigger('fadeOutBottom',
    [
        state('*',
            style({
                opacity  : 1,
                transform: 'translate3d(0, 0, 0)'
            })
        ),

        state('void',
            style({
                opacity  : 0,
                transform: 'translate3d(0, 100%, 0)'
            })
        ),

        // Prevent the transition if the state is false
        transition('false => void', []),

        // Transition
        transition('* => void',
            animate('{{duration}}ms {{delay}}ms {{curve}}'),
            {
                params: paramsOut
            }
        )
    ]
);

// -----------------------------------------------------------------------------------------------------
// @ Fade out left
// -----------------------------------------------------------------------------------------------------
const fadeOutLeft = trigger('fadeOutLeft',
    [
        state('*',
            style({
                opacity  : 1,
                transform: 'translate3d(0, 0, 0)'
            })
        ),

        state('void',
            style({
                opacity  : 0,
                transform: 'translate3d(-100%, 0, 0)'
            })
        ),

        // Prevent the transition if the state is false
        transition('false => void', []),

        // Transition
        transition('* => void',
            animate('{{duration}}ms {{delay}}ms {{curve}}'),
            {
                params: paramsOut
            }
        )
    ]
);

// -----------------------------------------------------------------------------------------------------
// @ Fade out right
// -----------------------------------------------------------------------------------------------------
const fadeOutRight = trigger('fadeOutRight',
    [
        state('*',
            style({
                opacity  : 1,
                transform: 'translate3d(0, 0, 0)'
            })
        ),

        state('void',
            style({
                opacity  : 0,
                transform: 'translate3d(100%, 0, 0)'
            })
        ),

        // Prevent the transition if the state is false
        transition('false => void', []),

        // Transition
        transition('* => void',
            animate('{{duration}}ms {{delay}}ms {{curve}}'),
            {
                params: paramsOut
            }
        )
    ]
);

export { fadeIn, fadeInTop, fadeInBottom, fadeInLeft, fadeInRight, fadeInRightBis, fadeOut, fadeOutTop, fadeOutBottom, fadeOutLeft, fadeOutRight };
