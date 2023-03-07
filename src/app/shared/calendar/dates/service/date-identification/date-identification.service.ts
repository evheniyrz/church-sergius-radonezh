import { Injectable } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { dateMapM } from '../../dates-map';

@Injectable()
export class DateIdentificationService {

  constructor(private _dateAdapter: DateAdapter<Date>) { }


  public isDaysOfLent(d: Date): boolean {
    const currentDateMS: number = d.getTime();
    const currentYear: number = d.getFullYear();
    const dateRange: string[] | undefined = (dateMapM['daysOfLent'] as Map<number, string[]>).get(currentYear);
    const startRange: number = dateRange ? Date.parse(`${dateRange?.[0]}`) : 0;
    const endRange: number = dateRange ? new Date(`${dateRange?.[1]}`).setHours(23, 59, 59) : 0;

    return null != dateRange ? currentDateMS >= startRange && currentDateMS <= endRange && d.getDay() !== 0 : false;
  }

  public isEasterDate(d: Date): boolean {
    if (!(dateMapM['easter'] as Map<number, string | string[]>).has(d.getFullYear())) return false;
    const easterDate: Date = new Date((dateMapM['easter'] as Map<number, string>).get(d.getFullYear())!);
    const currentDate: Date = new Date(d.setHours(0, 0, 0));
    return this._dateAdapter.sameDate(currentDate, easterDate);
  }

  public isEasterWeek(d: Date): boolean {
    const ed: string | undefined = (dateMapM['easter'] as Map<number, string>).get(d.getFullYear());
    if (null == ed) return false;
    const easterDate: Date = new Date(ed);
    const easterWeekRange = this._dateAdapter.addCalendarDays(easterDate, 6);
    const easterWeekEndDate: number = easterWeekRange.getDate();
    const easterWeekEndMonth: number = easterWeekRange.getMonth();
    const currentDate: number = d.getDate();
    const currentMonth: number = d.getMonth();

    switch (true) {
      case
        (currentMonth === easterDate.getMonth() && easterWeekEndMonth === easterDate.getMonth()) &&
        (currentDate > easterDate.getDate() && currentDate <= easterWeekEndDate):
      case
        (currentMonth === easterWeekEndMonth && currentMonth !== easterDate.getMonth()) &&
        (easterWeekEndDate < easterDate.getDate() && currentDate <= easterWeekEndDate):
      case
        (currentMonth !== easterWeekEndMonth && currentMonth === easterDate.getMonth()) &&
        (easterWeekEndDate < easterDate.getDate() && currentDate > easterDate.getDate()):

        return true;

      default:
        return false;
    }
  }

  public isPostEasterHolidays(d: Date, dateEndRange: number): boolean {
    if (!(dateMapM['easter'] as Map<number, string | string[]>).has(d.getFullYear())) return false;
    const easterDate: Date = new Date((dateMapM['easter'] as Map<number, string>).get(d.getFullYear())!);
    const pentecostDate: Date = this._dateAdapter.addCalendarDays(easterDate, dateEndRange);
    const currentDate: Date = new Date(d.setHours(0, 0, 0));

    return this._dateAdapter.sameDate(currentDate, pentecostDate);
  }

  public isHolydays(d: Date, setName: string): boolean {
    const month: number = d.getMonth();
    const date: number = d.getDate();
    const currentMonth: string = month + 1 < 10 ? `0${month + 1}` : `${month + 1}`;
    const currentDate: string = date < 10 ? `0${date}` : `${date}`;
    return (dateMapM[setName] as Set<string>).has(`${currentMonth}.${currentDate}`);
  }
}
