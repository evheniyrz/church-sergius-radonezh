import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { exhaustMap, map } from 'rxjs';
import { ContentService } from 'src/app/api/services/content/content.service';
import { contentErrorAction, loadSectionContent, postArticle, postContentAction, postPreaching, postSaying, postTimetable, setArticles, setPreachings, setSayings, setSectionContent, setTimetables } from './content.actions';
import { Content } from './model/content.model';

@Injectable()
export class ContentEffect {
  constructor(private actions$: Actions, private contentService: ContentService) { }

  loadSectionContent$ = createEffect(() => this.actions$.pipe(
    ofType(loadSectionContent.type),
    exhaustMap((action: Action & { sectionId: string; }) => {

      return this.contentService.getContent(action.sectionId).pipe(
        map(content => {
          switch (action.sectionId) {
            case 'articles':

              return setArticles({ [action.sectionId]: content });

            case 'timetables':
              return setTimetables({ [action.sectionId]: content });

            case 'preachings':
              return setPreachings({ [action.sectionId]: content });

            case 'sayings':
              return setSayings({ [action.sectionId]: content });

            default:
              return contentErrorAction({ message: `Unrecognized section ID => ${action.sectionId}` });
          }
        })
      );
    })
  ));

  postContent$ = createEffect(() => this.actions$.pipe(
    ofType(postContentAction.type),
    exhaustMap((action: Action & { content: Content; sectionId: string; }) => {

      return this.contentService.postContent(action.content).pipe(
        map(response => {

          switch (action.sectionId) {
            case 'articles':

              return postArticle({ article: response });

            case 'timetables':
              return postTimetable({ timetable: response });

            case 'preachings':
              return postPreaching({ preaching: response });

            case 'sayings':
              return postSaying({ saying: response });

            default:
              return contentErrorAction({ message: `Unrecognized section ID => ${action.sectionId}` });
          }
        })

      );
    })
  ));
}
