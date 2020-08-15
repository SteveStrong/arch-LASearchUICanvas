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


    private bold(name: string) {
        return `<b class="boldhighlight">${name}</b>`;
    }

    private replaceSplitJoin(text: string, x: string, y: string) {
        const temp = text.split(x);
        const result = temp.join(y);
        return result;
    }

    private replaceBold(text: string, name: string) {
        return this.replaceSplitJoin(text, name, this.bold(name));
    }

    private textMarkup(rawText: string, listOfWords: Array<string>): string {
        let text = rawText;
        listOfWords.forEach(word => {
            text = this.replaceBold(text, word);
        });
        text = `&nbsp; &nbsp; ${text}`;
        console.log(text);
        return text;
    }

    public searchText$(text: string): Subject<IResponse<SearchResult>> {
        const list = text.split(' ').filter( item => item.length > 0);
        this.searchTextList = list;
        const urlOptions = this.TEXT_QUERY_URL_OPTIONS(text);
        const httpSubject = this.httpService.get$<SearchResult>(SearchResult, urlOptions, undefined, (item) => {
            item.innerHTML = this.textMarkup(item._source.text, list);
            return item;
        });

        return httpSubject;
    }

}
