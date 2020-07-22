import { Component, OnInit, Input } from '@angular/core';
import { EmitterService } from '../shared';

import { SearchResult } from '../models';
import { QueryResultService } from './query-result.service';


@Component({
    selector: 'app-search-results',
    templateUrl: './search-results.component.html',
    styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
    @Input() searchResults: Array<SearchResult> = [];
    searchTextList: Array<string>;
    throttle = 300;
    scrollDistance = 1;



    constructor(private service: QueryResultService) {}

    ngOnInit(): void {
        // EmitterService.registerTopic<QueryResultsLoaded>(this, QueryResultsLoaded.QUERY_RESULT_LOADED, ({ payload, text }) => {
        //     this.displayResults = payload;
        //     const list = text.indexOf(' ') !== -1 ? text.split(' ') : [text];
        //     this.searchTextList = list.filter( x => x !== '')
        // });

        
        // EmitterService.registerTopic<ChangedPersona>(this, nameOf<ChangedPersona>(ChangedPersona), ({ user }) => {
        //     this.user = user;
        // });

        // EmitterService.registerTopic<BroadcastViewChanged<ToolItem>>(this, nameOf<BroadcastViewChanged<ToolItem>>(BroadcastViewChanged), ({ toolItem }) => {
        //     this.currentView = toolItem;
        // });

        EmitterService.processCommands(this);
    }


    get isListView(): boolean {
        return false; //this.currentView?.name === 'list';
    }

    get isCardView(): boolean {
        return true; //this.currentView == null || this.currentView?.name === 'card';
    }


    onScrollDown() {
        // if (!this.pinnedView && this.nextPageUrl) {
        //     const s1 = this.service.searchNextPage$(this.nextPageUrl, this.currentPinContext, this.user).subscribe(({ payload, nextPageUrl }) => {
        //         this.payload = this.payload.concat(payload);
        //         this.displayResults = this.payload;
        //         this.nextPageUrl = nextPageUrl;
        //         s1.unsubscribe();
        //     });
        // }
    }
}
