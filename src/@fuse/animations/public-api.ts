import { expandCollapse } from '@fuse/animations/expand-collapse';
import { fadeIn, fadeInBottom, fadeInLeft, fadeInRight, fadeInRightBis, fadeInTop, fadeOut, fadeOutBottom, fadeOutLeft, fadeOutRight, fadeOutTop } from '@fuse/animations/fade';
import { shake } from '@fuse/animations/shake';
import { slideInBottom, slideInLeft, slideInRight, slideInTop, slideOutBottom, slideOutLeft, slideOutRight, slideOutTop } from '@fuse/animations/slide';
import { zoomIn, zoomOut } from '@fuse/animations/zoom';

import { fadeInAnim, fadeInBottomAnim, fadeInLeftAnim, fadeInRightAnim, fadeInTopAnim, fadeOutAnim, fadeOutBottomAnim, fadeOutLeftAnim, fadeOutRightAnim, fadeOutTopAnim } from './fade-anim';
import { shakeAnim } from './shake-anim';
import { slideInBottomAnim, slideInLeftAnim, slideInRightAnim, slideOutBottomAnim, slideOutLeftAnim, slideOutRightAnim, slideOutTopAnim } from './slide-anim';
import { zoomInAnim, zoomOutAnim } from './zoom-anim';

export const fuseAnimations = [
    expandCollapse,
    fadeIn, fadeInTop, fadeInBottom, fadeInLeft, fadeInRight, fadeInRightBis,
    fadeOut, fadeOutTop, fadeOutBottom, fadeOutLeft, fadeOutRight,
    shake,
    slideInTop, slideInBottom, slideInLeft, slideInRight,
    slideOutTop, slideOutBottom, slideOutLeft, slideOutRight,
    zoomIn, zoomOut
];

export const fuseAnimationsMap = [
    // { name: "expandCollapse", animation: expandCollapseAnim },
    { name: "fadeIn", animation: fadeInAnim },
    { name: "fadeInTop", animation: fadeInTopAnim },
    { name: "fadeInBottom", animation: fadeInBottomAnim },
    { name: "fadeInLeft", animation: fadeInLeftAnim },
    { name: "fadeInRight", animation: fadeInRightAnim },
    { name: "fadeOut", animation: fadeOutAnim },
    { name: "fadeOutTop", animation: fadeOutTopAnim },
    { name: "fadeInBottom", animation: fadeOutBottomAnim },
    { name: "fadeOutLeft", animation: fadeOutLeftAnim },
    { name: "fadeOutRight", animation: fadeOutRightAnim },
    { name: "shake", animation: shakeAnim },
    { name: "slideInBottom", animation: slideInBottomAnim },
    { name: "slideInLeft", animation: slideInLeftAnim },
    { name: "slideInRight", animation: slideInRightAnim },
    { name: "slideOutTop", animation: slideOutTopAnim },
    { name: "slideInBottom", animation: slideOutBottomAnim },
    { name: "slideOutLeft", animation: slideOutLeftAnim },
    { name: "slideOutRight", animation: slideOutRightAnim },
    { name: "zoomIn", animation: zoomInAnim },
    { name: "zoomOut", animation: zoomOutAnim }
];
