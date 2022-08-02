import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectRouteNestedParams } from 'src/app/root-store/root.selectors';

@Component({
  selector: 'app-public-resource',
  templateUrl: './public-resource.component.html',
  styleUrls: ['./public-resource.component.scss']
})
export class PublicResourceComponent implements OnInit {

  constructor(private store: Store) { }

  contentId$ = this.store.select(selectRouteNestedParams);
  ngOnInit(): void {
  }

}
