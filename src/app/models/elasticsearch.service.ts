import { Injectable } from '@angular/core';
import { Toast, EmitterService, iPayloadWrapper } from '../shared';
import { Constructable, FuncAny, foModelBase } from '../shared';
import { HttpClient } from '@angular/common/http';

import { AuthenticationService } from '../login/authentication.service';
import { SearchResult } from './search-result';

import { environment } from '../../environments/environment';

import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ElasticSearchService {

  get API_URL(): string {
    return environment.searchURL;
  }

  constructor(
    private http: HttpClient,
    private aService: AuthenticationService) {
  }


  mapToModel<T extends foModelBase>(type: Constructable<T>, payload: Array<any>, func?: FuncAny): Array<T> {
    const list = !payload
      ? []
      : payload.map<T>(item => {
        const data = func ? func(item) : item;
        return new type(data);
      });
    return list;
  }

  public searchText$(text: string): Observable<Array<SearchResult>> {
    const rest = '/lasearch/api/v1/text/';
    const preEncode = `${this.API_URL}${rest}${text}`;
    const url = encodeURI(preEncode);

    return this.http.get<iPayloadWrapper>(url).pipe(
      map(res => {
        const results = this.mapToModel<SearchResult>(SearchResult, res.payload);
        Toast.success(`${res.length} items loaded!`, rest);
        return results;
      }),
      catchError(error => {
        const msg = JSON.stringify(error, undefined, 3);
        Toast.error(msg, url);
        return of<any>();
      })
    );
  }

}
