import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { CloudinaryAssets, CloudinaryDirectoryList } from './models/cloud-directory-list.model';

@Injectable()
export class CloudinaryService {

  private authorizationHeaders: HttpHeaders;

  constructor(private http: HttpClient) {
    const auth: string = '996177314634473:c_aciY_d_T0s_lNzyCucEY5hguA';
    this.authorizationHeaders = new HttpHeaders(
      {
        'Authorization': `Basic ${btoa(auth)}`
      }
    );
  }

  public getAssetDirectoryList(): Observable<CloudinaryDirectoryList> {
    return this.http.get<CloudinaryDirectoryList>('/folders/site');
  }

  public getImageList(assetFolderName: string): Observable<CloudinaryAssets> {
    return this.http.get<CloudinaryAssets>(`/resources/search?expression=folder=site/${assetFolderName}`);
  }

  private bufferToJSON(response: { body: { type: 'Buffer', data: number[]; }[] }) {
    let convertedData = [];
    try {
      const utf8decoder = new TextDecoder();

      convertedData = response.body.reduce((acc: any[], next) => {
        let bytes = new Uint8Array(next.data);
        acc.push(JSON.parse(utf8decoder.decode(bytes)))
        return acc;
      }, []);

    } catch (error) {
      console.log('%c ERROR CONVERTED DATA', 'color: brown', { error, convertedData });
    }
    console.log('%c CONVERTED DATA', 'color: green', { convertedData });
    return convertedData[0];
  }
}
