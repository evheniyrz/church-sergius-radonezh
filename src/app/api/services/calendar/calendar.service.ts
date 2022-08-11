import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CalendarApiService } from '../calendar-api/calendar-api.service';
import { CalendarApiResponse } from '../calendar-api/model/calendar-api-response.model';

@Injectable()
export class CalendarService {

  constructor(private calendarApi: CalendarApiService) { }

  public getCalendarData(date: Date | string | number): Observable<CalendarApiResponse> {
    return this.calendarApi.requestDataByDate(date);
  }
}
