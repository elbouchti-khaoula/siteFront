import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatTelephone'
})
export class FormatTelephonePipe implements PipeTransform {
  transform(value: string): string {
    const numericValue = value.replace(/\D/g, '');
    const startsWith06or07or05 = /^(05|06|07)/.test(numericValue.substr(0, 2));
    let formattedValue = '';

    if (numericValue.length >= 2) {
      const phoneNumber = startsWith06or07or05 ? numericValue : '';
      const formattedPhoneNumber = phoneNumber.slice(0, 10);
      formattedValue = formattedPhoneNumber.replace(/(\d{2})(?=\d)/g, '$1-');
    } else {
      formattedValue = numericValue;
    }

    return formattedValue;
  }
}
