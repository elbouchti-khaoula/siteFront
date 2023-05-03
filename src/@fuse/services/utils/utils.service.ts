import { Injectable } from '@angular/core';
import { IsActiveMatchOptions } from '@angular/router';
import { SimulationDetaillee } from 'app/core/projects/simulation-detaillee.types';

@Injectable({
    providedIn: 'root'
})
export class FuseUtilsService
{
    /**
     * Constructor
     */
    constructor()
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get the equivalent "IsActiveMatchOptions" options for "exact = true".
     */
    get exactMatchOptions(): IsActiveMatchOptions
    {
        return {
            paths       : 'exact',
            fragment    : 'ignored',
            matrixParams: 'ignored',
            queryParams : 'exact'
        };
    }

    /**
     * Get the equivalent "IsActiveMatchOptions" options for "exact = false".
     */
    get subsetMatchOptions(): IsActiveMatchOptions
    {
        return {
            paths       : 'subset',
            fragment    : 'ignored',
            matrixParams: 'ignored',
            queryParams : 'subset'
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Generates a random id
     *
     * @param length
     */
    randomId(length: number = 10): string
    {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let name = '';

        for ( let i = 0; i < 10; i++ )
        {
            name += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        return name;
    }

  /**
   * Format decimal number
   *
   * @param length
   */
  numberFormat(number, decimals, dec_point, thousands_sep): string {
    var n = !isFinite(+number) ? 0 : +number,
      prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
      sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
      dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
      toFixedFix = function (n, prec) {
        // Fix for IE parseFloat(0.55).toFixed(0) = 0;
        var k = Math.pow(10, prec);
        return Math.round(n * k) / k;
      },
      s = (prec ? toFixedFix(n, prec) : Math.round(n)).toString().split('.');
    if (s[0].length > 3) {
      s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
      s[1] = s[1] || '';
      s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
  }

  convertSimulationToString(simulation: SimulationDetaillee): any {

    let estExpImmoNum: boolean;
    let expertiseImmobiliereStr = "";
    if (simulation.expertiseImmobiliere && simulation.expertiseImmobiliere > 0) {
      expertiseImmobiliereStr = this.numberFormat(simulation.expertiseImmobiliere, 2, ',', ' ');
      estExpImmoNum = true;
    } else {
      expertiseImmobiliereStr = "GRATUIT";
      estExpImmoNum = false;
    }
    let estFraisDossNum: boolean;
    let fraisDossierStr = "";
    if (simulation.fraisDossier && simulation.fraisDossier > 0) {
      fraisDossierStr = this.numberFormat(simulation.fraisDossier, 2, ',', ' ');
      estFraisDossNum = true;
    } else {
      fraisDossierStr = "GRATUIT";
      estFraisDossNum = false;
    }

    let simulationResultat = {
      ...simulation,
      mensualite: this.numberFormat(simulation.mensualite, 2, '.', ' '),
      montant: this.numberFormat(simulation.montant, 2, '.', ' '),
      totalInterets: this.numberFormat(simulation.totalInterets, 2, '.', ' '),
      assurances: this.numberFormat(simulation.assurances, 2, '.', ' '),
      tauxParticipation: this.numberFormat(simulation.tauxParticipation, 3, '.', ' '),
      tauxEffectifGlobal: this.numberFormat(simulation.tauxEffectifGlobal, 3, '.', ' '),
      coutTotal: this.numberFormat(simulation.coutTotal, 2, '.', ' '),
      expertiseImmobiliere: expertiseImmobiliereStr,
      estExpImmoNum: estExpImmoNum,
      fraisDossier: fraisDossierStr,
      estFraisDossNum: estFraisDossNum,
      totalFrais: this.numberFormat(simulation.totalFrais, 2, '.', ' '),
      droitsEnregistrement: this.numberFormat(simulation.droitsEnregistrement, 2, '.', ' '),
      conservationFonciere: this.numberFormat(simulation.conservationFonciere, 2, '.', ' '),
      fraisDivers: this.numberFormat(simulation.fraisDivers, 2, '.', ' '),
      honorairesNotaire: this.numberFormat(simulation.honorairesNotaire, 2, '.', ' '),
      nbreAnnee: Math.trunc(simulation.duree / 12),
      nbreMois: simulation.duree % 12
    }

    return simulationResultat;
  }

}
