// -----------------------------------------------------------------------------------------------------
// @ grow
// -----------------------------------------------------------------------------------------------------

import { animate, state, style, transition, trigger } from "@angular/animations";
import { paramsIn } from "./defaults";

const grow = trigger('grow',
    [
        state('open',
            style({
                width: '300px'
            })
        ),
        state('closed',
            style({
                width: '100px'
            })
        ),
        transition('* => closed',
            animate('{{duration}}ms {{delay}}ms {{curve}}'),
            {
                params: paramsIn
            }
        ),
        transition('* => open',
            animate('{{duration}}ms {{delay}}ms {{curve}}'),
            {
                params: paramsIn
            }
        )
    ]
);

const resize = trigger('resize', [
    state(
        'largeMobile',
        style({
            width: '*',
            transform: '*'
        })
    ),
    state(
        'largeDesktop',
        style({
            width: '75%',
            transform: 'translateX(17%)'
        })
    ),
    state(
        'smallDesktop',
        style({
            width: '50%',
            transform: 'translateX(0%)'
        })
    ),
    // Transition
    transition('largeDesktop => smallDesktop', [animate('700ms')]),
    transition('smallDesktop => largeDesktop', [animate('700ms')]),
]);


export { grow, resize };