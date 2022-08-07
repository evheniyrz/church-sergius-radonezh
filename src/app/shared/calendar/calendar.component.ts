import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { CalendarService } from './services/calendar/calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  /** also to highlight selected/current date in the calendar */
  public selectedDate: Date | null | undefined = new Date();

  constructor(private calendarService: CalendarService) { }

  ngOnInit(): void {
  }

  /**
   * dateChange
   */
  public dateChange(val: any) {
    this.selectedDate = val;
    this.calendarService.getCalendarData(val).pipe(
      tap((response) => console.log('%c CALENDAR RESPONSE', 'color: green;font-weight: bold;', response))
    ).subscribe(
      {

        complete: () => {
          console.log('COMPLETE');
        }
      }
    );

    console.log('DATE NOW CHANGE', this.selectedDate);
  }

}
