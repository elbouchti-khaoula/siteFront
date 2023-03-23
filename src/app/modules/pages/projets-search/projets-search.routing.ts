import { Route } from '@angular/router';
import { ProjetsProjetResolver, ProjetsResolver } from './projets.resolvers';
import { ProjetsSearchComponent } from './projets-search.component';
import { ProjetComponent } from './projet/projet.component';
import { ProjetsResultComponent } from './projets-result/projets-result.component';

export const projetsSearchRoutes: Route[] = [
    {
        path: '',
        component: ProjetsSearchComponent,
        children: [
            {
                path: '',
                component: ProjetsResultComponent,
                resolve: {
                    projets: ProjetsResolver,
                }
            }
        ]
    },
    {
        path     : 'projet-details',
        component: ProjetComponent,
        resolve: {
            projet: ProjetsProjetResolver
        },
    }
];
