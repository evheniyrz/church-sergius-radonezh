import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicPageComponent } from './public-page.component';

const routes: Routes = [
  {
    path: '', component: PublicPageComponent,
    pathMatch: 'full',
    children: [
      {
        path: '',
        outlet: 'public-content',
        loadChildren: () => import('./pages/front-page/front-page.module').then(m => m.FrontPageModule)
      }
    ]
  },
  // { path: 'front-page',  },
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
