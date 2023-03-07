import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicPageComponent } from './public-page.component';
import { CalendarDataResolver } from './pages/calendar/calendar-data-resolver/calendar-data.resolver';
import { ContentListComponent } from 'src/app/shared/content-list/content-list.component';
import { ContentResolver } from 'src/app/shared/services/content/content.resolver';
import { ContentViewerComponent } from 'src/app/shared/content-viewer/content-viewer.component';

const routes: Routes = [
  {
    path: '',
    component: PublicPageComponent,
    children: [
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
        component: ContentViewerComponent,
        resolve: {
          content: ContentResolver
        },
      },
      {
        path: '',
        loadComponent: () => import('./pages/front-page/front-page.component').then(m => m.FrontPageComponent)
      },
      {
        path: 'calendar/:date',
        loadComponent: () => import('../../shared/calendar-viewer/calendar-viewer.component').then(m => m.CalendarViewerComponent),
        resolve: {
          calendar: CalendarDataResolver
        }
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
