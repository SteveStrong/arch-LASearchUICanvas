import { Component, OnInit } from '@angular/core';
import { QueryResultService } from './query-result.service';
import { SearchResult, TOPIC_TextSearch } from '../models';
import { Toast, EmitterService } from '../shared';

@Component({
  selector: 'app-search-and-render',
  templateUrl: './search-and-render.component.html',
  styleUrls: ['./search-and-render.component.scss']
})
export class SearchAndRenderComponent implements OnInit {
  searchResults: Array<SearchResult>;
  searchTextList: Array<string>;

  constructor(private qService: QueryResultService) { }

  ngOnInit(): void {

    EmitterService.registerCommand(this, TOPIC_TextSearch, (data) => {
      this.searchTextList = data.split(' ');
      this.doTextSearch(data);
    });

    EmitterService.processCommands(this);
  }

  doTextSearch(text: string) {
    this.qService.searchText$(text).subscribe(data => {
      if (!data.hasError) {
        this.searchTextList = text.split(' ');
        
        this.searchResults = data.payload;
      } else {
        Toast.error(data.message);
      }
    });
  }

}
