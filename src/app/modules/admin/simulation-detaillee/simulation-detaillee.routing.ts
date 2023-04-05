import { Route } from '@angular/router';
import { CategoriesSPResolver, NationalitesResolver, ObjetsFinancementResolver } from 'app/modules/common/referentiel.resolvers';
import { SimulationDetailleeComponent } from './simulation-detaillee.component';

export const simulationDetailleeRoutes: Route[] = [
    {
        path     : '',
        component: SimulationDetailleeComponent,
        resolve  : {
            categories: CategoriesSPResolver,
            nationalites: NationalitesResolver,
            objetsFinancement: ObjetsFinancementResolver
        }
    }
];
