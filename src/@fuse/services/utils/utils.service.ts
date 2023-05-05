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
  numberFormat(number, decimals, decPoint, thousandsSep): string {
    var n = !isFinite(+number) ? 0 : +number,
      prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
      sep = (typeof thousandsSep === 'undefined') ? ',' : thousandsSep,
      dec = (typeof decPoint === 'undefined') ? '.' : decPoint,
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

    let dossiersStr = simulation.dossiers.map(
      doss => {

        let estExpImmoNum: boolean;
        let expertiseImmobiliereStr = "";

        if (doss.expertiseImmobiliere && doss.expertiseImmobiliere > 0) {
          expertiseImmobiliereStr = this.numberFormat(doss.expertiseImmobiliere, 2, '.', ' ');
          estExpImmoNum = true;
        } else {
          expertiseImmobiliereStr = "GRATUIT";
          estExpImmoNum = false;
        }
        let estFraisDossNum: boolean;
        let fraisDossierStr = "";
        if (doss.fraisDossier && doss.fraisDossier > 0) {
          fraisDossierStr = this.numberFormat(doss.fraisDossier, 2, '.', ' ');
          estFraisDossNum = true;
        } else {
          fraisDossierStr = "GRATUIT";
          estFraisDossNum = false;
        }

        return {
          ...doss,
          mensualite: this.numberFormat(doss.echeance, 2, '.', ' '),
          montant: this.numberFormat(doss.montant, 2, '.', ' '),
          totalInterets: this.numberFormat(doss.totalInterets, 2, '.', ' '),
          assurances: this.numberFormat(doss.assurances, 2, '.', ' '),
          tauxParticipation: this.numberFormat(doss.tauxParticipation, 3, '.', ' '),
          tauxEffectifGlobal: this.numberFormat(doss.tauxEffectifGlobal, 3, '.', ' '),
          coutTotal: this.numberFormat(doss.coutTotal, 2, '.', ' '),
          expertiseImmobiliere: expertiseImmobiliereStr,
          estExpImmoNum: estExpImmoNum,
          fraisDossier: fraisDossierStr,
          estFraisDossNum: estFraisDossNum,
          nbreAnnee: Math.trunc(doss.duree / 12),
          nbreMois: doss.duree % 12
        }
      }
    );

    const echeanceGlobal = simulation.dossiers
      .map(item => item.echeance)
      .reduce((prev, curr) => prev + curr, 0);

    let simulationResultat = {
      ...simulation,
      dossiers: dossiersStr,
      mensualite: this.numberFormat(echeanceGlobal, 2, '.', ' '),
      montantProposition: this.numberFormat(simulation.montantProposition, 2, '.', ' '),
      tauxEffectifGlobal: this.numberFormat(simulation.tauxEffectifGlobalPondere, 3, '.', ' '),
      totalFrais: this.numberFormat(simulation.totalFrais, 2, '.', ' '),
      droitsEnregistrement: this.numberFormat(simulation.droitsEnregistrement, 2, '.', ' '),
      conservationFonciere: this.numberFormat(simulation.conservationFonciere, 2, '.', ' '),
      fraisDivers: this.numberFormat(simulation.fraisDivers, 2, '.', ' '),
      honorairesNotaire: this.numberFormat(simulation.honorairesNotaire, 2, '.', ' '),
    }

    return simulationResultat;
  }

}
