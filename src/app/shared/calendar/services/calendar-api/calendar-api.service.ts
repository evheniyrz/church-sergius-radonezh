import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class CalendarApiService {

  constructor(private httpClient: HttpClient) { }

  public requestDataByDate(date: string): Observable<any> {
    const today = new Date(date);
    console.log('%c SELECTED DATE', 'color:green;font-weight:bold;', {
      y: today.getFullYear(),
      m: today.getMonth() + 1,
      d: today.getDate()
    });
    // const url = `http://8.8.8.8:3128/https://script.pravoslavie.ru/calendar.php?images=1&hrams=0&date=0927`;
    const url = `https://www.crkvenikalendar.com/datumru-2022-8-7`;
    return this.httpClient.get(url);
  }
}
