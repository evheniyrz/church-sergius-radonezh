import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { PlatformService } from 'src/app/api/services/platform/platform.service';
import { loadFrontPageCalendar } from 'src/app/root-store/content-store/content.actions';
import { selectCalendarItem } from 'src/app/root-store/content-store/content.selectors';
import { Calendar } from 'src/app/root-store/content-store/model/content.model';

@Component({
  selector: 'app-calendar-viewer',
  templateUrl: './calendar-viewer.component.html',
  styleUrls: ['./calendar-viewer.component.scss']
})
export class CalendarViewerComponent implements OnInit {

  @Input() currentDate: boolean = false;

  public calendarContent$!: Observable<string | SafeHtml>;

  constructor(
    private store: Store,
    private sanitize: DomSanitizer,
    private platformService: PlatformService
  ) {
    this.calendarContent$ = this.store.select(selectCalendarItem).pipe(
      map((calendarData: Calendar | null | undefined) => {
        let html: string | SafeHtml = '<p>No calendar data provided</p>';
        if (null != calendarData && null != calendarData?.content[0].data) {
          html = this.sanitize.bypassSecurityTrustHtml(this.bufferToHtml(calendarData));
        }

        return html;
      })
    );
  }


  ngOnInit(): void {
    if (this.platformService.isBrowser() && this.currentDate) {
      this.store.dispatch(loadFrontPageCalendar({ date: Date.now() }));
    }
  }

  private bufferToHtml(calendarData: Calendar | null | undefined): string {
    let convertedData: string = '<p>Error during data conversion</p>';
    try {
      let win1251decoder = new TextDecoder('windows-1251');

      convertedData = calendarData?.content.reduce((prev, next) => {
        const buffer: number[] = next.data as number[];
        let bytes = new Uint8Array(buffer);
        prev = prev.concat(win1251decoder.decode(bytes));
        return prev;
      }, '') as string;

    } catch (error) {
      console.log('***Conversion calendar data error***', error);
    }

    return convertedData;
  }

}
