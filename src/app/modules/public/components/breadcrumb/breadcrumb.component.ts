import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { selectRouteNestedParams } from 'src/app/root-store/root.selectors';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  constructor(private readonly store: Store) { }

  ngOnInit(): void {
    this.store.select(selectRouteNestedParams)
      .pipe(
        tap(resp => {
          console.log('%c ROUTER PARAMS', 'color: blue', resp);
        })
      )
      .subscribe();
  }

}
