import { Injectable } from '@angular/core';

import { foHttpService, ServiceOptions, IResponse, EmitterService,  Toast } from '../shared';
import { SearchResult } from '../models';

import { Subject } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class QueryResultService {
    public searchTextList: Array<string>;

    constructor(private httpService: foHttpService, private http: HttpClient) {}

    TEXT_QUERY_URL_OPTIONS(text: string): any {
        const serviceOptions: ServiceOptions = {
            serviceKey: 'query$',
            localDataPath: '/sampleSearch.json',
            servicePath: `/query/${text}`,
            params: {}
        };
        return serviceOptions;
    }



    public searchText$(text: string): Subject<IResponse<SearchResult>> {
        this.searchTextList = text.split(' ');
        const urlOptions = this.TEXT_QUERY_URL_OPTIONS(text);
        const httpSubject = this.httpService.get$<SearchResult>(SearchResult, urlOptions);

        return httpSubject;
    }

}
