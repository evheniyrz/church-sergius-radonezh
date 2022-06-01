import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectContentItem } from 'src/app/root-store/content-store/content.selectors';

@Component({
  selector: 'app-content-editor',
  templateUrl: './content-editor.component.html',
  styleUrls: ['./content-editor.component.scss']
})
export class ContentEditorComponent implements OnInit {

  content$ = this.store.select(selectContentItem);
  constructor(private store: Store) { }

  ngOnInit(): void {
  }

}
