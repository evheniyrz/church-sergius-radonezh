import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectContentList } from 'src/app/root-store/content-store/content.selectors';

@Component({
  selector: 'app-public-resource',
  templateUrl: './public-resource.component.html',
  styleUrls: ['./public-resource.component.scss']
})
export class PublicResourceComponent implements OnInit {

  constructor(private store: Store) { }

  contentList$ = this.store.select(selectContentList);
  ngOnInit(): void {
  }

}
