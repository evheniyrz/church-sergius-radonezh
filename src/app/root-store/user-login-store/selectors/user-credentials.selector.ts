import { createSelector } from '@ngrx/store';
import { loginFeature } from '../reducers/user-login.reducer';
import { UserLoginState } from '../models/login-payload.model';

export const selectAdminUser = createSelector(
  loginFeature.selectEntities,
  (credentialEntity) => {
    const userCredential: (UserLoginState | undefined)[] = Object.values(credentialEntity);

    return null != userCredential || (Array.isArray(userCredential) &&
      (userCredential as Array<UserLoginState>).length > 0) ?
      userCredential.find((credential) => credential?.role === 'admin') : null;
  }
);