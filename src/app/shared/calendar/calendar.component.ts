import { Component, OnInit } from '@angular/core';
import { Event as Event_2, NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs';
import { loadCalendar } from 'src/app/root-store/content-store/content.actions';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  /** also to highlight selected/current date in the calendar */
  public selectedDate!: Date | string | number | null;

  constructor(
    private store: Store,
    private router: Router) { }

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
  public dateChange(val: any) {
    this.selectedDate = val;
    this.store.dispatch(loadCalendar({ date: this.selectedDate as string }));
  }

}
