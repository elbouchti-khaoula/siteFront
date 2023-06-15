import { fadeInAnim, fadeInBottomAnim, fadeInLeftAnim, fadeInRightAnim, fadeInTopAnim, fadeOutAnim, fadeOutBottomAnim, fadeOutLeftAnim, fadeOutRightAnim, fadeOutTopAnim } from './fade-anim';
import { shakeAnim } from './shake-anim';
import { slideInBottomAnim, slideInLeftAnim, slideInRightAnim, slideOutBottomAnim, slideOutLeftAnim, slideOutRightAnim, slideOutTopAnim } from './slide-anim';
import { zoomInAnim, zoomOutAnim } from './zoom-anim';

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
