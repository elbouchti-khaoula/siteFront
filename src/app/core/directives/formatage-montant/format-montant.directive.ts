import { Directive, ElementRef, Input, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appFormatMontant]'
})
export class FormatMontantDirective {
  @Input('appFormatMontant') montant: number;

  private valueBeforeFormat: string = ''; // le champ avant le formatage
  private lastValidValue: string = ''; // la dernière valeur valide

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.formatMontant(this.montant);
  }

  @HostListener('input')
  onInput() {
    const value = this.elementRef.nativeElement.value;
    const montantSansEspaces = value.replace(/\s/g, ''); // pour supprimer les espaces
    const montantValide = montantSansEspaces.replace(/[^\d.,]/g, ''); // supprimer les caractères sauf . et ,
    const montantNumerique = parseFloat(montantValide);

    if (!isNaN(montantNumerique)) {
      if (montantNumerique <= 5000000) {
        this.valueBeforeFormat = value; // la valeur avant le formatage
        this.lastValidValue = montantValide; // la dernière valeur valide
        this.formatMontant(montantNumerique, false);
      } else {
        this.clearInput();
      }
    } else {
      this.clearInput();
    }
  }

  @HostListener('blur')
  onBlur() {
    const value = this.elementRef.nativeElement.value;
    const montantSansEspaces = value.replace(/\s/g, '');
    const montantValide = montantSansEspaces.replace(/[^\d.,]/g, '');
    const montantNumerique = parseFloat(montantValide);

    if (!isNaN(montantNumerique)) {
      this.formatMontant(montantNumerique, true); // appliquer le formatage avec les décimales
    } else {
      this.renderer.setProperty(this.elementRef.nativeElement, 'value', this.valueBeforeFormat); // la valeur avant le formatage
    }
  }

  private formatMontant(value: number, includeDecimal: boolean = true) {
    if (value !== null && value !== undefined) {
      let montantFormate = value.toLocaleString('fr-FR', {
        minimumFractionDigits: 0,
        maximumFractionDigits: includeDecimal ? 2 : 0
      }).replace(',', '.');

      if (includeDecimal) {
        if (!montantFormate.includes('.')) {
          montantFormate += '.00';
        } else if (montantFormate.endsWith('.')) {
          montantFormate += '00';
        } else if (montantFormate.endsWith('.0')) {
          montantFormate += '0';
        }
      }

      this.renderer.setProperty(this.elementRef.nativeElement, 'value', montantFormate);
    }
  }

  private clearInput() {
    this.renderer.setProperty(this.elementRef.nativeElement, 'value', '');
    this.valueBeforeFormat = '';
    this.lastValidValue = '';
  }
}