import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectRouteNestedParams, selectRouteParam, selectRouteParams } from '../root.selectors';
import { calendarEntityAdapter, contentEntityAdapter } from './content.reducers';
import { ContentState, ContentStoreState } from './content.state';

export const calendarFeatureSelector = createFeatureSelector<ContentState>('calendar');
// export const timetableFeatureSelector = createFeatureSelector<ContentState>('timetable');
// export const preachesFeatureSelector = createFeatureSelector<ContentState>('preaches');
// export const sayingsFeatureSelector = createFeatureSelector<ContentState>('sayings');

export const contentRootFeatureSelector = createFeatureSelector<ContentStoreState>('content');

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = contentEntityAdapter.getSelectors();

const calendarSelectors = calendarEntityAdapter.getSelectors();

export const selectContentEntities = createSelector(contentRootFeatureSelector, selectRouteParams, (state, { sectionId }) => {
  return sectionId ? selectEntities(state[sectionId]) : {};
});

export const selectContentIds = createSelector(contentRootFeatureSelector, selectRouteParams, (state, { sectionId }) => {
  return sectionId ? selectIds(state[sectionId]) : [];
});

export const selectContentTotal = createSelector(contentRootFeatureSelector, selectRouteParams, (state, { sectionId }) => {
  return selectTotal(state[sectionId]);
});

export const selectCalendarEntities = createSelector(contentRootFeatureSelector, selectRouteParams, (state, { sectionId }) => {
  return calendarSelectors.selectEntities(state['calendar']);
})

// export const selectArticleEntities = createSelector(articlesFeatureSelector, selectEntities);
// export const selectTimetableEntities = createSelector(timetableFeatureSelector, selectEntities);
// export const selectPreachingEntities = createSelector(preachesFeatureSelector, selectEntities);
// export const selectSayingEntities = createSelector(sayingsFeatureSelector, selectEntities);

export const selectContentList = createSelector(contentRootFeatureSelector, selectRouteParams, (state, { sectionId }) => {

  return null != state[sectionId] ? selectAll(state[sectionId]) : null;
});

// export const selectArticles = createSelector(articlesFeatureSelector, selectAll);
// export const selectTimetables = createSelector(timetableFeatureSelector, selectAll);
// export const selectPreachings = createSelector(preachesFeatureSelector, selectAll);
// export const selectSayings = createSelector(sayingsFeatureSelector, selectAll);

export const selectContentItem = createSelector(selectContentEntities, selectRouteNestedParams, (content, { contentId }) => {

  return null != content[contentId] ? content[contentId] : null;
});

export const selectCalendarItem = createSelector(
  selectCalendarEntities,
  selectRouteNestedParams,
  (calendarEntities, { date }) => {
    const calendarDate = null != date ? new Date(date).toDateString() : new Date().toDateString();
    return null != calendarEntities[calendarDate] ? calendarEntities[calendarDate] : null;
  });

// export const selectArticle = createSelector(selectArticleEntities, selectRouteNestedParams, (articles, { contentId }) => articles[contentId]);
// export const selectTimetable = createSelector(selectTimetableEntities, selectRouteNestedParams, (timetables, { contentId }) => timetables[contentId]);
// export const selectPreaching = createSelector(selectPreachingEntities, selectRouteNestedParams, (preachings, { contentId }) => preachings[contentId]);
// export const selectSaying = createSelector(selectSayingEntities, selectRouteNestedParams, (sayings, { contentId }) => sayings[contentId]);