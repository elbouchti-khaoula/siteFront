import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { Subject } from 'rxjs';
import { resize } from 'app/modules/common/resize';
import { SimulationDetaillee } from '../simulation-detaillee/simulation-detaillee.types';

@Component({
  selector: 'consulter-simulation',
  templateUrl: './consulter-simulation.component.html',
  styleUrls: ['./consulter-simulation.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [fuseAnimations, resize]
})

export class ConsulterSimulationComponent implements OnInit, OnDestroy {

  simulationResultat: SimulationDetaillee;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   */
  constructor() {
    this.simulationResultat = {
      "nom": "test1",
      "prenom": "test1",
      "telephone": "0522111111",
      "email": "test1@test1.com",
      "dateNaissance": "01/01/2000",
      "nationalite": "MA",
      "residantMaroc": true,
      "categorieSocioProfessionnelle": "SALA",
      "nomEmployeur": "Employeur",
      "salaire": 500000,
      "autresRevenus": 200000,
      "creditsEnCours": 3000,
      "montant": 500000,
      "objetFinancement": "ACQU",
      "montantProposition": 500000,
      "duree": 240,
      "nomPromoteur": "Promoteur",
      "statutProjet": "active",
      "typeTaux": "FIXE",
      "id": 674335,
      "statut": "NPRO",
      "dossierId": 803757,
      "dossierMontant": 700000,
      "dossierDuree": 240,
      "mensualite": 5201.31,
      "tauxNominal": 5.45,
      "tauxEffectifGlobal": 6.457,
      "tauxParticipation": 0,
      "assurances": 39231.82,
      "totalInterets": 509082.58,
      "coutTotal": 587546.22,
      "fraisDossier": 770,
      "expertiseImmobiliere": 0,
      "droitsEnregistrement": 20000,
      "conservationFonciere": 7700,
      "honorairesNotaire": 5000,
      "fraisDivers": 1500,
      "totalFrais": 34200,
      "nbreAnnee": 20,
      "nbreMois": 0
    }
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  ngOnInit(): void {

  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

}
