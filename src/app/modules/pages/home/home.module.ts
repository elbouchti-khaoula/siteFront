import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'app/shared/shared.module';
import { HomeComponent } from './home.component';
import { homeRoutes } from './home.routing';

@NgModule({
    declarations: [
        HomeComponent
    ],
    imports     : [
        RouterModule.forChild(homeRoutes),
        MatButtonModule,
        MatIconModule,
        SharedModule
    ]
})
export class HomeModule
{
}
