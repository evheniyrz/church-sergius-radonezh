import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { map, tap } from 'rxjs';
import { deleteContent } from 'src/app/root-store/content-store/content.actions';
import { selectContentList } from 'src/app/root-store/content-store/content.selectors';
import { EditorContent, TimetableContent, ContentType } from 'src/app/root-store/content-store/model/content.model';

export interface TableData {
  contentId: string;
  author: string;
  position: number;
  image: string;
  title: string;
  date: string;
}

@Component({
  selector: 'app-content-table',
  templateUrl: './content-table.component.html',
  styleUrls: ['./content-table.component.scss']
})
export class ContentTableComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public searchControl: FormControl = new FormControl('');

  public dataSource!: MatTableDataSource<TableData>;
  public displayedColumns: string[] = ['position', 'action', 'author', 'image', 'title', 'date'];

  private sectionId!: ContentType;

  constructor(private readonly store: Store) { }

  ngOnInit(): void {
    this.store.select(selectContentList)
      .pipe(
        map((resp, index) => {
          // console.log('%c CONTENT RESP', 'color:blue', { resp });

          const tableContent = resp?.map((payload, position) => {
            if (null == this.sectionId) {
              this.sectionId = payload.contentType;
            }
            return {
              position,
              image: this.getImageSrc(payload.content.editorContent.content, payload.content.editorContent.type),
              title: this.getTitle(payload.content.editorContent.content, payload.content.editorContent.type),
              date: payload.createdAt,
              author: payload.author,
              contentId: payload.id
            };
          });
          this.dataSource = new MatTableDataSource(tableContent);
        })
      )
      .subscribe();

    this.searchControl.valueChanges
      .pipe(
        tap((searchValue: string) => {
          this.dataSource.filter = searchValue;
        })
      )
      .subscribe();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = this.filter;
  }

  public deleteItem(eventValue: { contentId: string; }): void {
    console.log('DELETE ITEM IN TABLE', eventValue);
    this.store.dispatch(deleteContent({ contentId: eventValue.contentId, sectionId: this.sectionId }))
  }

  private getTitle(content: EditorContent[] | TimetableContent, contentType: 'doc' | 'formGroupValue' | 'html'): string {
    let title = 'Title not provided';
    switch (contentType) {
      case 'doc':
        const assertedContent: EditorContent[] = (content as EditorContent[]);
        const headingElement = assertedContent.find(content => content.type === 'heading');
        if (null != headingElement) {
          title = headingElement.content.reduce((accString, value) => {
            accString = accString.concat(value.text as string)
            return accString;
          }, '')
        }
        return title;

      default:
        return title;
    }
  }

  private getImageSrc(content: EditorContent[] | TimetableContent, contentType: 'doc' | 'formGroupValue' | 'html'): string {
    switch (contentType) {
      case 'doc':
        const assertedContent: EditorContent[] = (content as EditorContent[]);
        const contentMap: { contentIndex: number; imgIndex: number; } = assertedContent.slice(0).reduce((acc, content, contentIndex, arr) => {
          const imgIndex = content.content?.findIndex(innerContent => innerContent.type === 'image');
          if (imgIndex > -1 && acc.imgIndex === -1) {
            arr.splice(0)
            acc = {
              ...acc,
              contentIndex,
              imgIndex
            };
          }

          return acc;
        }, {
          contentIndex: -1,
          imgIndex: -1
        });

        return contentMap.imgIndex > -1 ?
          assertedContent[contentMap.contentIndex].content[contentMap.imgIndex].attrs.src as string :
          '/assets/backgrounds/no-image.svg';

      default:
        return '/assets/backgrounds/no-image.svg';
    }

  }

  private filter(data: TableData, filter: string): boolean {
    const keys = Object.keys(data) as (keyof TableData)[];
    const dataStr = keys
      .reduce<string>((currentTerm: string, key: keyof TableData) => {
        // Use an obscure Unicode character to delimit the words in the concatenated string.
        // This avoids matches where the values of two columns combined will match the user's query
        // (e.g. `Flute` and `Stop` will match `Test`). The character is intended to be something
        // that has a very low chance of being typed in by somebody in a text field. This one in
        // particular is "White up-pointing triangle with dot" from
        // https://en.wikipedia.org/wiki/List_of_Unicode_characters
        return currentTerm + data[key] + '◬';
      }, '')
      .toLowerCase();
    // Transform the filter by converting it to lowercase and removing whitespace.
    const transformedFilter = filter.trim().toLowerCase();
    return dataStr.indexOf(transformedFilter) != -1;
  }

}
