import { Route } from '@angular/router';
import { AgencesResultComponent } from './agence-result/agences-result.component';
import { AgencesComponent } from './agences.component';
import { AgencesResolver } from './agences.resolvers';

export const agencesRoutes: Route[] = [
    {
        path: '',
        component: AgencesComponent,
        children: [
            {
                path: '',
                component: AgencesResultComponent,
                resolve: {
                    agences: AgencesResolver,
                }
            }
        ]
    }
];
