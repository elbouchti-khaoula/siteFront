import { Route } from '@angular/router';
import { AgencesResolver, VillesResolver } from '../common/referentiel.resolvers';
import { AgencesResultComponent } from './agence-result/agences-result.component';
import { AgencesComponent } from './agences.component';

export const agencesRoutes: Route[] = [
    {
        path: '',
        component: AgencesComponent,
        resolve: {
            villes: VillesResolver
        },
        children: [
            {
                path: '',
                component: AgencesResultComponent,
                resolve: {
                    agences: AgencesResolver
                }
            }
        ]
    }
];
