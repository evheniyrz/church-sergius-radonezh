import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadCalendar } from 'src/app/root-store/content-store/content.actions';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  /** also to highlight selected/current date in the calendar */
  public selectedDate!: Date | string | number;

  constructor(
    private store: Store) { }

  ngOnInit(): void {
  }

  /**
   * dateChange
   */
  public dateChange(val: any) {
    this.selectedDate = val;
    this.store.dispatch(loadCalendar({ date: this.selectedDate }));
  }

}
