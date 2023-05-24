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
    const montantSansEspaces = value.replace(/\s/g, ''); // Supprimer les espaces
    const montantNumerique = parseFloat(montantSansEspaces); // Convertir en nombre

    if (!isNaN(montantNumerique)) {
      const montantFormate = montantNumerique.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      this.renderer.setProperty(this.elementRef.nativeElement, 'value', montantFormate);
    }
  }

  private removeFormatting() {
    const value = this.elementRef.nativeElement.value;
    const montantSansSeparateurs = value.replace(/\s/g, ''); // Supprimer les espaces
    this.renderer.setProperty(this.elementRef.nativeElement, 'value', montantSansSeparateurs);
  }
}
