import { Route } from '@angular/router';
import { MesProjetsFavorisComponent } from './mes-projets-favoris.component';
import { MesProjetsFavorisResolver } from './mes-projets-favoris.resolvers';

export const mesProjetsFavorisRoutes: Route[] = [
    {
        path     : '',
        component: MesProjetsFavorisComponent,
        resolve  : {
            projetsFavoris: MesProjetsFavorisResolver,
        }
    }
];
