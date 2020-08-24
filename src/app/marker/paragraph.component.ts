import { Component, OnInit, Input } from '@angular/core';

import { LaParagraph, SearchResult } from '../models';
import { EmitterService, Toast } from '../shared/emitter.service';

import { ElasticSearchService } from '../models/elasticsearch.service';
import { LegalCaseService } from '../models/legal-case.service';


@Component({
  selector: 'app-paragraph',
  templateUrl: './paragraph.component.html'
})
export class ParagraphComponent implements OnInit {
  selected = false;

  @Input() paragraph: LaParagraph;

  constructor(
    private lcService: LegalCaseService,
    private qService: ElasticSearchService
  ) { }

  public get context() {
    if (this.paragraph) {
      return this.paragraph.context;
    }
    return '';
  }

  public queryContext() {
    const context = this.context;
    Toast.info('Collecting Context', context);
    this.qService.searchContext$(context).subscribe(list => {
      const result: Array<SearchResult> = list;
      const noteBook = this.lcService.establishNoteBook();
      result.forEach(item => {
          this.lcService.AddToNotebook(item.sentence);
      });
      noteBook.regroupContext();
    });
  }

  ngOnInit() {
    EmitterService.registerCommand(this, 'CloseAll', this.doClose);
    EmitterService.processCommands(this);
  }

  getFilteredSentences() {
    return this.paragraph.sentences;
  }

  doClose() {
    this.selected = false;
  }

  doOpen() {
    // EmitterService.broadcastCommand(this, 'CloseAll', null, _ => {
    //   this.selected = true;
    // });
  }
  isSelected() {
    return this.selected;
  }
}
