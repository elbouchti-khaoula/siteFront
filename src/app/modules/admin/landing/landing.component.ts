import { Component, OnInit, ViewEncapsulation, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSliderChange } from '@angular/material/slider';

@Component({
    selector: 'landing',
    templateUrl: './landing.component.html',
    styleUrls: [],
    encapsulation: ViewEncapsulation.None
})
export class LandingComponent implements OnInit {
    searchForm: FormGroup;
    isOpened = false;
    montantValue: number = 0;
    dureeValue: number = 1;
    tauxValue: number = 1;
    mensualite: string;

    updateMontant(event: MatSliderChange) {
        this.montantValue = event.value;
        this.mensualite = this.simulateur();
    }

    updateDuree(event: MatSliderChange) {
        this.dureeValue = event.value;
        this.mensualite = this.simulateur();
    }

    updateTaux(event: MatSliderChange) {
        this.tauxValue = event.value;
        this.mensualite = this.simulateur();
    }
    /**
     * Constructor
     */
    constructor(
        private _formBuilder: FormBuilder
    ) {
    }

    // @ViewChild('widgetsContent') widgetsContent: ElementRef;
    @ViewChild('widgetsContent', { read: ElementRef }) public widgetsContent: ElementRef<any>;

    public scrollRight(): void {
        // this.widgetsContent.nativeElement.scrollLeft += 200;
        this.widgetsContent.nativeElement.scrollTo({ left: (this.widgetsContent.nativeElement.scrollLeft + 200), behavior: 'smooth' });
    }

    public scrollLeft(): void {
        // this.widgetsContent.nativeElement.scrollLeft -= 200;
        this.widgetsContent.nativeElement.scrollTo({ left: (this.widgetsContent.nativeElement.scrollLeft - 200), behavior: 'smooth' });
    }

    simulateur() {
        var montant = this.montantValue;
        var duree = this.dureeValue * 12
        var taux = this.tauxValue / 100;
        var m = (montant * (taux / 12)) / (1 - Math.pow((1 + (taux / 12)), -duree));
        return (Math.round(m * 100) / 100).toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    /**
     * On init
     */
    ngOnInit(): void {
        // Create the form
        this.searchForm = this._formBuilder.group({
            region: null,
            ville: null,
            quartier: null,
            typeLogement: null,
            superficie: null,
            chambres: null
        });
    }

    formatLabelMontant(value: number): string {
        return `  ${value} Dhs  `;
    }

    formatLabelDuree(value: number) {
        return `  ${value} ans  `;
    }

    formatLabelTaux(value: number) {
        return `  ${value} %  `;
    }
}
