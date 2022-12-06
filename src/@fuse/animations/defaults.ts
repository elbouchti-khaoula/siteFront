export class FuseAnimationCurves
{
    static standard = 'cubic-bezier(0.4, 0.0, 0.2, 1)';
    static deceleration = 'cubic-bezier(0.0, 0.0, 0.2, 1)';
    static acceleration = 'cubic-bezier(0.4, 0.0, 1, 1)';
    static sharp = 'cubic-bezier(0.4, 0.0, 0.6, 1)';
}

export class FuseAnimationDurations
{
    static complex = '375ms';
    // static entering = '225ms';
    // static exiting = '195ms';
    static entering = 225;
    static exiting = 195;
}


export const paramsIn = {
    duration: `${FuseAnimationDurations.entering}`,
    delay: 0,
    curve: `${FuseAnimationCurves.deceleration}`
}

export const paramsOut = {
    duration: `${FuseAnimationDurations.exiting}`,
    delay: 0,
    curve: `${FuseAnimationCurves.acceleration}`
}
