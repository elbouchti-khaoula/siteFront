import { AfterViewInit, Directive, ElementRef, EventEmitter, OnDestroy, Output } from "@angular/core";

/**
 * @description
 * Emits the `appear` event when the element comes into view in the viewport.
 *
 */
@Directive({
    selector: '[appear]',
})
export class OnVisibleDirective implements AfterViewInit, OnDestroy {
    @Output() appear = new EventEmitter<void>();
    private observer: IntersectionObserver;

    constructor(private element: ElementRef) {}

    ngAfterViewInit() {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: [0.5],
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    this.appear.next();
                }
            });
        }, options);

        this.observer.observe(this.element.nativeElement);
    }

    ngOnDestroy() {
        this.observer.disconnect();
    }
}


/**
 * @description
 * Emits the `appear` event when the element comes into view in the viewport.
 *
 */
 @Directive({
    selector: '[disappear]',
})
export class OnHiddenDirective implements AfterViewInit, OnDestroy {
    @Output() disappear = new EventEmitter<void>();
    private observer: IntersectionObserver;

    constructor(private element: ElementRef) {}

    ngAfterViewInit() {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: [0.2],
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    this.disappear.next();
                }
            });
        }, options);

        this.observer.observe(this.element.nativeElement);
    }

    ngOnDestroy() {
        this.observer.disconnect();
    }
}
