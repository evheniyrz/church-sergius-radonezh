import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { toHTML } from 'ngx-editor';
import { map, Observable } from 'rxjs';
import { selectContentItem } from 'src/app/root-store/content-store/content.selectors';
import { Content, EditorContent } from 'src/app/root-store/content-store/model/content.model';

@Component({
  selector: 'app-content-viewer',
  templateUrl: './content-viewer.component.html',
  styleUrls: ['./content-viewer.component.scss']
})
export class ContentViewerComponent implements OnInit {

  public pageContent$: Observable<
    {
      type: 'doc' | 'formGroupValue';
      content: SafeHtml | { [key: string]: string; };
    } | null> = this.store.select(selectContentItem)
      .pipe(
        map((contentResponse: Content | null | undefined) => {
          let content = null;

          if (null != contentResponse &&
            contentResponse.content.editorContent.type === 'doc' &&
            (contentResponse.content.editorContent.content as EditorContent[]).length > 0) {
            content = {
              type: contentResponse.content.editorContent.type,
              content: this.domSanitizer.bypassSecurityTrustHtml(toHTML(contentResponse.content.editorContent))
            };
          }

          return content;
        })
      );
  constructor(private store: Store, private domSanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

}
