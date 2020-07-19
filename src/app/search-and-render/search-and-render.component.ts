import { Component, OnInit } from '@angular/core';
import { QueryResultService } from './query-result.service';
import { Toast } from '../shared';

@Component({
  selector: 'app-search-and-render',
  templateUrl: './search-and-render.component.html',
  styleUrls: ['./search-and-render.component.scss']
})
export class SearchAndRenderComponent implements OnInit {
  results: any;

  constructor(private qService: QueryResultService) { }

  ngOnInit(): void {
    this.qService.searchText$('testing').subscribe(data => {
      if (!data.hasError) {
        this.results = data.payload;
      } else {
        Toast.error(data.message);
      }
    });
  }

}
