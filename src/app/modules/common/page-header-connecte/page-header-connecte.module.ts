import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { PageHeaderConnecteComponent } from './page-header-connecte.component';
import { BienvenueModule } from 'app/modules/common/bienvenue/bienvenue.module';

@NgModule({
    declarations: [
        PageHeaderConnecteComponent
    ],
    imports     : [
        SharedModule,
        BienvenueModule
    ],
    exports     : [
        PageHeaderConnecteComponent
    ]
})
export class PageHeaderConnecteModule
{
}
