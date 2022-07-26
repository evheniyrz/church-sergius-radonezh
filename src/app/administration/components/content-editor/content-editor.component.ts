import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { concatMap, map, Subject, takeUntil, tap } from 'rxjs';
import { selectContentItem } from 'src/app/root-store/content-store/content.selectors';
import { selectRouteNestedParams } from 'src/app/root-store/root.selectors';
import { UserLoginState } from 'src/app/root-store/user-login-store/models/login-payload.model';
import { selectAdminUser } from 'src/app/root-store/user-login-store/selectors/user-credentials.selector';

@Component({
  selector: 'app-content-editor',
  templateUrl: './content-editor.component.html',
  styleUrls: ['./content-editor.component.scss']
})
export class ContentEditorComponent implements OnInit, OnDestroy {

  public contentCredentials?: {
    userData: UserLoginState | null | undefined;
    sectionId: string;
  };
  content$ = this.store.select(selectContentItem);
  // params$ = this.store.select(selectRouteNestedParams);
  private onDestroy$: Subject<void> = new Subject();
  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.select(selectRouteNestedParams).pipe(
      concatMap((params) => {
        return this.store.select(selectAdminUser).pipe(
          map(user => {
            const contentCredentials = {
              sectionId: params['sectionId'],
              userData: user
            }

            return contentCredentials;
          })
        )
      }),
      tap((contentCredentials) => {
        this.contentCredentials = contentCredentials;
      }),
      takeUntil(this.onDestroy$)
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
