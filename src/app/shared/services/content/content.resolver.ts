import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Store } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';
import { defer, exhaustMap, iif, Observable, of, take } from 'rxjs';
import { PlatformService } from 'src/app/api/services/platform/platform.service';
import { loadSectionContent } from 'src/app/root-store/content-store/content.actions';
import { selectContentList } from 'src/app/root-store/content-store/content.selectors';
import { Content } from 'src/app/root-store/content-store/model/content.model';
import { hideLoader, showLoader } from 'src/app/root-store/root.reducers';

@Injectable()
export class ContentResolver implements Resolve<boolean> {
  constructor(private store: Store, private platform: PlatformService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    this.store.dispatch(showLoader());
    return this.platform.isBrowser() ? this.store.select(selectContentList).pipe(
      take(1),
      exhaustMap((content) => {

        return iif(
          () => null != content && content?.length > 0,
          defer(() => Promise.resolve(true).then((data) => {
            this.store.dispatch(hideLoader());
            return data;
          })),
          defer(() => {

            const sectionId: string = route.params['sectionId'];

            this.store.dispatch(loadSectionContent({ sectionId }));
            /**eto kherniya */
            return Promise.resolve(true).then((data) => {
              this.store.dispatch(hideLoader());
              return data;
            });
          })
        )
      })
    ) : of(true);
  }
}
