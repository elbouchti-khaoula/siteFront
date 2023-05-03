import { Component, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { SimulationDetaillee } from 'app/core/projects/simulation-detaillee.types';
import { Router } from '@angular/router';

@Component({
  selector: 'consulter-simulation',
  templateUrl: './consulter-simulation.component.html',
  styleUrls: ['./consulter-simulation.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})

export class ConsulterSimulationComponent {

  simulationResultat: any;

  /**
   * Constructor
   */
  constructor(
    private _router: Router
  )
  {
    let data = this._router.getCurrentNavigation()?.extras?.state as SimulationDetaillee;
    if (data) {
      this.simulationResultat = data;
    }
    // else {
    //   this.simulationResultat = {
    //     "nom": "test1",
    //     "prenom": "test1",
    //     "telephone": "0522111111",
    //     "email": "test1@test1.com",
    //     "dateNaissance": "01/01/2000",
    //     "nationalite": "MA",
    //     "residantMaroc": true,
    //     "categorieSocioProfessionnelle": "SALA",
    //     "nomEmployeur": "Employeur",
    //     "salaire": "500 000.00",
    //     "autresRevenus": "200 000.00",
    //     "creditsEnCours": "3 000.00",
    //     "montant": "500 000.00",
    //     "objetFinancement": "ACQU",
    //     "montantProposition": "500 000.00",
    //     "duree": 240,
    //     "nomPromoteur": "Promoteur",
    //     "statutProjet": "active",
    //     "typeTaux": "FIXE",

    //     "id": 674335,
    //     "statut": "NPRO",
    //     "dossierId": 803757,
    //     "dossierMontant": "700 000.00",
    //     "dossierDuree": 240,
    //     "mensualite": "5 201.31",
    //     "tauxNominal": "5.450",
    //     "tauxEffectifGlobal": "6.457",
    //     "tauxParticipation": "0.000",
    //     "assurances": "39 231.82",
    //     "totalInterets": "509 082.58",
    //     "coutTotal": "587 546.22",
    //     "expertiseImmobiliere": "GRATUIT",
    //     "estExpImmoNum" : false,
    //     "fraisDossier": "770.00",
    //     "estFraisDossNum": true,
    //     "droitsEnregistrement": "20 000.00",
    //     "conservationFonciere": "7 700.00",
    //     "honorairesNotaire": "5 000.00",
    //     "fraisDivers": "1 500.00",
    //     "totalFrais": "34 200.00",
    //     "nbreAnnee": 20,
    //     "nbreMois": 0
    //   }
    // }
  }

}
