import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageGuard } from './guards/admin-page/admin-page.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/public/public-page.module').then(m => m.PublicPageModule),
    pathMatch: 'full'
  },
  {
    path: 'administration',
    loadChildren: () => import('./administration/administration.module').then(m => m.AdministrationModule),
    canActivate: [AdminPageGuard]
  },
  {
    path: 'authorization',
    loadChildren: () => import('./login-page/login-page.module').then(m => m.LoginPageModule)
  },
  {
    path: 'home',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking',
    // enableTracing: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
