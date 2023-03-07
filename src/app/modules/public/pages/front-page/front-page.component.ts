import { Component, OnInit } from '@angular/core';
import { CalendarViewerComponent } from 'src/app/shared/calendar-viewer/calendar-viewer.component';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.scss'],
  standalone: true,
  imports: [
    CalendarViewerComponent
  ]
})
export class FrontPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
