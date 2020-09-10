import { Component, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';

// import { QueryResultService } from './query-result.service';
import { ElasticSearchService } from '../models/elasticsearch.service';
import { SearchResult, TOPIC_TextSearch, TOPIC_FindingsOnlySearch, TOPIC_AdvancedQuery } from '../models';
import { Toast, EmitterService } from '../shared';

@Component({
  selector: 'app-search-and-render',
  templateUrl: './search-and-render.component.html',
  styleUrls: ['./search-and-render.component.scss']
})
export class SearchAndRenderComponent implements OnInit {
  @ViewChild('stepper') stepper: MatStepper;
  searchResults: Array<SearchResult>;



  constructor(private qService: ElasticSearchService) { }

  ngOnInit(): void {

    EmitterService.registerCommand(this, TOPIC_TextSearch, (data) => {
      this.stepper.selectedIndex = 0;

      const text = data[0];
      this.doFilterSearch(text, false);
    });

    EmitterService.registerCommand(this, TOPIC_FindingsOnlySearch, (data) => {
      this.stepper.selectedIndex = 0;

      const text = data[0];
      this.doFilterSearch(text, true);
    });

    EmitterService.registerCommand(this, TOPIC_AdvancedQuery, (data) => {
      this.stepper.selectedIndex = 0;

      const query = data[0];
      this.doAdvancedSearch(query);
    });
    
    EmitterService.processCommands(this);
  }


  unselectedSearchResults(): Array<SearchResult> {
    if (this.searchResults) {
      return this.searchResults.filter(item => item.isSelected === false);
    }
    return this.searchResults;
  }

  doTextSearch(text: string) {
    this.qService.searchText$(text).subscribe(data => {
      Toast.success('captured searching for', text);
      this.searchResults = data;
    });
  }

  doFilterSearch(text: string, findingsOnly: boolean) {
    this.qService.simpleSearch$(text, findingsOnly).subscribe(data => {
      Toast.success('captured searching for', text);
      this.searchResults = data;
    });
  }

  doAdvancedSearch(query: any) {
    this.qService.advancedQuery$(query).subscribe(data => {
      Toast.success('advanced searching for', JSON.stringify(query, undefined, 3));
      this.searchResults = data;
    });
  }

}
