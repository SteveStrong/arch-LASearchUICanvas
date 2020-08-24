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
  selected = false;
  @Input() userCanEdit = true;

  @Input() sentence: LaSentence;
  @Input() renderSpans: boolean;
  @Input() filter = 'All';


  constructor(
    private lcService: LegalCaseService,
    private qService: ElasticSearchService
    ) {}

  ngOnInit() {
    EmitterService.registerCommand(this, 'CloseAll', this.doClose);
    // EmitterService.registerCommand(this,"Predict",this.doPrediction);
    EmitterService.processCommands(this);
  }

  isSentenceFilter() {
    return this.filter === 'Sentence';
  }

  isSentenceOrAllFilter() {
    return this.isSentenceFilter() || this.filter === 'All';
  }

  isNotSentenceOrAllFilter() {
    return !this.isSentenceFilter() && this.filter !== 'All';
  }

  doClose() {
    this.selected = false;
  }


  doOpen() {
    if (!this.userCanEdit) {
      return;
    } else if ( this.selected) {
      // skip for now this.doClose()
    } else {
      // EmitterService.broadcastCommand(this, 'CloseAll', null, _ => {
      //   this.selected = true;
      // });

      // EmitterService.broadcastCommand(this, "RefreshSelected");
    }
  }

  isSelected() {
    return this.selected;
  }

  queryContext() {
    const context = this.sentence.context;
    Toast.warning('queryContext', context);
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
