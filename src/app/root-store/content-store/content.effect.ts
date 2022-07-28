import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { exhaustMap, map } from 'rxjs';
import { ContentService } from 'src/app/api/services/content/content.service';
import { contentErrorAction, deleteArticle, deleteContent, deletePreaching, deleteSaying, deleteTimetable, loadSectionContent, postArticle, postContentAction, postPreaching, postSaying, postTimetables, setArticles, setPreachings, setSayings, setSectionContent, setTimetables, updateArticle, updateContent, updatePreaching, updateSaying, updateTimetable } from './content.actions';
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

      return this.contentService.postContent(action.content, action.sectionId).pipe(
        map(response => {

          switch (action.sectionId) {
            case 'articles':

              return postArticle({ article: response });

            case 'timetables':
              return postTimetables({ timetables: response });

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

  updateContent$ = createEffect(() => this.actions$.pipe(
    ofType(updateContent.type),
    exhaustMap((action: Action & { content: Content; contentId: string; sectionId: string; }) => {
      return this.contentService.updateContent(action.content, action.contentId, action.sectionId).pipe(
        map(response => {

          switch (action.sectionId) {
            case 'articles':

              return updateArticle({ article: response });

            case 'timetables':
              return updateTimetable({ timetable: response });

            case 'preachings':
              return updatePreaching({ preaching: response });

            case 'sayings':
              return updateSaying({ saying: response });

            default:
              return contentErrorAction({ message: `Unrecognized section ID => ${action.sectionId}` });
          }
        })

      );
    })
  ));

  deleteContent$ = createEffect(() => this.actions$.pipe(
    ofType(deleteContent.type),
    exhaustMap((action: Action & { contentId: string; sectionId: string; }) => {
      return this.contentService.deleteContent(action.contentId, action.sectionId).pipe(
        map(response => {

          switch (action.sectionId) {
            case 'articles':

              return deleteArticle({ id: action.contentId });

            case 'timetables':
              return deleteTimetable({ id: action.contentId });

            case 'preachings':
              return deletePreaching({ id: action.contentId });

            case 'sayings':
              return deleteSaying({ id: action.contentId });

            default:
              return contentErrorAction({ message: `Unrecognized section ID => ${action.sectionId}` });
          }
        })
      )
    })
  ));
}
