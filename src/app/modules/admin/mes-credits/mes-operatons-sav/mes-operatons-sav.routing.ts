import { Route } from '@angular/router';
import { MesCreditsComponent } from './mes-operatons-sav.component';
import { MesCreditsEnCoursResolver, OperationSAVRefResolver } from './mes-operatons-sav.resolvers';

export const mesCreditsRoutes: Route[] = [
    {
        path     : '',
        component: MesCreditsComponent,
        resolve  : {
            operationsSAVRef: OperationSAVRefResolver,
            creditsEnCours: MesCreditsEnCoursResolver
        }
    }
];
