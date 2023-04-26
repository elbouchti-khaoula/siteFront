import { Component, Input, ViewEncapsulation } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { Router } from '@angular/router';

@Component({
    selector       : 'simulation',
    templateUrl    : './simulation.component.html',
    styleUrls      : ['./simulation.component.scss'],
    encapsulation  : ViewEncapsulation.None
})
export class SimulationComponent
{
    montantValue: number = 0;
    dureeValue: number = 1;
    tauxValue: number = 1;
    mensualite: string = "0";

    @Input() isFull: boolean = false;
    @Input() isScreenSmall: boolean;

    /**
     * Constructor
     */
    constructor(private _router: Router)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
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
        const montant = this.montantValue;
        const duree = this.dureeValue * 12
        const taux = this.tauxValue / 100;
        var m = (montant * (taux / 12)) / (1 - Math.pow((1 + (taux / 12)), -duree));
        return (Math.round(m * 100) / 100).toLocaleString('es-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
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

    /**
     * Perform the search and navigate
     */
    navigateToSimulationPersonnalisee(): void {
        // Add query params using the router
        this._router.navigate(
            ['/simulation-personnalisee'],
            {
                queryParams: { montant: this.montantValue, duree: this.dureeValue }
            }
        );
    }
}
