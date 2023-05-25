import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[appFormatTelephone]'
})
export class FormatTelephoneDirective implements OnInit {
  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    this.formatTelephone();
  }

  @HostListener('input')
  onInputChange() {
    this.formatTelephone();
  }

  private formatTelephone() {
    const inputValue = this.elementRef.nativeElement.value;
    const numericValue = inputValue.replace(/\D/g, '');
    const startsWith06or07or05 = /^(05|06|07)/.test(numericValue.substr(0, 2));
    let formattedValue = '';

    if (numericValue.length >= 2) {
      const phoneNumber = startsWith06or07or05 ? numericValue : '';
      const formattedPhoneNumber = phoneNumber.slice(0, 10);
      formattedValue = formattedPhoneNumber.replace(/(\d{2})(?=\d)/g, '$1-');
    } else {
      formattedValue = numericValue;
    }

    this.elementRef.nativeElement.value = formattedValue;
  }
}
