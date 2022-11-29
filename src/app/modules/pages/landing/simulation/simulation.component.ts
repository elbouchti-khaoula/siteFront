import { Component, Input, ViewEncapsulation } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { fuseAnimations } from '@fuse/animations';

@Component({
    selector       : 'simulation',
    templateUrl    : './simulation.component.html',
    encapsulation  : ViewEncapsulation.None,
    animations: fuseAnimations
})
export class SimulationComponent
{
    montantValue: number = 0;
    dureeValue: number = 1;
    tauxValue: number = 1;
    mensualite: string = "0";

    @Input() isChild: boolean = false;

    hasAppeared1: boolean = false;
    hasAppeared2: boolean = false;

    /**
     * Constructor
     */
    constructor()
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    onAppear1() {
        this.hasAppeared1 = true;
        // console.log("I have appeared! 1");   // This is a good idea for debugging
    }
    onDisappear1() {
        this.hasAppeared1 = false;
    }

    onAppear2() {
        this.hasAppeared2 = true;
    }
    onDisappear2() {
        this.hasAppeared2 = false;
    }

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
        var duree = this.dureeValue * 12
        var taux = this.tauxValue / 100;
        var m = (montant * (taux / 12)) / (1 - Math.pow((1 + (taux / 12)), -duree));
        return (Math.round(m * 100) / 100).toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
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