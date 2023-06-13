import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { PageHeaderComponent } from './page-header.component';

@NgModule({
    declarations: [
        PageHeaderComponent
    ],
    imports     : [
        SharedModule
    ],
    exports     : [
        PageHeaderComponent
    ]
})
export class PageHeaderModule
{
}
