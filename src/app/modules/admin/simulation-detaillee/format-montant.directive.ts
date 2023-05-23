import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { DecimalPipe, CurrencyPipe } from '@angular/common';

@Directive({
  selector: '[appFormatMontant]'
})
export class FormatMontantDirective implements OnInit {
  @Input('appFormatMontant') montant: number;

  constructor(private elementRef: ElementRef, private decimalPipe: DecimalPipe, private currencyPipe: CurrencyPipe) { }

  ngOnInit() {
    if (this.montant) {
      const montantFormate = this.decimalPipe.transform(this.montant, '1.2-2', 'fr-FR');
      const montantAvecEspaces = montantFormate.replace('.', ' ');
      const montantAvecDecimales = this.currencyPipe.transform(this.montant, 'Dhs', 'symbol', '1.2-2', 'fr-FR');
      this.elementRef.nativeElement.value = montantAvecEspaces + montantAvecDecimales.substring(montantAvecEspaces.length);
    }
  }
}
