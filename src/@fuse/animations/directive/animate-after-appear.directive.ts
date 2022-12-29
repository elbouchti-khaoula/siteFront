import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import {
    animate,
    AnimationBuilder,
    AnimationFactory,
    AnimationOptions,
    AnimationPlayer,
    AnimationReferenceMetadata,
    style,
    useAnimation
} from '@angular/animations';
import { IntersectionObserverService } from '../services/intersection-observer.service';
import { fuseAnimationsMap } from '../public-api';

@Directive({
    selector: '[animateAfterAppear]'
})
export class AnimateAfterAppearDirective implements OnInit, OnDestroy {

    @Input() animateAfterAppear: 'fadeInData' | 'fadeInBottomData';
    @Input() animationOptions: AnimationOptions;
    @Input() animationCustom: any; // custom your own animations

    _player: AnimationPlayer;

    /**
     * Constructor
     */
    constructor(
        private _observer: IntersectionObserverService,
        private _elementRef: ElementRef,
        private _animationBuilder: AnimationBuilder
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    ngOnInit() {
        let animationFactory: AnimationFactory;

        // console.log("+-+- animateAfterAppear animationOptions animationCustom", this.animateAfterAppear, this.animationOptions, this.animationCustom);
        // console.log("+-+- fuseAnimationsMap", fuseAnimationsMap);

        if (this.animationCustom !== null && this.animationCustom !== undefined) {
            animationFactory = this._animationBuilder.build(this.animationCustom);
        } else if (!!this.animateAfterAppear && !!this.getAnimation(this.animateAfterAppear)) {
            const animation = this.getAnimation(this.animateAfterAppear);
            animationFactory = this._animationBuilder.build([useAnimation(animation, this.animationOptions)]);
        } else {
            animationFactory = this._animationBuilder.build([
                style({ opacity: 0, transform: 'translateX(-100px)' }),
                animate('1200ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'translateX(0)' })),
            ]);
        }

        if (this._observer.isSupported()) {
            this._player = animationFactory.create(this._elementRef.nativeElement);
            this._player.init();

            // // Once the animation is done...
            // this._player.onDone(() => {

            //     // Destroy the player
            //     this._player.destroy();
            //     this._player = null;
            // });

            const callback = this.startAnimating.bind(this);
            this._observer.addTarget(this._elementRef.nativeElement, callback);
        }
    }
    
    /**
     * On destroy
     */
     ngOnDestroy(): void {
        // Finish the animation
        if (this._player) {
            this._player.finish();
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    getAnimation(animateAfterAppear: string): AnimationReferenceMetadata | undefined
    {
        const match = fuseAnimationsMap.find(item => item.name === animateAfterAppear);
        if (match) {
            return match.animation
        } else {
            return null;
        }
    }

    /**
     * Builds and triggers the animation
     * when it enters the viewport
     * @param {boolean} inViewport
     */
    startAnimating(inViewport: boolean) {
        if (inViewport) {
            this._player.play();
        }
    }

}