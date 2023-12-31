import { Route } from '@angular/router';
import { NotrePolitiqueRseComponent } from './notre-politique-rse.component';
import { DetailParInitiativeComponent } from './detail-par-initiative/detail-par-initiative.component';

export const notrePolitiqueRseRoutes: Route[] = [
  {
    path: '',
    children: [
        {
            path: '',
            redirectTo: '',
            component: NotrePolitiqueRseComponent,
            pathMatch: 'full'
          },
        {
            path: 'detail/:idInitiative',
            component: DetailParInitiativeComponent
        }
     
    ]
  }
];
