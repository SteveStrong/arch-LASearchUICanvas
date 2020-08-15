import { Component, OnInit, OnDestroy, Input, HostListener } from '@angular/core';
import { Toast, EmitterService } from '../shared/emitter.service';

import { LegalCaseService } from '../models/legal-case.service';

import { LaStats, LaLegalCase } from '../models';


@Component({
  selector: 'app-marker',
  templateUrl: './marker.component.html',
  styleUrls: ['./marker.component.css']
})
export class MarkerComponent implements OnInit, OnDestroy {
  @Input() userCanEdit = true;

  sub: any;
  legalCase: LaLegalCase;
  sentenceStats: Array<LaStats> = new Array<LaStats>();
  filter = 'All';

  constructor(private lService: LegalCaseService) { }


  applyFilter(e: Event) {
    // tslint:disable-next-line: no-string-literal
    this.filter = e.target['id'];
  }


  getFilteredSentences() {
    const filter = this.filter;

    if ( filter === 'All' ) {
      return this.legalCase.sentences;
    }

    return this.lService.getFilteredList(filter);
  }

  getPredictedSentences() {
    return this.lService.getPredictedList(this.filter, 'Sentence');
  }

  doApplyPredictions() {
    const list = this.getPredictedSentences();
    list.forEach( item => {
      item.applyPrediction(20.0);
    });
    setTimeout(() => {
      this.onRefreshDisplay();
    }, 100);
  }

  getFilteredParagraphs() {
    return this.legalCase.paragraphs;
  }

  isSentenceFilter() {
    return this.filter === 'Sentence';
  }

  ngOnInit() {
    this.sub = this.lService.getCurrentCase$().subscribe(model => {
      this.legalCase = model;
      this.onRefreshDisplay();
    });

    EmitterService.registerCommand(this, 'RefreshDisplay', this.onRefreshDisplay);
    EmitterService.processCommands(this);
  }

  onRefreshDisplay() {
    this.sentenceStats = this.lService.computeStats();
  }

  ngOnDestroy() {
    this.sub && this.sub.unsubscribe();
  }
}
