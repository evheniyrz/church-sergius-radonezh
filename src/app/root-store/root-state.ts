import { RouterReducerState } from '@ngrx/router-store';
import { UserLoginState } from './user-login-store/models/login-payload.model';

export interface State {
  // user: UserLoginState;
  router: RouterReducerState;
  loading: boolean;
}
