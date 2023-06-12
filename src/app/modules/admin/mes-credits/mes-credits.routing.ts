import { Route } from '@angular/router';
import { MesCreditsComponent } from './mes-credits.component';
import { MesCreditsEnCoursResolver } from './mes-credits.resolvers';

export const mesCreditsRoutes: Route[] = [
    {
        path     : '',
        component: MesCreditsComponent,
        resolve  : {
            creditsEnCours: MesCreditsEnCoursResolver
        }
    }
];
