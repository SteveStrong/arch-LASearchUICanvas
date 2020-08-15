import { Component, OnInit } from '@angular/core';
// import { QueryResultService } from './query-result.service';
import { ElasticSearchService } from '../models/elasticsearch.service';
import { SearchResult, TOPIC_TextSearch } from '../models';
import { Toast, EmitterService } from '../shared';

@Component({
  selector: 'app-search-and-render',
  templateUrl: './search-and-render.component.html',
  styleUrls: ['./search-and-render.component.scss']
})
export class SearchAndRenderComponent implements OnInit {
  searchResults: Array<SearchResult>;


  constructor(private qService: ElasticSearchService) { }

  ngOnInit(): void {

    EmitterService.registerCommand(this, TOPIC_TextSearch, (data) => {
      this.doTextSearch(data);
    });
    
    EmitterService.processCommands(this);
  }
  
  doTextSearch(text: string) {
    Toast.success('captured searching for', text);
    this.qService.searchText$(text).subscribe(data => {
      this.searchResults = data;
    });
  }

}
