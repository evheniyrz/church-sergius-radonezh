import { Component, OnInit } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { DateRange, MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { Event as Event_2, NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs';
import { loadCalendar } from 'src/app/root-store/content-store/content.actions';
import { dateMapM } from './dates/dates-map';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
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
    isPentecostDate: (currentDate: Date) => boolean;
    isEasterWeek: (d: Date) => boolean;
  } | null = null;

  public dateStyleFn: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    if (view === 'month') {
      const day: number = cellDate.getDay();// day of week
      const date: number = cellDate.getDate();// number of day
      const month: number = cellDate.getMonth();
      const calendarMonth: number = month + 1; // calendar month number
      const year: number = cellDate.getFullYear();
      const easterDateString: string = `${date < 10 ? '0' + date : date}.${calendarMonth < 10 ? '0' + calendarMonth : calendarMonth}.${year}`;
      const twelfthDate: string = `${date < 10 ? '0' + date : date}.${calendarMonth < 10 ? '0' + calendarMonth : calendarMonth}`;

      if (dateMapM.easter.has(easterDateString)) {
        this._easterDays = {
          easterDate: date,
          easterMonth: month,
          easterYear: year,
          easterWeekRange: this._dateAdapter.addCalendarDays(cellDate, 6),
          pentecost: this._dateAdapter.addCalendarDays(cellDate, 49),
          isPentecostDate(date: Date): boolean {
            const currentMonth: number = date.getMonth();
            const currentDate: number = date.getDate();

            return this.pentecost.getMonth() === currentMonth && this.pentecost.getDate() === currentDate;
          },
          isEasterWeek(d: Date): boolean {
            const easterWeekEndDate: number = this.easterWeekRange.getDate();
            const easterWeekEndMonth: number = this.easterWeekRange.getMonth();
            const currentDate: number = d.getDate();
            const currentMonth: number = d.getMonth();
            // console.log('EASTER BEFORE', { cdt: d, m: this.easterMonth, d: this.easterDate, month, date, year, easterWeekEndDate, easterWeekEndMonth });
            switch (true) {
              case
                (currentMonth === this.easterMonth && easterWeekEndMonth === this.easterMonth) &&
                (currentDate > this.easterDate && currentDate <= easterWeekEndDate):
              case
                (currentMonth === easterWeekEndMonth && currentMonth !== this.easterMonth) &&
                (easterWeekEndDate < this.easterDate && currentDate <= easterWeekEndDate):
              case
                (currentMonth !== easterWeekEndMonth && currentMonth === this.easterMonth) &&
                (easterWeekEndDate < this.easterDate && currentDate > this.easterDate):

                return true;

              default:
                return false;
            }
          }
        };
      } else if (
        null != this._easterDays &&
        year !== this._easterDays.easterYear) {
        this._easterDays = null;
      }

      function isDaysOfLent(cd: Date, dateRange: string[] | undefined): boolean {
        const cMs: number = cd.getTime();
        const startRange: number = dateRange ? Date.parse(`${dateRange?.[0]}.${cd.getFullYear()}`) : 0;
        const endRange: number = dateRange ? new Date(`${dateRange?.[1]}.${cd.getFullYear()}`).setHours(23, 59, 59) : 0;

        return null != dateRange ? cMs >= startRange && cMs <= endRange && cd.getDay() !== 0 : false;
      }


      switch (true) {
        case this._easterDays?.isPentecostDate(cellDate):
        case dateMapM.easter.has(easterDateString):

          return ['red-date-highlight', 'border-highlight'];
        case this._easterDays?.isEasterWeek(cellDate):
        case dateMapM.twelfth.has(twelfthDate):
        case day === 0:

          return 'red-date-highlight';
        case isDaysOfLent(cellDate, dateMapM.daysOfLent.get(year)):

          return 'fast-days-of-lent';
        case (day === 3 || day === 5) && (!this._easterDays?.isEasterWeek(cellDate) || !this._easterDays?.isPentecostDate(cellDate)):

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
    private _dateAdapter: DateAdapter<Date>) { }

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
