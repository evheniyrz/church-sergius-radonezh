import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CalendarApiService } from '../calendar-api/calendar-api.service';

@Injectable()
export class CalendarService {

  constructor(private calendarApi: CalendarApiService) { }

  public getCalendarData(date: string): Observable<any> {
    return this.calendarApi.requestDataByDate(date);
  }
}
