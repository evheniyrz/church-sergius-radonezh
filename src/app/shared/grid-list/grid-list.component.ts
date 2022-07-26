import { Component, Input, OnInit } from '@angular/core';

export interface ContentList {
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

  constructor() { }

  ngOnInit(): void {
  }

}
