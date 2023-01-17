import { Route } from '@angular/router';
import { TypesBiensResolver, VillesResolver } from '../common/referentiel.resolvers';
import { LandingComponent } from './landing.component';

export const landingRoutes: Route[] = [
    {
        path     : '',
        component: LandingComponent,
        resolve  : {
            villes: VillesResolver,
            typesBiens: TypesBiensResolver
        },
    }
];
