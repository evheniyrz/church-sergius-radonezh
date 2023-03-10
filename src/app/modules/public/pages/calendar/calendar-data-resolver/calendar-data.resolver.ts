import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Store } from '@ngrx/store';
import { defer, exhaustMap, iif, Observable, of, take } from 'rxjs';
import { PlatformService } from 'src/app/api/services/platform/platform.service';
import { loadCalendar } from 'src/app/root-store/content-store/content.actions';
import { selectCalendarItem } from 'src/app/root-store/content-store/content.selectors';
import { hideLoader, showLoader } from 'src/app/root-store/root.reducers';

@Injectable()
export class CalendarDataResolver implements Resolve<boolean> {
  constructor(private store: Store, private platform: PlatformService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    this.store.dispatch(showLoader());
    return this.platform.isBrowser() ? this.store.select(selectCalendarItem).pipe(
      take(1),
      exhaustMap((content) => {
        return iif(
          () => null != content,
          defer(() => Promise.resolve(true).then(resolve => {
            this.store.dispatch(hideLoader());
            return resolve;
          })),
          defer(() => {
            /**firstChild - as the calendar module loaded as a child of public module/page */
            const date: string | number | Date = route?.firstChild?.params['date'];

            this.store.dispatch(loadCalendar({ date }));
            return Promise.resolve(true).then(resolve => {
              this.store.dispatch(hideLoader());
              return resolve;
            });
          })
        )
      })
    ) : of(true);
  }
}
