import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Action, ActionReducer, ActionReducerMap, createFeature, createReducer, on } from '@ngrx/store';
import { Content } from './model/content.model';
import * as DashboardAction from './content.actions';
import { ContentState, ContentStoreState } from './content.state';



export const contentEntityAdapter = createEntityAdapter<Content>({
  selectId: model => model.id,
  sortComparer: (a: Content, b: Content) => {
    return a.createdAt > b.createdAt ? -1 : a.createdAt < b.createdAt ? 1 : 0;
  }
});

export const contentInitialState: ContentState = contentEntityAdapter.getInitialState();

export const articlesFeature = createFeature(
  {
    name: 'articles',
    reducer: createReducer(
      contentInitialState,
      on(DashboardAction.setArticles, (state, { articles }) => contentEntityAdapter.setAll(articles, state)),
      on(DashboardAction.postArticle, (state, { article }) => contentEntityAdapter.addOne(article, state)),
      on(DashboardAction.updateArticle, (state, { article }) => contentEntityAdapter.upsertOne(article, state)),
      on(DashboardAction.deleteArticle, (state, { id }) => contentEntityAdapter.removeOne(id, state)),
    )
  }
);

export const timetableFeature = createFeature(
  {
    name: 'timetables',
    reducer: createReducer(
      contentInitialState,
      on(DashboardAction.setTimetables, (state, { timetables }) => contentEntityAdapter.setAll(timetables, state)),
      on(DashboardAction.postTimetables, (state, { timetables }) => contentEntityAdapter.addMany(timetables, state)),
      on(DashboardAction.updateTimetable, (state, { timetable }) => contentEntityAdapter.upsertOne(timetable, state)),
      on(DashboardAction.deleteTimetable, (state, { id }) => contentEntityAdapter.removeOne(id, state)),
    )
  }
);

export const preachingFeature = createFeature(
  {
    name: 'preachings',
    reducer: createReducer(
      contentInitialState,
      on(DashboardAction.setPreachings, (state, { preachings }) => contentEntityAdapter.setAll(preachings, state)),
      on(DashboardAction.postPreaching, (state, { preaching }) => contentEntityAdapter.addOne(preaching, state)),
      on(DashboardAction.updatePreaching, (state, { preaching }) => contentEntityAdapter.upsertOne(preaching, state)),
      on(DashboardAction.deletePreaching, (state, { id }) => contentEntityAdapter.removeOne(id, state)),
    )
  }
);

export const sayingsFeature = createFeature(
  {
    name: 'sayings',
    reducer: createReducer(
      contentInitialState,
      on(DashboardAction.setSayings, (state, { sayings }) => contentEntityAdapter.setAll(sayings, state)),
      on(DashboardAction.postSaying, (state, { saying }) => contentEntityAdapter.addOne(saying, state)),
      on(DashboardAction.updateSaying, (state, { saying }) => contentEntityAdapter.upsertOne(saying, state)),
      on(DashboardAction.deleteSaying, (state, { id }) => contentEntityAdapter.removeOne(id, state)),
    )
  }
);

export const contentReducers: ActionReducerMap<ContentStoreState> = {
  articles: articlesFeature.reducer,
  timetables: timetableFeature.reducer,
  preachings: preachingFeature.reducer,
  sayings: sayingsFeature.reducer
};
