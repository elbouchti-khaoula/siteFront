import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NosLettresWiComponent } from './nos-lettres-wi.component';
import { nosLettresWiComponentRoutes } from './nos-lettres-wi.routing';
import { SharedModule } from 'app/shared/shared.module';
import { FuseCardModule } from '@fuse/components/card';
import { MatIconModule } from '@angular/material/icon';
import { ContactezNousModule } from '../landing/contactez-nous/contactez-nous.module';



'app/modules/common/parcours-small/parcours-small.module';




@NgModule({
    declarations: [
        NosLettresWiComponent,
    ],
    imports     : [
        RouterModule.forChild(nosLettresWiComponentRoutes),
        FuseCardModule,
        SharedModule,
        ContactezNousModule,
        MatIconModule
    ]
})
export class NosLettresWiModule
{
}
