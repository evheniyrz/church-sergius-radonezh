import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { toHTML } from 'ngx-editor';
import { exhaustMap, map, Observable, ReplaySubject, Subject, take, takeUntil, takeWhile, tap } from 'rxjs';
import { selectContentIds, selectContentItem } from 'src/app/root-store/content-store/content.selectors';
import { Content, EditorContent, TimetableContent } from 'src/app/root-store/content-store/model/content.model';

@Component({
  selector: 'app-content-viewer',
  templateUrl: './content-viewer.component.html',
  styleUrls: ['./content-viewer.component.scss']
})
export class ContentViewerComponent implements OnInit, OnDestroy {

  public isLastIndexObservable$: ReplaySubject<boolean> = new ReplaySubject(1);
  public isFirstIndexObservable$: ReplaySubject<boolean> = new ReplaySubject(1);

  private onDestroy$: Subject<void> = new Subject();

  public pageContent$: Observable<
    {
      type: 'doc' | 'formGroupValue' | 'html';
      id: string;
      htmlContent?: SafeHtml | undefined | null;
      timetableContent?: TimetableContent | undefined | null;
    } | null> =
    this.store.select(selectContentIds).pipe(
      map((ids: string[] | number[]) => {
        this._ids = ids;
        return ({ ids, length: ids.length })
      }),
      exhaustMap((idsObject) => this.store.select(selectContentItem)
        .pipe(
          tap((singleContentItem: Content | null | undefined) => {
            switch (idsObject.length) {
              case 0:
              case 1:
                this.isLastIndexObservable$.next(true);
                this.isFirstIndexObservable$.next(true);
                break;

              default:
                const currentId: string | undefined = singleContentItem?.id;
                const currentIdIndex = currentId ? (idsObject.ids as string[]).indexOf(currentId) : -1;
                this._currentIdIndex = currentIdIndex;
                switch (true) {
                  case currentIdIndex < idsObject.length - 1 && currentIdIndex > 0:
                    this.isLastIndexObservable$.next(false);
                    this.isFirstIndexObservable$.next(false);
                    break;
                  case currentIdIndex === idsObject.length - 1:
                    this.isLastIndexObservable$.next(true);
                    this.isFirstIndexObservable$.next(false);
                    break;

                  default:
                    this.isLastIndexObservable$.next(false);
                    this.isFirstIndexObservable$.next(true);
                    break;
                }
                break;
            }
          }),
          map((contentResponse: Content | null | undefined) => {
            let content = null;

            if (null != contentResponse) {
              if (contentResponse.content.editorContent.type === 'doc' &&
                (contentResponse.content.editorContent.content as EditorContent[]).length > 0) {
                content = {
                  id: contentResponse.id,
                  type: contentResponse.content.editorContent.type,
                  htmlContent: this.domSanitizer.bypassSecurityTrustHtml(toHTML(contentResponse.content.editorContent))
                };
              } else {
                content = {
                  id: contentResponse.id,
                  type: contentResponse.content.editorContent.type,
                  timetableContent: contentResponse.content.editorContent.content as TimetableContent
                };
              }
            }

            return content;
          })
        ))
    );

  private _ids!: Array<string | number>;
  private _currentIdIndex!: number;

  constructor(
    private store: Store,
    private domSanitizer: DomSanitizer,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  public nextContent(): void {
    const idSource = this._ids[this._currentIdIndex + 1];
    this.router.navigate(['../', idSource], { relativeTo: this.activatedRoute });
  }

  public previousContent(): void {
    const idSource = this._ids[this._currentIdIndex - 1];
    this.router.navigate(['../', idSource], { relativeTo: this.activatedRoute });
  }

  /**Current content is last in ids list */
  public isLastIndexOfContent(): Observable<boolean> {
    return this.isLastIndexObservable$.asObservable();
  }

  /**Current content is first in ids list */
  public isFirstIndexOfContent(): Observable<boolean> {
    return this.isFirstIndexObservable$;
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
