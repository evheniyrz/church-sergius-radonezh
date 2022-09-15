import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { delay, Observable } from 'rxjs';
import { isLoading } from './root-store/root.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public isLoading$!: Observable<boolean>;
  constructor(private store: Store) { }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(isLoading).pipe(delay(0));
  }

}
