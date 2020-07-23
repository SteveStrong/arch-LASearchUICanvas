import { Component, OnInit, Input } from '@angular/core';
import { QueryResultService } from './query-result.service';


import { SearchResult } from '../models';

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.scss']
})
export class CardViewComponent implements OnInit {
  @Input() item: SearchResult;
  highlightOn: Array<string>;

  constructor(private qService: QueryResultService) { }

  ngOnInit(): void {
    this.highlightOn = this.qService.searchTextList;
  }

}
