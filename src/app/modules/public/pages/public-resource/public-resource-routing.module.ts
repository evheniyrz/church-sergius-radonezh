import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentListComponent } from 'src/app/shared/content-list/content-list.component';
import { ContentViewerComponent } from 'src/app/shared/content-viewer/content-viewer.component';
import { ContentResolver } from 'src/app/shared/services/content/content.resolver';

const routes: Routes = [
  {
    path: ':sectionId',
    component: ContentListComponent,
    resolve: {
      content: ContentResolver
    },
    data: { isAdmin: false }
  },
  {
    path: ':sectionId/view/:contentId',
    component: ContentViewerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicResourceRoutingModule { }
