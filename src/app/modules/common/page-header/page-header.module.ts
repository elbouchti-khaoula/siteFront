import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { PageHeaderComponent } from './page-header.component';
import { BienvenueModule } from 'app/modules/common/bienvenue/bienvenue.module';

@NgModule({
    declarations: [
        PageHeaderComponent
    ],
    imports     : [
        SharedModule,
        BienvenueModule
    ],
    exports     : [
        PageHeaderComponent
    ]
})
export class PageHeaderModule
{
}
