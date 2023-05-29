import { Route } from '@angular/router';
import { NosLettresWiComponent } from './nos-lettres-wi.component';
import { NosLettreResolver } from './nos-lettre-wi.resolvers';


export const nosLettresWiComponentRoutes: Route[] = [
    {
        path     : '',
        component: NosLettresWiComponent,
        resolve  : {
            lettre: NosLettreResolver,
        }
    }
];
