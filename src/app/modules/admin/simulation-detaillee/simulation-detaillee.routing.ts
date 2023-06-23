import { Route } from '@angular/router';
import { SimulationDetailleeComponent } from './simulation-detaillee.component';
import { CountSimulationResolver } from '../espace-connected-client/espace-connected-client.resolvers';

export const simulationDetailleeRoutes: Route[] = [
    {
        path     : '',
        component: SimulationDetailleeComponent,
        resolve: {
            countSimulation: CountSimulationResolver
        }
    }
];
