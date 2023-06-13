import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FuseCardModule } from '@fuse/components/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { mesOperationSavRoutes } from './mes-operations-sav.routing';
import { MesOperationsSavComponent } from './mes-operations-sav.component';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
import { PageHeaderConnecteModule } from 'app/modules/common/page-header-connecte/page-header-connecte.module';

@NgModule({
  declarations: [
    MesOperationsSavComponent
  ],
  imports: [
    RouterModule.forChild(mesOperationSavRoutes),
    SharedModule,
    MatButtonModule,
    MatIconModule,
    FuseCardModule,
    // MatFormFieldModule,
    // MatInputModule,
    MatProgressBarModule,
    PageHeaderConnecteModule
  ],
})
export class MesOperationsSavModule {
}
