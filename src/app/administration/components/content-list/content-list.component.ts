import { Component, OnInit } from '@angular/core';
import { Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectContentList } from 'src/app/root-store/content-store/content.selectors';
import { Content } from 'src/app/root-store/content-store/model/content.model';
import { selectRouteNestedParams } from 'src/app/root-store/root.selectors';

@Component({
  selector: 'app-content-list',
  templateUrl: './content-list.component.html',
  styleUrls: ['./content-list.component.scss']
})
export class ContentListComponent implements OnInit {

  public contentList$: Observable<Content[] | null> = this.store.select(selectContentList);
  public contentSection$: Observable<Params> = this.store.select(selectRouteNestedParams);

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

}
