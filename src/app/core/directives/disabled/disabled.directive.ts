import { Directive, Input, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';

/**
 * Used to control form control disabled state from a template
 */
@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[disableControl]',
})
export class DisableControlDirective implements OnInit {

    //   @Input() set disableControl( condition : boolean ) {
    //     const action = condition ? 'disable' : 'enable';
    //     this.ngControl.control[action]();
    //   }

    private _disableControl: boolean;

    @Input() set disableControl(condition: boolean) {
        this._disableControl = condition;
        this._set();
    }

    constructor(private ngControl: NgControl) {
    }

    ngOnInit(): void {
        this._set();
    }

    private _set() {
        const control = this.ngControl?.control;
        if (this._disableControl === true) {
            if (control && control.enabled) control.disable();
        } else {
            if (control && control.disabled) control.enable();
        }
    }
}
