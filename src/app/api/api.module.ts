import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentService } from './services/content/content.service';
import { LoginService } from './services/login/login.service';
import { CalendarApiService } from './services/calendar-api/calendar-api.service';
import { CalendarService } from './services/calendar/calendar.service';
import { PlatformService } from './services/platform/platform.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    ContentService,
    LoginService,
    CalendarApiService,
    CalendarService,
    PlatformService
  ]
})
export class ApiModule { }
