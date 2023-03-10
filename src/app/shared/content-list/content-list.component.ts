import { Component, Inject, Input, LOCALE_ID, OnInit } from '@angular/core';
import { Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { exhaustMap, map, Observable, tap } from 'rxjs';
import { selectContentList } from 'src/app/root-store/content-store/content.selectors';
import { Content, ContentType, EditorContent, TimetableContent } from 'src/app/root-store/content-store/model/content.model';
import { selectRouteNestedParams } from 'src/app/root-store/root.selectors';
import { ContentList } from 'src/app/shared/grid-list/grid-list.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-content-list',
  templateUrl: './content-list.component.html',
  styleUrls: ['./content-list.component.scss'],
  providers: [
    DatePipe
  ]
})
export class ContentListComponent implements OnInit {
  @Input() isAdminRoute = false;

  public contentType: ContentType = 'articles';

  public contentList$: Observable<ContentList[] | undefined> = this.store.select(selectRouteNestedParams).pipe(
    tap(params => {
      if (null != params && 'sectionId' in params) {
        this.contentType = params['sectionId'];// navigation - :sectionId
      }

    }),
    exhaustMap(() => this.store.select(selectContentList).pipe(
      map((content: Content[] | null) => {

        let contentList: ContentList[] | undefined = [] as ContentList[];

        contentList = content?.map(element => {

          let headingElement;
          let imageElement;
          switch (element.content.editorContent.type) {
            case 'formGroupValue':

              headingElement = {
                startDay: this.datePipe.transform((element.content.editorContent.content as TimetableContent).dateRange.startDate, 'dd-LLL-yyyy', '', this.locale),
                endDay: this.datePipe.transform((element.content.editorContent.content as TimetableContent).dateRange.endDate, 'dd-LLL-yyyy', '', this.locale)
              };

              break;

            default:
              headingElement = (element.content.editorContent.content as EditorContent[]).find(element => element.type === 'heading' && (element.attrs.level === 1 || element.attrs.level === 2));
              imageElement = (element.content.editorContent.content as EditorContent[]).find(element => element.type === 'paragraph' && element.content?.[0].type === 'image');
              break;
          }



          const adminPageContent: ContentList = {
            contentId: element.id,
            title: headingElement?.content?.[0].text ? headingElement?.content?.[0].text : (headingElement as { startDay: string; endDay: string; })?.startDay ? `${(headingElement as { startDay: string; endDay: string; })['startDay']} - ${(headingElement as { startDay: string; endDay: string; })['endDay']}` : 'title unavailable',
            date: element.createdAt,
            author: element.author,
            imgSrc: imageElement?.content[0].attrs?.src ?? '',
            contentType: element.contentType
          } as ContentList;

          return adminPageContent;
        });

        return contentList;
      })
    ))
  )

  public contentSection$: Observable<Params> = this.store.select(selectRouteNestedParams);

  constructor(private store: Store, private datePipe: DatePipe, @Inject(LOCALE_ID) private locale: string) { }

  ngOnInit(): void {
  }

}
