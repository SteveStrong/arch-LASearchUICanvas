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




    constructor() {}

    ngOnInit(): void {

    }


}
