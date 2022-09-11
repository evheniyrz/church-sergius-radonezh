import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { toHTML } from 'ngx-editor';
import { map, tap } from 'rxjs';
import { selectContentList } from 'src/app/root-store/content-store/content.selectors';

@Component({
  selector: 'app-public-resource',
  templateUrl: './public-resource.component.html',
  styleUrls: ['./public-resource.component.scss']
})
export class PublicResourceComponent implements OnInit {

  constructor(private store: Store) { }

  contentList$ = this.store.select(selectContentList).pipe(
    map(response => {
      let html = '';
      if (null != response && response.length) {
        const contentToDisplay = response[0].content.editorContent;
        html = toHTML(contentToDisplay);
        // console.log('HTML==>', html);
      }

      return html;
    })
  );
  ngOnInit(): void {
  }

}
