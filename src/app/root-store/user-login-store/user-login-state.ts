import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { UserLoginState } from './models/login-payload.model';

export const loginEntityAdapter: EntityAdapter<UserLoginState> = createEntityAdapter({
  selectId: model => model.id
});

export interface UserLoginEntityState extends EntityState<UserLoginState> { }

export const userLoginInitialState: UserLoginEntityState = loginEntityAdapter.getInitialState();
