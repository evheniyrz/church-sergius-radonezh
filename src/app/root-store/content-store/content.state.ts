import { EntityState } from '@ngrx/entity';
import { Content } from './model/content.model';

export interface ContentState extends EntityState<Content> {
}

interface StateModel {
  [key: string]: any;
}
export interface ContentStoreState extends StateModel {
  articles: ContentState;
  timetables: ContentState;
  preachings: ContentState;
  sayings: ContentState;
}
