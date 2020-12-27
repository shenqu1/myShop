import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'shared/shared.module';

import { BsNavComponent } from './components/bs-nav/bs-nav.component';
import { LoginComponent } from './components/login/login.component';



@NgModule({
  declarations: [
    BsNavComponent,
    LoginComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([])
  ],
  exports: [
    BsNavComponent
  ]
})
export class CoreModule { }
