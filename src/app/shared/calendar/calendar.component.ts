import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  /** also to highlight selected/current date in the calendar */
  public selectedDate: Date | null | undefined = new Date();

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * dateChange
   */
  public dateChange(val: any) {
    this.selectedDate = val;
    console.log('DATE NOW CHANGE', this.selectedDate);
  }

}
