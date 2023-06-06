import { Route } from '@angular/router';
import { EspaceConnectedClientComponent } from './espace-connected-client.component';
import { CountCreditResolver, CountDemandesCreditsResolver, CountDemandesSAVResolver, CountProjetsFavorisResolver, CountSimulationResolver } from './espace-connected-client.resolvers';

export const EspaceConnectedRoutes: Route[] = [
    {
        path: '',
        component: EspaceConnectedClientComponent,

        resolve: {
            countCredit: CountCreditResolver,
            countSimulation: CountSimulationResolver,
            countProjetFavoris: CountProjetsFavorisResolver,
            countDemandesCredits: CountDemandesCreditsResolver,
            countDemandesSAV: CountDemandesSAVResolver,
        }

    }
];
