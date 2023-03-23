import { Route } from '@angular/router';
import { AgencesResultComponent } from './agence-result/agences-result.component';
import { AgencesComponent } from './agences.component';

export const agencesRoutes: Route[] = [
    {
        path: '',
        component: AgencesComponent,
        children: [
            {
                path: '',
                component: AgencesResultComponent,
            }
        ]
    }
];
