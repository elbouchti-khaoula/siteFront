import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appFormatTelephone]'
})
export class FormatTelephoneDirective {
  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    this.formatTelephone();
  }

  @HostListener('input')
  onInput() {
    this.formatTelephone();
  }

  private formatTelephone() {
    const inputValue = this.elementRef.nativeElement.value;
    const numericValue = inputValue.replace(/\D/g, '');
    const startsWith212 = numericValue.startsWith('212');
    const phoneNumber = startsWith212 ? numericValue.slice(3) : numericValue;
    const formattedPhoneNumber = phoneNumber.slice(0, 10);
    const formattedValue = formattedPhoneNumber.replace(/(\d{2})(?=\d)/g, '$1-');
    const finalValue = startsWith212 ? `(212) ${formattedValue}` : formattedValue;
    this.elementRef.nativeElement.value = finalValue;
  }
}
