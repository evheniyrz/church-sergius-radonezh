import { Component, OnInit } from '@angular/core';
import { Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { selectContentList } from 'src/app/root-store/content-store/content.selectors';
import { selectRouteNestedParams } from 'src/app/root-store/root.selectors';
import { ContentList } from 'src/app/shared/grid-list/grid-list.component';

@Component({
  selector: 'app-content-list',
  templateUrl: './content-list.component.html',
  styleUrls: ['./content-list.component.scss']
})
export class ContentListComponent implements OnInit {

  public contentList$: Observable<ContentList[] | undefined> = this.store.select(selectContentList).pipe(
    map(content => {

      let contentList: ContentList[] | undefined = [] as ContentList[];
      contentList = content?.map(element => {

        const headingElement = element.content.editorContent.content.find(element => element.type === 'heading' && (element.attrs.level === 1 || element.attrs.level === 2));
        const imageElement = element.content.editorContent.content.find(element => element.type === 'paragraph' && element.content[0].type === 'image');

        const adminPageContent: ContentList = {
          title: headingElement?.content?.[0].text ?? 'title unavailable',
          date: element.createdAt,
          author: element.author,
          imgSrc: imageElement?.content[0].attrs?.src ?? '',
          contentType: element.contentType
        } as ContentList;

        return adminPageContent;
      });

      return contentList;
    })
  );
  public contentSection$: Observable<Params> = this.store.select(selectRouteNestedParams);

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

}
