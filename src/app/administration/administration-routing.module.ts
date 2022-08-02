import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentEditorComponent } from './components/content-editor/content-editor.component';
import { ContentListComponent } from './components/content-list/content-list.component';
import { AdministrationComponent } from './page/administration.component';
import { ContentResolver } from './services/content/content.resolver';

const routes: Routes = [
  {
    path: '',
    component: AdministrationComponent,
    children: [
      {
        path: '',
        redirectTo: 'articles',
        pathMatch: 'full'
      },
      {
        path: ':sectionId',
        component: ContentListComponent,
        resolve: {
          content: ContentResolver
        }
      },
      {
        path: ':sectionId/:contentId',
        component: ContentEditorComponent
      },
      {
        path: ':sectionId/add-new',
        component: ContentEditorComponent
      }
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
