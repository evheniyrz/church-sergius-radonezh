import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { defer, exhaustMap, iif, Observable } from 'rxjs';
import { selectAdminUser } from 'src/app/root-store/user-login-store/selectors/user-credentials.selector';
import { UserLoginState } from 'src/app/root-store/user-login-store/models/login-payload.model';

@Injectable()
export class AdminPageGuard implements CanActivate {
  constructor(
    private store: Store,
    private router: Router
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.store.select(selectAdminUser).pipe(
      exhaustMap((credentials: UserLoginState | undefined | null) => iif(
        () => null != credentials,
        defer(() => Promise.resolve(true)),
        defer(() => this.router.navigate(['authorization', 'login']))
      ))
    );
  }

}
