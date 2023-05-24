import { Directive, ElementRef, Input, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appFormatMontant]'
})
export class FormatMontantDirective {
  @Input('appFormatMontant') montant: number;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.formatMontant();
  }

  @HostListener('change')
  onBlur() {
    this.formatMontant();
  }

  private formatMontant() {
    const value = this.elementRef.nativeElement.value;
    const montantSansEspaces = value.replace(/\s/g, ''); // pour supprimer les espaces
    const montantNumerique = parseFloat(montantSansEspaces); // pour convertir en nombre

    if (!isNaN(montantNumerique)) {
      const options = { minimumFractionDigits: 2, maximumFractionDigits: 2 };
      const montantFormate = montantNumerique.toLocaleString('fr-FR', options);
      const montantModifie = montantFormate.replace(',', '.'); // pour remplacer la virgule par un point
      this.renderer.setProperty(this.elementRef.nativeElement, 'value', montantModifie);
    }
  }
}
