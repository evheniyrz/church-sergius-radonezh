import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CalendarApiResponse } from './model/calendar-api-response.model';

@Injectable()
export class CalendarApiService {

  constructor(private httpClient: HttpClient) { }

  public requestDataByDate(date: Date | string | number): Observable<CalendarApiResponse> {
    const today = new Date(date);

    const url = `/ru/calendar/calendar.php?month=${today.getMonth() + 1}&today=${today.getDate()}&year=${today.getFullYear()}&header=1&trp=1`;
    return this.httpClient.get<CalendarApiResponse>(url);
  }
}
