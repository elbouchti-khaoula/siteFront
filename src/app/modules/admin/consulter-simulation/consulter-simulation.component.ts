import { Component, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { SimulationDetaillee } from 'app/core/projects/projects.types';
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
    //     "nom": "TEST",
    //     "prenom": "TEST",
    //     "dateNaissance": "02/01/1990",
    //     "nationalite": "MAROCAINE",
    //     "residantMaroc": "Oui",
    //     "salaire": "300 000.00",
    //     "autresRevenus": 0,
    //     "segment": "NV",
    //     "creditsEnCours": "0.00",
    //     "nomEmployeur": "WAFA immobilier",
    //     "email": "a.kadmiri@outlook.fr",
    //     "telephone": "0612345678",
    //     "proprietaireMaroc": false,
    //     "capital": 0,
    //     "objetFinancement": "ACQUISITION",
    //     "nomPromoteur": "KETTANI IMMO",
    //     "typeTaux": "Valeur Fixe",
    //     "newSimulation": false,
    //     "id": 675141,
    //     "montant": "2 500 000.00",
    //     "montantProposition": "2 000 000.00",
    //     "duree": 240,
    //     "statut": "NPRO",
    //     "tauxNominalPondere": 2.409015,
    //     "tauxEffectifGlobalPondere": 3.0459165,
    //     "tauxAssurancePondere": 0.3959999999999999,
    //     "tauxInteretsClientTtc": 2.6499165,
    //     "dossiers": [
    //         {
    //             "id": 805628,
    //             "montant": "1 300 000.00",
    //             "duree": 240,
    //             "echeance": 7470.13,
    //             "tauxNominal": 2.7272,
    //             "tauxEffectifGlobal": "3.396",
    //             "tauxParticipation": "0.000",
    //             "fraisDossier": "GRATUIT",
    //             "assurances": "57 469.46",
    //             "totalInterets": "435 361.74",
    //             "coutTotal": "1 792 831.20",
    //             "mensualite": "7 470.13",
    //             "expertiseImmobiliere": "GRATUIT",
    //             "estExpImmoNum": false,
    //             "estFraisDossNum": false,
    //             "nbreAnnee": 20,
    //             "nbreMois": 0
    //         },
    //         {
    //             "id": 805627,
    //             "montant": "700 000.00",
    //             "duree": 240,
    //             "echeance": 3673.93,
    //             "tauxNominal": 1.8181,
    //             "tauxEffectifGlobal": "2.396",
    //             "tauxParticipation": "0.000",
    //             "fraisDossier": "GRATUIT",
    //             "assurances": "30 038.67",
    //             "totalInterets": "151 704.53",
    //             "coutTotal": "881 743.20",
    //             "mensualite": "3 673.93",
    //             "expertiseImmobiliere": "GRATUIT",
    //             "estExpImmoNum": false,
    //             "estFraisDossNum": false,
    //             "nbreAnnee": 20,
    //             "nbreMois": 0
    //         }
    //     ],
    //     "droitsEnregistrement": "100 000.00",
    //     "conservationFonciere": "37 500.00",
    //     "honorairesNotaire": "25 000.00",
    //     "fraisDivers": "1 500.00",
    //     "totalFrais": "164 000.00",
    //     "mensualite": "11 144.06",
    //     "tauxEffectifGlobal": "3.046"
    // }
  }

}
