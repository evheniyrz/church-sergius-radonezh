import { createAction, props } from '@ngrx/store';
import { Calendar, Content } from './model/content.model';

// export const loadArticles = createAction('[CONTENT] Load articles', props<{ sectionId: string }>());
// export const loadTimetables = createAction('[CONTENT] Load timetables', props<{ sectionId: string }>());
// export const loadPreachings = createAction('[CONTENT] Load preachings', props<{ sectionId: string }>());
// export const loadSayings = createAction('[CONTENT] Load sayings', props<{ sectionId: string }>());

export const contentErrorAction = createAction('[CONTENT ERROR] Load content error', props<{ message: string }>());

export const loadSectionContent = createAction('[CONTENT] Load section content', props<{ sectionId: string }>());

export const loadCalendar = createAction('[CONTENT] Load calendar', props<{ date: Date | string | number }>());
export const loadFrontPageCalendar = createAction('[CONTENT] Load Frontpage calendar', props<{ date: Date | string | number }>());
export const setCalendar = createAction('[CONTENT] Set calendar', props<{ calendar: Calendar }>());
export const getCalendar = createAction('[CONTENT] Get calendar', props<{ date: Date | string | number }>());

export const setArticles = createAction('[CONTENT] Set articles', props<{ articles: Content[] }>());
export const setTimetables = createAction('[CONTENT] Set timetables', props<{ timetables: Content[] }>());
export const setPreachings = createAction('[CONTENT] Set preachings', props<{ preachings: Content[] }>());
export const setSayings = createAction('[CONTENT] Set sayings', props<{ sayings: Content[] }>());

export const setSectionContent = createAction('[CONTENT] Set section content', props<{ [sectionId: string]: Content[] }>());

export const getArticles = createAction('[CONTENT] Get articles', props<{ articles: Content[] }>());
export const getTimetable = createAction('[CONTENT] Get timetable', props<{ timetable: Content[] }>());
export const getPreaching = createAction('[CONTENT] Get preaching', props<{ preaching: Content[] }>());
export const getSayings = createAction('[CONTENT] Get sayings', props<{ sayings: Content[] }>());

export const postArticle = createAction('[CONTENT] Post article', props<{ article: Content }>());
export const postTimetables = createAction('[CONTENT] Post timetable', props<{ timetables: Content[] }>());
export const postPreaching = createAction('[CONTENT] Post preaching', props<{ preaching: Content }>());
export const postSaying = createAction('[CONTENT] Post saying', props<{ saying: Content }>());

export const postContentAction = createAction('[CONTENT] Post content', props<{ content: Content | Content[], sectionId: string }>());

export const deleteArticle = createAction('[CONTENT] Delete article', props<{ id: string; }>());
export const deleteTimetable = createAction('[CONTENT] Delete timetable', props<{ id: string; }>());
export const deletePreaching = createAction('[CONTENT] Delete preaching', props<{ id: string; }>());
export const deleteSaying = createAction('[CONTENT] Delete saying', props<{ id: string; }>());

export const deleteContent = createAction('[CONTENT] Delete content', props<{ contentId: string; sectionId: string; }>());

export const updateArticle = createAction('[CONTENT] Update article', props<{ article: Content }>());
export const updateTimetable = createAction('[CONTENT] Update timetable', props<{ timetable: Content; }>());
export const updatePreaching = createAction('[CONTENT] Update preaching', props<{ preaching: Content }>());
export const updateSaying = createAction('[CONTENT] Update saying', props<{ saying: Content }>());

export const updateContent = createAction('[CONTENT] Update content', props<{ content: Content; contentId: string; sectionId: string; }>());