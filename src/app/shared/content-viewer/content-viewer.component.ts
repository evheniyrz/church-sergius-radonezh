import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { toHTML } from 'ngx-editor';
import { map, Observable, take } from 'rxjs';
import { selectContentItem } from 'src/app/root-store/content-store/content.selectors';
import { Content, EditorContent, TimetableContent } from 'src/app/root-store/content-store/model/content.model';

@Component({
  selector: 'app-content-viewer',
  templateUrl: './content-viewer.component.html',
  styleUrls: ['./content-viewer.component.scss']
})
export class ContentViewerComponent implements OnInit {

  public pageContent$: Observable<
    {
      type: 'doc' | 'formGroupValue' | 'html';
      htmlContent?: SafeHtml | undefined | null;
      timetableContent?: TimetableContent | undefined | null;
    } | null> = this.store.select(selectContentItem)
      .pipe(
        map((contentResponse: Content | null | undefined) => {
          let content = null;

          if (null != contentResponse) {
            if (contentResponse.content.editorContent.type === 'doc' &&
              (contentResponse.content.editorContent.content as EditorContent[]).length > 0) {
              content = {
                type: contentResponse.content.editorContent.type,
                htmlContent: this.domSanitizer.bypassSecurityTrustHtml(toHTML(contentResponse.content.editorContent))
              };
            } else {
              content = {
                type: contentResponse.content.editorContent.type,
                timetableContent: contentResponse.content.editorContent.content as TimetableContent
              };
            }
          }
          /**DEV */
          // else {
          //   content = {
          //     type: ("formGroupValue") as 'doc' | 'formGroupValue' | 'html',
          //     timetableContent: {
          //       "dateRange": { "startDate": "2022-09-24T21:00:00.000Z", "endDate": "2022-09-30T21:00:00.000Z" },
          //       "timetables": [
          //         {
          //           "date": "2022-09-21T21:00:00.000Z",
          //           "description": [
          //             { "hours": "03", "minutes": "00", "text": "awesome description" },
          //             { "hours": "05", "minutes": "00", "text": "next level" }
          //           ]
          //         },
          //         {
          //           "date": "2022-09-22T21:00:00.000Z",
          //           "description": [
          //             { "hours": "05", "minutes": "00", "text": "next day level" }
          //           ]
          //         }],
          //     },
          //     htmlContent: null
          //   };
          // }

          return content;
        }),
        take(1)
      );
  constructor(private store: Store, private domSanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

}
