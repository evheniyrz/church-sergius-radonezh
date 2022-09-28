import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Event, NavigationEnd, Router } from '@angular/router';
import { filter, Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-public-page',
  templateUrl: './public-page.component.html',
  styleUrls: ['./public-page.component.scss']
})
export class PublicPageComponent implements OnInit, OnDestroy {

  @ViewChild('sideNav', { read: MatDrawer }) sideNavPanel!: MatDrawer;

  public sidenavOpenedChange = false;

  private onDestroy$: Subject<void> = new Subject();
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events.pipe(
      filter((ev) => ev instanceof NavigationEnd),
      tap(() => {
        this.sideNavPanel.close();
      }),
      takeUntil(this.onDestroy$)
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
