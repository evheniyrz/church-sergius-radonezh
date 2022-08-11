import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Action, ActionReducer, ActionReducerMap, createFeature, createReducer, on } from '@ngrx/store';
import { Calendar, Content } from './model/content.model';
import * as ContentAction from './content.actions';
import { CalendarState, ContentState, ContentStoreState } from './content.state';



export const contentEntityAdapter = createEntityAdapter<Content>({
  selectId: model => model.id,
  sortComparer: (a: Content, b: Content) => {
    return a.createdAt > b.createdAt ? -1 : a.createdAt < b.createdAt ? 1 : 0;
  }
});

export const calendarEntityAdapter = createEntityAdapter<Calendar>({
  selectId: model => model.date.toString()
});

export const contentInitialState: ContentState = contentEntityAdapter.getInitialState();
export const calendarInitialState: CalendarState = calendarEntityAdapter.getInitialState();

export const articlesFeature = createFeature(
  {
    name: 'articles',
    reducer: createReducer(
      contentInitialState,
      on(ContentAction.setArticles, (state, { articles }) => contentEntityAdapter.setAll(articles, state)),
      on(ContentAction.postArticle, (state, { article }) => contentEntityAdapter.addOne(article, state)),
      on(ContentAction.updateArticle, (state, { article }) => contentEntityAdapter.upsertOne(article, state)),
      on(ContentAction.deleteArticle, (state, { id }) => contentEntityAdapter.removeOne(id, state)),
    )
  }
);

export const timetableFeature = createFeature(
  {
    name: 'timetables',
    reducer: createReducer(
      contentInitialState,
      on(ContentAction.setTimetables, (state, { timetables }) => contentEntityAdapter.setAll(timetables, state)),
      on(ContentAction.postTimetables, (state, { timetables }) => contentEntityAdapter.addMany(timetables, state)),
      on(ContentAction.updateTimetable, (state, { timetable }) => contentEntityAdapter.upsertOne(timetable, state)),
      on(ContentAction.deleteTimetable, (state, { id }) => contentEntityAdapter.removeOne(id, state)),
    )
  }
);

export const preachingFeature = createFeature(
  {
    name: 'preachings',
    reducer: createReducer(
      contentInitialState,
      on(ContentAction.setPreachings, (state, { preachings }) => contentEntityAdapter.setAll(preachings, state)),
      on(ContentAction.postPreaching, (state, { preaching }) => contentEntityAdapter.addOne(preaching, state)),
      on(ContentAction.updatePreaching, (state, { preaching }) => contentEntityAdapter.upsertOne(preaching, state)),
      on(ContentAction.deletePreaching, (state, { id }) => contentEntityAdapter.removeOne(id, state)),
    )
  }
);

export const sayingsFeature = createFeature(
  {
    name: 'sayings',
    reducer: createReducer(
      contentInitialState,
      on(ContentAction.setSayings, (state, { sayings }) => contentEntityAdapter.setAll(sayings, state)),
      on(ContentAction.postSaying, (state, { saying }) => contentEntityAdapter.addOne(saying, state)),
      on(ContentAction.updateSaying, (state, { saying }) => contentEntityAdapter.upsertOne(saying, state)),
      on(ContentAction.deleteSaying, (state, { id }) => contentEntityAdapter.removeOne(id, state)),
    )
  }
);

export const calendarFeature = createFeature(
  {
    name: 'calendar',
    reducer: createReducer(
      calendarInitialState,
      on(ContentAction.setCalendar, (state, { calendar }) => calendarEntityAdapter.addOne(calendar, state))
    )
  }
);

export const contentReducers: ActionReducerMap<ContentStoreState> = {
  articles: articlesFeature.reducer,
  timetables: timetableFeature.reducer,
  preachings: preachingFeature.reducer,
  sayings: sayingsFeature.reducer,
  calendar: calendarFeature.reducer
};
