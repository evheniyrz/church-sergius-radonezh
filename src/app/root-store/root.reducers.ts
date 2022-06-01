import { routerReducer } from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';
import { State } from './root-state';

export const reducers: ActionReducerMap<State> = {
  router: routerReducer
};