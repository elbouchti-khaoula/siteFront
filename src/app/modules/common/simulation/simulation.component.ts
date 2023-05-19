import { Component, Input, ViewEncapsulation } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { Router } from '@angular/router';
import { FuseUtilsService } from '@fuse/services/utils';

@Component({
    selector: 'simulation',
    templateUrl: './simulation.component.html',
    styleUrls: ['./simulation.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SimulationComponent {
    montantValue: number = 0;
    dureeValue: number = 1;
    tauxValue: number = 1;
    mensualite: string = "0";

    @Input() isFull: boolean = false;
    @Input() isScreenSmall: boolean;

    /**
     * Constructor
     */
    constructor(
        private _router: Router,
        private _fuseUtilsService: FuseUtilsService
    )
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
        return this._fuseUtilsService.numberFormat(Math.round(m * 100) / 100, 2, '.', ' ');
    }

    formatLabelMontant(value: number): string {
        var n = value.toString().concat(".00");
        var parts = n.toString().split(".");
        var res = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ") + (parts[1] ? "." + parts[1] : "");
        return `  ${res} Dhs  `;
    }

    formatLabelDuree(value: number): string {
        return `  ${value} ans  `;
    }

    formatLabelTaux(value: number): string {
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
