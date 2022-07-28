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
      },
      {
        path: 'publication',
        outlet: 'public-content',
        loadChildren: () => import('../publication/publication.module').then(m => m.PublicationModule)
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
