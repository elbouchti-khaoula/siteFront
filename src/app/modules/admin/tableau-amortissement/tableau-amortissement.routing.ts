import { Route } from '@angular/router';
import { TableauAmortissementComponent } from './tableau-amortissement.component';
import { TableauAmortissementResolver } from './tableau-amortissement.resolvers';

export const tableauAmortissementRoutes: Route[] = [
    {
        path: '',
        component: TableauAmortissementComponent,
        resolve  : {
            products  : TableauAmortissementResolver
        }
    }
];