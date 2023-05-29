import { RecaptchaFormsModule, RecaptchaModule } from "ng-recaptcha";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { CaptchaComponent } from "./captcha.component";

@NgModule({
    declarations: [
        CaptchaComponent
    ],
    imports: [
        RecaptchaModule,
        RecaptchaFormsModule,
    ],
    exports: [
        CaptchaComponent
      ]
})
export class CaptchaModule {}