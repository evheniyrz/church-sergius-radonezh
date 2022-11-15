import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes, UrlSegment, UrlSegmentGroup } from '@angular/router';
import { ErrorPageComponent } from './error-page/error-page.component';
import { AdminPageGuard } from './guards/admin-page/admin-page.guard';

const routes: Routes = [
  {
    path: 'home',
    redirectTo: '',
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
    path: '',
    loadChildren: () => import('./modules/public/public-page.module').then(m => m.PublicPageModule),
  },
  {
    path: '**',
    pathMatch: 'full',
    component: ErrorPageComponent
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
