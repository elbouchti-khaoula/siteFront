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
  }

}
