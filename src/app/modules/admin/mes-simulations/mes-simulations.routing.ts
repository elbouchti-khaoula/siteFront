import { Route } from '@angular/router';
import { MesSimulationsComponent } from './mes-simulations.component';
import { MesSimulationsResolver } from './mes-simulations.resolvers';

export const mesSimulationsRoutes: Route[] = [
    {
        path     : '',
        component: MesSimulationsComponent,
        resolve: {
            simulations: MesSimulationsResolver,
        }
    }
];
