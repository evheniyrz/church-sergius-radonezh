import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';
import { defer, exhaustMap, iif, map, Observable, of, take } from 'rxjs';
import { PlatformService } from 'src/app/api/services/platform/platform.service';
import { contentErrorAction, loadSectionContent, setArticles, setPreachings, setSayings, setTimetables } from 'src/app/root-store/content-store/content.actions';
import { selectContentList } from 'src/app/root-store/content-store/content.selectors';
import { Content } from 'src/app/root-store/content-store/model/content.model';
import { hideLoader } from 'src/app/root-store/root.reducers';

@Injectable()
export class ContentResolver implements Resolve<boolean | UrlTree> {
  constructor(private store: Store, private actions$: Actions, private platform: PlatformService, private router: Router) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {

    return this.platform.isBrowser() ? this.store.select(selectContentList).pipe(
      take(1),
      exhaustMap((content) => {

        return iif(
          () => null != content && content?.length > 0,
          defer(() => Promise.resolve(true)),
          defer(() => {

            const sectionId: string = route.params['sectionId'];

            this.store.dispatch(loadSectionContent({ sectionId }));
            /**eto kherniya */
            return this.actions$.pipe(
              ofType(...[
                setArticles.type,
                setTimetables.type,
                setPreachings.type,
                setSayings.type,
                contentErrorAction.type
              ]),
              take(1),
              map((action) => {
                const resolveRoute = action.type !== contentErrorAction.type ? true : this.router.createUrlTree(['404']);
                return resolveRoute;
              }),
            );
          })
        )
      })
    ) : of(true);
  }
}
