import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentEditorComponent } from './components/content-editor/content-editor.component';
import { ContentListComponent } from '../shared/content-list/content-list.component';
import { AdministrationComponent } from './page/administration.component';
import { ContentResolver } from '../shared/services/content/content.resolver';
import { ContentViewerComponent } from '../shared/content-viewer/content-viewer.component';

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
        },
        data: { isAdmin: true }
      },
      {
        path: ':sectionId/:contentId',
        component: ContentEditorComponent
      },
      {
        path: ':sectionId/view/:contentId',
        component: ContentViewerComponent
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
