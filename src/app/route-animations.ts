import {
    trigger,
    animate,
    style,
    transition,
} from '@angular/animations';

var startingStyles = (styles) => {
    styles['position'] = 'fixed';
    styles['top'] = 0;
    styles['left'] = 0;
    styles['right'] = 0;
    styles['height'] = '100%';
    return styles;
}

export default function (name) {
    return trigger(name,
        [
            transition(':enter', [
                style(startingStyles({
                    opacity: 0, transform: 'translateX(100%)'
                })),
                animate('1s ease-out', style({ opacity: 1, transform: 'translateX(0%)' }))
            ]),
            transition(':leave', [
                style(startingStyles({
                    opacity: 1, transform: 'translateX(0%)'
                })),
                animate('1s ease-in', style({ opacity: 0, transform: 'translateX(-100%)' }))
            ])
        ]
    );
}