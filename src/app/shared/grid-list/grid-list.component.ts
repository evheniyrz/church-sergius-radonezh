import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { deleteContent } from 'src/app/root-store/content-store/content.actions';

export interface ContentList {
  contentId: string;
  contentType: string;
  title: string;
  author: string;
  date: string;
  shortDescr?: string;
  imgSrc?: string;
  edit?: { editedAt: string; editor: string };
}

@Component({
  selector: 'app-grid-list',
  templateUrl: './grid-list.component.html',
  styleUrls: ['./grid-list.component.scss']
})
export class GridListComponent implements OnInit {

  @Input() contentList!: ContentList[];
  @Input() isAdmin = false;

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  public deleteContent(contentId: string, sectionId: string): void {
    this.store.dispatch(deleteContent({ contentId, sectionId }))
  }

}
