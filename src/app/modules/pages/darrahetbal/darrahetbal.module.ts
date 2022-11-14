import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DarrahetbalComponent } from './darrahetbal.component';
import { darrahetbalRoutes } from './darrahetbal.routing';
import { SharedModule } from 'app/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
// import { YouTubePlayerModule } from '@angular/youtube-player';

@NgModule({
    declarations: [
        DarrahetbalComponent
    ],
    imports: [
        RouterModule.forChild(darrahetbalRoutes),
        SharedModule,
        MatButtonModule,
        MatIconModule,
        // YouTubePlayerModule
    ]
})
export class DarrahetbalModule {
}
