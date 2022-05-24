import { createFeature, createReducer, on } from '@ngrx/store';
import { adminAccessAllowed, removeCredential } from '../actions';
import { loginEntityAdapter, userLoginInitialState } from '../user-login-state';

export const loginFeature = createFeature(
  {
    name: 'user',
    reducer: createReducer(
      userLoginInitialState,
      on(adminAccessAllowed, (state, user) => {
        return loginEntityAdapter.addOne(user, state);
      }),
      on(removeCredential, (state, { id }) => {
        return loginEntityAdapter.removeOne(id, state);
      })
    )
  }
);
