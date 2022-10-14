import { Component, OnInit, ViewEncapsulation, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSliderChange } from '@angular/material/slider';
// import { formatNumber } from '@angular/common';
// import { BehaviorSubject } from 'rxjs'

@Component({
    selector: 'landingBis',
    templateUrl: './landingBis.component.html',
    styleUrls: [],
    encapsulation: ViewEncapsulation.None
})
export class LandingBisComponent implements OnInit {
    searchForm: FormGroup;
    isOpened = false;
    montantValue: number = 0;
    dureeValue: number = 1;
    tauxValue: number = 1;
    mensualite: string;
    dateApp =  new Date();

    // private slideSubject = new BehaviorSubject<number>(0);
    // readonly slideValue$ = this.slideSubject.asObservable();
    // updateSliderValue(event: MatSliderChange) {
    //     this.slideSubject.next(event.value);
    // }

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

    simulateur() {
        var montant = this.montantValue;
        // console.log("+-+-+- montant", montant, this.montantValue);
        var duree = this.dureeValue * 12
        // console.log("+-+-+- duree", duree, this.dureeValue);
        var taux = this.tauxValue / 100;
        // console.log("+-+-+- taux", taux, this.tauxValue);
        var m = (montant * (taux / 12)) / (1 - Math.pow((1 + (taux / 12)), -duree));
        // console.log("+-+-+- m", m);
        return (Math.round(m * 100) / 100).toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        // return formatNumber((Math.round(m * 100) / 100), 'en-US', '1.2-2');
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
        this.simulateur();
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
