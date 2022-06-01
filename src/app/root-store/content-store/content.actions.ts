import { createAction, props } from '@ngrx/store';
import { Content } from './model/content.model';

export const loadArticles = createAction('[CONTENT] Load articles', props<{ articles: Content[] }>());
export const loadTimetable = createAction('[CONTENT] Load timetable', props<{ timetable: Content[] }>());
export const loadPreaching = createAction('[CONTENT] Load preaching', props<{ preaching: Content[] }>());
export const loadSayings = createAction('[CONTENT] Load sayings', props<{ sayings: Content[] }>());

export const getArticles = createAction('[CONTENT] Get articles', props<{ articles: Content[] }>());
export const getTimetable = createAction('[CONTENT] Get timetable', props<{ timetable: Content[] }>());
export const getPreaching = createAction('[CONTENT] Get preaching', props<{ preaching: Content[] }>());
export const getSayings = createAction('[CONTENT] Get sayings', props<{ sayings: Content[] }>());

export const postArticle = createAction('[CONTENT] Post article', props<{ article: Content }>());
export const postTimetable = createAction('[CONTENT] Post timetable', props<{ timetable: Content }>());
export const postPreaching = createAction('[CONTENT] Post preaching', props<{ preaching: Content }>());
export const postSaying = createAction('[CONTENT] Post saying', props<{ saying: Content }>());

export const deleteArticle = createAction('[CONTENT] Delete article', props<{ id: string; }>());
export const deleteTimetable = createAction('[CONTENT] Delete timetable', props<{ id: string; }>());
export const deletePreaching = createAction('[CONTENT] Delete preaching', props<{ id: string; }>());
export const deleteSaying = createAction('[CONTENT] Delete saying', props<{ id: string; }>());

export const updateArticle = createAction('[CONTENT] Update article', props<{ article: Content }>());
export const updateTimetable = createAction('[CONTENT] Update timetable', props<{ timetable: Content }>());
export const updatePreaching = createAction('[CONTENT] Update preaching', props<{ preaching: Content }>());
export const updateSaying = createAction('[CONTENT] Update saying', props<{ saying: Content }>());