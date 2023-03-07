import { Component, Injectable, OnInit } from '@angular/core';
import { DateAdapter, MatNativeDateModule, NativeDateAdapter } from '@angular/material/core';
import { DateRange, MatCalendarCellClassFunction, MatDatepickerModule } from '@angular/material/datepicker';
import { Event as Event_2, NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs';
import { loadCalendar } from 'src/app/root-store/content-store/content.actions';
import { CustomDateAdapter } from '../shared.module';
import { DateIdentificationService } from './dates/service/date-identification/date-identification.service';

@Component({
  standalone: true,
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  imports: [
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [
    MatDatepickerModule,
    DateIdentificationService,
    { provide: DateAdapter, useClass: CustomDateAdapter },
  ]
})
export class CalendarComponent implements OnInit {

  /** also to highlight selected/current date in the calendar */
  public selectedDate!: Date | DateRange<Date> | null;

  private _easterDays: {
    easterDate: number;
    easterMonth: number;
    easterYear: number;
    easterWeekRange: Date;
    pentecost: Date;
    ascension: Date;
    isPentecostDate: (currentDate: Date) => boolean;
    isEasterWeek: (d: Date) => boolean;
    isAscensionDate: (d: Date) => boolean;
  } | null = null;

  public dateStyleFn: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    if (view === 'month') {
      const day: number = cellDate.getDay();// day of week


      switch (true) {
        case this._ds.isPostEasterHolidays(cellDate, 49):
        case this._ds?.isPostEasterHolidays(cellDate, 39):
        case this._ds.isEasterDate(cellDate):

          return ['red-date-highlight', 'border-highlight'];
        case this._ds.isEasterWeek(cellDate):
        case this._ds.isHolydays(cellDate, 'twelfth'):
        case day === 0:

          return 'red-date-highlight';
        case this._ds.isHolydays(cellDate, 'sergiy'):
          return 'sergiy-days-highlight';

        case this._ds.isDaysOfLent(cellDate):
          return 'fast-days-of-lent';

        case (day === 3 || day === 5) && (!this._ds.isEasterWeek(cellDate) || !this._ds.isPostEasterHolidays(cellDate, 49)):
          return 'fast-days-highlight';

        default:
          return '';
      }
    }

    return '';
  };

  constructor(
    private store: Store,
    private router: Router,
    private _ds: DateIdentificationService) { }

  ngOnInit(): void {
    this.router.events.pipe(
      filter<Event_2, NavigationEnd>((ev: Event_2): ev is NavigationEnd => (ev instanceof NavigationEnd)),
      filter((ev: NavigationEnd) => !ev.url.includes('/calendar/'))
    ).subscribe((ev) => {
      this.selectedDate = null;
    });
  }

  /**
   * dateChange
   */
  public dateChange(val: Date | null) {
    this.selectedDate = val;
    if (null != this.selectedDate) this.store.dispatch(loadCalendar({ date: new Date(this.selectedDate) }));
  }

}
