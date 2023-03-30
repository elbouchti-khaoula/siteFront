import { Route } from '@angular/router';
import { ReclamationComponent } from './reclamation.component';
import { MotifsResolver } from './reclamation.resolvers';

export const reclamationRoutes: Route[] = [
    {
        path     : '',
        component: ReclamationComponent,
        resolve  : {
            motifs: MotifsResolver,
        }
    }
];
