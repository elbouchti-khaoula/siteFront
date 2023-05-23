import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NosLettresWiComponent } from './nos-lettres-wi.component';
import { nosLettresWiComponentRoutes } from './nos-lettres-wi.routing';
import { SharedModule } from 'app/shared/shared.module';
import { FuseCardModule } from '@fuse/components/card';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
    declarations: [
        NosLettresWiComponent,
    ],
    imports     : [
        RouterModule.forChild(nosLettresWiComponentRoutes),
        FuseCardModule,
        SharedModule,
        MatIconModule
    ]
})
export class NosLettresWiModule
{
}
