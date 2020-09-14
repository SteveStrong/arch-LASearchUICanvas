import { Component, OnInit, Input } from '@angular/core';
import { QueryResultService } from './query-result.service';

import { LegalCaseService } from '../models/legal-case.service';

import { SearchResult } from '../models';


@Component({
  selector: 'app-document-view',
  templateUrl: './document-view.component.html',
  styleUrls: ['./document-view.component.scss']
})
export class DocumentViewComponent implements OnInit {
  @Input() item: SearchResult;


  constructor(
    private qService: QueryResultService,
    private cService: LegalCaseService) { }

  ngOnInit(): void {
  }

  addToNotebook() {
    const sentence = this.item.sentence;
    this.cService.AddToNotebook(sentence).regroupContext();
    this.item.isSelected = true;
  }

}
