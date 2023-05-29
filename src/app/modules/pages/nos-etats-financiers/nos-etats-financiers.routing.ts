import { Route } from '@angular/router';
import { NosEtatsFinanciersComponent } from './nos-etats-financiers.component';
import { NosEtatsFinanciersResolver } from './nos-etats-financiers.resolvers';

export const nosEtatsFinanciersRoutes: Route[] = [
    {
        path     : '',
        component: NosEtatsFinanciersComponent,
        resolve  : {
            etatsFinanciers: NosEtatsFinanciersResolver,
        }
    }
];
