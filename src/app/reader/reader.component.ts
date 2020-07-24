import { Component, OnInit, OnDestroy, Input, HostListener } from '@angular/core';
import { Toast, EmitterService } from '../shared/emitter.service';

import { LegalCaseService } from '../models/legal-case.service';

import { LaStats, LaLegalCase } from '../models';

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.scss']
})
export class ReaderComponent implements OnInit, OnDestroy {
  @Input() userCanEdit = false;


  // do not show attribute count in read only mode

  sub: any;
  legalCase: LaLegalCase;
  sentenceStats: Array<LaStats> = new Array<LaStats>();
  filter = 'All';

  constructor(private service: LegalCaseService) { }


  applyFilter(e: Event) {
    const target: any = e.target;
    this.filter = target.id;
  }


  getFilteredSentences() {
    const filter = this.filter;

    if ( filter === 'All' ) {
      return this.legalCase.sentences;
    }

    return this.service.getFilteredList(filter);
  }

  getFilteredParagraphs() {
    return this.legalCase.paragraphs;
  }

  isSentenceFilter() {
    return this.filter === 'Sentence';
  }

  ngOnInit() {
    this.sub = this.service.getCurrentCase$().subscribe(model => {
      this.legalCase = model;
      this.onRefreshDisplay();
    });

    EmitterService.registerCommand(this, 'RefreshDisplay', this.onRefreshDisplay);
    EmitterService.processCommands(this);
  }

  onRefreshDisplay() {
    this.sentenceStats = this.service.computeStats();
  }

  ngOnDestroy() {
    this.sub && this.sub.unsubscribe();
  }
}
