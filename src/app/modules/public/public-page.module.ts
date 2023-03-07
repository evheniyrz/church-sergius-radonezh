import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';

import { PublicPageRoutingModule } from './public-page-routing.module';
import { PublicPageComponent } from './public-page.component';
import { PublicPageHeaderComponent } from './components/public-page-header/public-page-header.component';
import { CalendarDataResolver } from './pages/calendar/calendar-data-resolver/calendar-data.resolver';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { CalendarComponent } from 'src/app/shared/calendar/calendar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    PublicPageComponent,
    PublicPageHeaderComponent,
    BreadcrumbComponent
  ],
  imports: [
    CommonModule,
    PublicPageRoutingModule,
    MatSidenavModule,
    CalendarComponent,
    MatIconModule,
    MatButtonModule
  ],
  providers: [
    CalendarDataResolver
  ]
})
export class PublicPageModule { }
