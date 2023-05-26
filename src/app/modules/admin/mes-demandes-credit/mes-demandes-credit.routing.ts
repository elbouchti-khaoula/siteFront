import { Route } from '@angular/router';
import { MesDemandesCreditComponent } from './mes-demandes-credit.component';
import { MesDemandesCreditResolver } from './mes-demandes-credit.resolvers';

export const mesDemandesCreditRoutes: Route[] = [
    {
        path     : '',
        component: MesDemandesCreditComponent,
        resolve  : {
            documents: MesDemandesCreditResolver,
        }
    }
];
