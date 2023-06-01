import { Route } from '@angular/router';
import { EspaceConnectedClientComponent } from './espace-connected-client.component';
import { CountCreditResolver, CountSimulationResolver } from './espace-connected-client.resolvers';

export const EspaceConnectedRoutes: Route[] = [
    {
        path     : '',
        component: EspaceConnectedClientComponent,

        resolve  : {
            countCredit: CountCreditResolver,
        }
      
    }
];
