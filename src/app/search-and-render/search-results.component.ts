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

}
