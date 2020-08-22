import { Component, OnInit, Input } from '@angular/core';
import { QueryResultService } from './query-result.service';

import { LegalCaseService } from '../models/legal-case.service';

import { SearchResult } from '../models';

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.scss']
})
export class CardViewComponent implements OnInit {
  @Input() item: SearchResult;


  constructor(
    private qService: QueryResultService,
    private cService: LegalCaseService) { }

  ngOnInit(): void {
  }

  addToNotebook() {
    const sentence = this.item.sentence;
    this.cService.AddToNotebook(sentence);
  }

}
