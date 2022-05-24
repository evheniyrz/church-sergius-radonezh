import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { LoginPageComponent } from './admin-login-page.component';
import { LoginPageRoutingModule } from './login-page-routing.module';

@NgModule(
  {
    imports: [
      CommonModule,
      LoginPageRoutingModule,
      SharedModule
    ],
    declarations: [
      LoginPageComponent
    ]
  }
)
export class LoginPageModule { }