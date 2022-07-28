import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Content, ContentType } from 'src/app/root-store/content-store/model/content.model';

@Injectable()
export class ContentService {

  constructor(private httpClient: HttpClient) { }

  public postContent(payload: Content | Content[], sectionId: string): Observable<any> {
    return this.httpClient.post('post-content', payload, { params: { sectionId } });
  }

  public updateContent(content: Content, id: string, sectionId: string): Observable<any> {
    return this.httpClient.patch('update-content', content, { params: { id, sectionId } });
  }

  public getContent(contentSectionId: string, author: string = 'admin'): Observable<any> {

    const params = new HttpParams().set('author', author).set('contentName', contentSectionId);
    return this.httpClient.get('get-content', { params });
  }

  public deleteContent(contentId: string, sectionId: string): Observable<any> {
    return this.httpClient.delete('delete-content', { params: { contentId, sectionId } });
  }

  public getArticle(id: string): Observable<any> {
    const path: string = `article/${id}`;
    return this.httpClient.get(path);
  }

  public getTimetables(): Observable<any> {
    return this.httpClient.get('timetables');
  }

  public getPreachings(): Observable<any> {
    return this.httpClient.get('preachings');
  }

  public getSayings(): Observable<any> {
    return this.httpClient.get('sayings');
  }
}
