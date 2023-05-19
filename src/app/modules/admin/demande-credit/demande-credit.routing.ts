import { Route } from '@angular/router';
import { DemandeCreditComponent } from './demande-credit.component';
import { DemandeCreditDocumentsResolver } from './demande-credit.resolvers';

export const demandeCreditRoutes: Route[] = [
    {
        path     : '',
        component: DemandeCreditComponent,
        resolve  : {
            documents: DemandeCreditDocumentsResolver,
        }
    }
];
