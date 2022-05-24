import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { catchError, concatMap, exhaustMap, map, of } from 'rxjs';
import { LoginService } from 'src/app/login-services/login/login.service';
import { UserLoginResponse } from 'src/app/login-services/login/models/login-success-response.model';
import { adminAccessAllowed, adminAccessDenied, AdminLoginActionTypes } from '../actions';
import { LoginPayload, UserLoginState } from '../models/login-payload.model';

@Injectable()
export class UserLoginEffect {
  constructor(private actions$: Actions, private loginService: LoginService) { }

  getAdminAccess$ = createEffect(() => this.actions$.pipe(
    ofType(AdminLoginActionTypes.GET_ADMIN_ACCESS),
    exhaustMap((action) => {
      return this.loginService.loginUser(action['credentials']).pipe(
        map((response: UserLoginResponse | null) => {
          let loginState: UserLoginState = {} as UserLoginState;

          if (response?.isExisting) {
            loginState = {
              ...response.userData,
              expiredAt: Date.now() + 24 * 60 * 60 * 1000
            };
          }
          return response?.isExisting ? adminAccessAllowed(loginState) : adminAccessDenied({ message: "User doesn't exist" });
        }),
        catchError((error) => of(adminAccessDenied({ error })))
      )
    }),
    catchError((error) => of(adminAccessDenied({ error })))
  ),
    { useEffectsErrorHandler: false }
  );
}
