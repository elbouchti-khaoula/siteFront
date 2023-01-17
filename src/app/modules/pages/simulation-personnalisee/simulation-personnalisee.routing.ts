import { Route } from '@angular/router';
import { CategoriesSPResolver } from '../common/referentiel.resolvers';
import { SimulationPersonaliseeComponent } from './simulation-personnalisee.component';

export const simulationPersonaliseeRoutes: Route[] = [
    {
        path     : '',
        component: SimulationPersonaliseeComponent,
        resolve  : {
            categories: CategoriesSPResolver
        }
    }
];
