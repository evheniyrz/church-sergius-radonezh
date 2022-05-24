import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { LoginPageComponent } from './admin-login-page.component';

const routes: Route[] = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule(
  {
    imports: [
      RouterModule.forChild(routes)
    ],
    exports: [
      RouterModule
    ]
  }
)
export class LoginPageRoutingModule { }
