import { Route } from '@angular/router';
import { ProjetsProjetResolver, ProjetsResolver } from './common/projets.resolvers';
import { ProjetsSearchComponent } from './projets-search.component';
// import { LocalisationComponent } from './projetsResult/localisation/localisation.component';
import { ProjetComponent } from './projet/projet.component';
import { ProjetsResultComponent } from './projetsResult/projets-result.component';
import { ProjetsComponent } from './projetsResult/projets/projets.component';

export const projetsSearchRoutes: Route[] = [
    {
        path: '',
        component: ProjetsSearchComponent,
        children: [
            {
                path: '',
                component: ProjetsResultComponent,
                children: [
                    {
                        path: '',
                        component: ProjetsComponent,
                        resolve: {
                            projets: ProjetsResolver,
                        },
                        // children : [
                        //     {
                        //         path     : '',
                        //         component: LocalisationComponent,
                        //     }
                        // ]
                    }
                ]
            }
        ]
    },
    {
        path     : 'projet/:id',
        component: ProjetComponent,
        resolve: {
            projet: ProjetsProjetResolver
        },
    }
];
