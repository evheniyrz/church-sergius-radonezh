import { EntityState } from '@ngrx/entity';
import { Calendar, Content } from './model/content.model';

export interface ContentState extends EntityState<Content> {
}

export interface CalendarState extends EntityState<Calendar> {
}

interface StateModel {
  [key: string]: any;
}
export interface ContentStoreState extends StateModel {
  articles: ContentState;
  timetables: ContentState;
  preachings: ContentState;
  sayings: ContentState;
  calendar: CalendarState;
}
