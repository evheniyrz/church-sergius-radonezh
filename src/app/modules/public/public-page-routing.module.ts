import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicPageComponent } from './public-page.component';

const routes: Routes = [
  {
    path: '',
    component: PublicPageComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/front-page/front-page.module').then(m => m.FrontPageModule)
      },
      {
        path: 'publication',
        loadChildren: () => import('./pages/public-resource/public-resource.module').then(m => m.PublicResourceModule),
      },
    ]
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicPageRoutingModule { }
