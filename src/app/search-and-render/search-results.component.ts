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

    activeTab = 0;

    get listViewLabel() {
        const total = this.searchResults ? this.searchResults.length : 0;
        if (total > 0) {
            return `List View (${total})`;
        } else {
            return 'List View';
        }
    }

    get cardViewLabel() {
        const total = this.searchResults ? this.searchResults.length : 0;
        if (total > 0) {
            return `Card View (${total})`;
        } else {
            return 'Card View';
        }
    }

    constructor() {}

    ngOnInit(): void {

    }


}
