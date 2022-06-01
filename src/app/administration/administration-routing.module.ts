import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentEditorComponent } from './components/content-editor/content-editor.component';
import { ContentListComponent } from './components/content-list/content-list.component';
import { AdministrationComponent } from './page/administration.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: AdministrationComponent,
    children: [
      {
        path: ':sectionId',
        component: ContentListComponent,
      },
      {
        path: ':sectionId/:contentId',
        component: ContentEditorComponent
      },
      {
        path: ':sectionId/add-new',
        component: ContentEditorComponent
      },
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
