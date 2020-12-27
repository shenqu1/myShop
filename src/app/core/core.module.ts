import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsNavComponent } from './components/bs-nav/bs-nav.component';
import { LoginComponent } from './components/login/login.component';
import { SharedModule } from 'shared/shared.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    BsNavComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([])
  ],
  exports: [
    BsNavComponent
  ]
})
export class CoreModule { }
