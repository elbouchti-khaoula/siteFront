import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CaptchaService {
  private _isCaptchaValid: boolean = false;

  constructor() { }

  get isCaptchaValid(): boolean {
    return this._isCaptchaValid;
  }

  set isCaptchaValid(value: boolean) {
    this._isCaptchaValid = value;
  }
}
