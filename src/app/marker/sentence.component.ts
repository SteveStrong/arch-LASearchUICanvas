import { Component, OnInit, Input } from '@angular/core';

import { LaSentence, SearchResult } from '../models';
import { EmitterService, Toast } from '../shared/emitter.service';

import { ElasticSearchService } from '../models/elasticsearch.service';
import { LegalCaseService } from '../models/legal-case.service';

@Component({
  selector: 'app-sentence',
  templateUrl: './sentence.component.html'
})
export class SentenceComponent implements OnInit {
  @Input() sentence: LaSentence;


  constructor(
    private lcService: LegalCaseService,
    private qService: ElasticSearchService
    ) {}

  ngOnInit() {
  }



  queryContext() {
    const context = this.sentence.context;
    Toast.info('Collecting Context', context);
    this.qService.searchContext$(context).subscribe(list => {
      const result: Array<SearchResult> = list;
      const noteBook = this.lcService.establishNoteBook();
      result.forEach(item => {
        if (item.sentence.sentID !== this.sentence.sentID) {
          this.lcService.AddToNotebook(item.sentence);
        }
      });
      noteBook.regroupContext();
    });
  }


}
