import { Component, OnInit, Renderer2, Output, EventEmitter } from '@angular/core';
import { CaptchaService } from './Captcha.service';

@Component({
  selector: 'app-captcha',
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.scss']
})
export class CaptchaComponent implements OnInit {
  
  @Output() captchaValid: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private _renderer: Renderer2, private _captchaService: CaptchaService) { }

  resolved(token: string) {
    console.log(`Resolved captcha with response: ${token}`);
    this._captchaService.isCaptchaValid = !!token;
    this.captchaValid.emit(this._captchaService.isCaptchaValid);
  }

  ngOnInit(): void {
    let script = this._renderer.createElement('script');
    script.defer = true;
    script.async = true;
    script.src = "https://www.google.com/recaptcha/api.js";
    this._renderer.appendChild(document.body, script);
  }
}
