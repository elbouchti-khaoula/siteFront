import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NotrePolitiqueRseComponent } from './notre-politique-rse.component';
import { notrePolitiqueRseRoutes } from './notre-politique-rse.routing';
import { SharedModule } from 'app/shared/shared.module';
import { FuseCardModule } from '@fuse/components/card';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
    declarations: [
        NotrePolitiqueRseComponent,
    ],
    imports     : [
        RouterModule.forChild(notrePolitiqueRseRoutes),
        FuseCardModule,
        SharedModule,
        MatIconModule
    ]
})
export class NotrePolitiqueRseModule
{
}
