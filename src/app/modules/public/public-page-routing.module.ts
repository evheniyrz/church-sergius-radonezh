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
        loadChildren: () => import('./pages/front-page/front-page.module').then(m => m.FrontPageModule)
      },
      {
        path: 'calendar',
        loadChildren: () => import('./pages/calendar/calendar.module').then(m => m.CalendarModule),
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
