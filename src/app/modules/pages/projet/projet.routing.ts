import { Route } from '@angular/router';
import { ProjetComponent } from './projet.component';
import { ProjetResolver } from './projet.resolvers';

export const projetRoutes: Route[] = [
    {
        path     : '',
        component: ProjetComponent,
        resolve: {
            projet: ProjetResolver
        },
    }
];
