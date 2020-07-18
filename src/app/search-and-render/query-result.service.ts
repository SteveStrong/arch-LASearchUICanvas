import { Injectable } from '@angular/core';

import { AppHttpService, IResult, EmitterService, BroadcastTopicServiceResult, User, Toast } from '../shared';
import { SearchResult } from '../models';

import { Subject } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

export class QueryResultsLoaded extends BroadcastTopicServiceResult<SearchResult> {
    static QUERY_RESULT_LOADED = 'QUERY_RESULT_LOADED';
    totalResults: number;
    text: string;
    constructor(result: IResult<SearchResult>, text: string, count: number) {
        super(result);
        this.text = text;
        this.totalResults = count;
    }

}



@Injectable({
    providedIn: 'root'
})
export class QueryResultService {
    public queryImageURL: string;

    constructor(private httpService: AppHttpService, private http: HttpClient) {}

    TEXT_QUERY_URL_OPTIONS(text: string): any {
        return {
            mock: 'assets/data/sampleSearch.json',
            api: `/query/${text}`
        };
    }



    public searchText$(text: string, user: User): Subject<IResult<SearchResult>> {

        const urlOptions = this.TEXT_QUERY_URL_OPTIONS(text);
        const httpSubject = this.httpService.get$<SearchResult>(SearchResult, urlOptions);
        
        httpSubject.subscribe(result => {
            const broadcastTopic = new QueryResultsLoaded(result, text, result.payload?.length);
            EmitterService.broadcastTopic<QueryResultsLoaded>(this, QueryResultsLoaded.QUERY_RESULT_LOADED, broadcastTopic);
        });
        return httpSubject;
    }


    // public searchNextPage$(nextPageUrl: string, pinContext: string, user: User): Subject<IResult<SearchResult>> {
    //     const urlOptions = this.NEXT_PAGE_URL_OPTIONS(nextPageUrl);
    //     const httpSubject = this.httpService.get$<SearchResult>(SearchResult, urlOptions, SearchResult.applyPinProperties.bind(this, user.persona, pinContext));
    //     httpSubject.subscribe(result => {
    //         const broadcastTopic = new NextPageResultsLoaded(result);
    //         EmitterService.broadcastTopic<NextPageResultsLoaded>(this, NextPageResultsLoaded.NEXT_PAGE_RESULT_LOADED, broadcastTopic);
    //         Toast.info(`Next Page Results loaded for ${user.persona} context ${pinContext}`);
    //     });
    //     return httpSubject;
    // }


}
