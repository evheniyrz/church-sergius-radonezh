import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Store } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';
import { defer, exhaustMap, iif, Observable, take } from 'rxjs';
import { loadSectionContent } from 'src/app/root-store/content-store/content.actions';
import { selectContentList } from 'src/app/root-store/content-store/content.selectors';
import { Content } from 'src/app/root-store/content-store/model/content.model';

@Injectable()
export class ContentResolver implements Resolve<Content[] | [] | null> {
  constructor(private store: Store) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Content[] | [] | null> {

    return this.store.select(selectContentList).pipe(
      take(1),
      exhaustMap((content) => {

        return iif(
          () => null != content && content?.length > 0,
          defer(() => Promise.resolve(content)),
          defer(() => {
            let action: (props: {
              sectionId: string;
            }) => { sectionId: string; } & TypedAction<string>;
            const sectionId: string = route.params['sectionId'];

            this.store.dispatch(loadSectionContent({ sectionId }));
            return Promise.resolve([]);
          })
        )
      })
    );
  }
}
