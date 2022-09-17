import { routerReducer } from '@ngrx/router-store';
import { ActionReducerMap, createAction, createFeature, createReducer, on } from '@ngrx/store';
import { State } from './root-state';

export const showLoader = createAction('[APP] Show loader');
export const hideLoader = createAction('[APP] Hide loader');

const loadingInitialState = false;

const loadingFeature = createFeature(
  {
    name: 'loading',
    reducer: createReducer(
      loadingInitialState,
      on(showLoader, (state) => true),
      on(hideLoader, (state) => false)
    )
  }
);

export const reducers: ActionReducerMap<State> = {
  router: routerReducer,
  loading: loadingFeature.reducer
};