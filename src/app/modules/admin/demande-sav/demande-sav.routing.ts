import { Route } from '@angular/router';
import { DemandeSAVComponent } from './demande-sav.component';
import { DemandeSAVDocumentsResolver } from './demande-sav.resolvers';

export const demandeCreditRoutes: Route[] = [
    {
        path     : '',
        component: DemandeSAVComponent,
        resolve  : {
            documents: DemandeSAVDocumentsResolver,
        }
    }
];
