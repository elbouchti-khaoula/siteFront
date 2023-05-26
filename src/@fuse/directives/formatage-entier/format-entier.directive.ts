import { Directive, ElementRef, HostListener, Renderer2, Input } from '@angular/core';

@Directive({
  selector: '[appFormatEntier]'
})
export class FormatEntierDirective {
  
  @Input('appFormatEntier') valeurInitiale: string;
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  @HostListener('input')
  onInput() {
    const value = this.elementRef.nativeElement.value;
    const valeurValide = value.replace(/[^\d.,]/g, ''); // Supprimer les caractères non numériques, '.', et ','

    this.renderer.setProperty(this.elementRef.nativeElement, 'value', valeurValide);
  }
}
