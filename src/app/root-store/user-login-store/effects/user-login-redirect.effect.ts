import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import { AdminLoginActionTypes } from '../actions';

@Injectable()
export class RedirectEffect {
  constructor(private actions$: Actions, private router: Router) { }

  onLoginAdminSuccessRedirect$ = createEffect(() => this.actions$.pipe(
    ofType(AdminLoginActionTypes.ADMIN_ACCESS_ALLOWED),
    tap((action) => {
      this.router.navigate(['administration']);
    })
  ),
    { dispatch: false }
  );

  onAdminAccessDeniedRedirect$ = createEffect(() => this.actions$.pipe(
    ofType(AdminLoginActionTypes.ADMIN_ACCESS_DENIED),
    tap((action) => {
      this.router.navigate(['authorization', 'login']);
    })
  ),
    { dispatch: false }
  );
}
