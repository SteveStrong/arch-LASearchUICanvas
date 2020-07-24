import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LaSentence } from '../models';


import { LegalCaseService } from '../models/legal-case.service';

@Component({
  selector: 'app-joiner',
  templateUrl: './joiner.component.html'
})
export class JoinerComponent implements OnInit {
  @Input() sentence: LaSentence;
  @Output() onMerge: EventEmitter<any> = new EventEmitter();

  nextSentence: LaSentence;

  constructor(
    private service: LegalCaseService) {
    }

  ngOnInit() {
    this.nextSentence = this.service.getNextSentence(this.sentence);
  }

  doMerge() {
    this.sentence.mergeTextFrom(this.nextSentence, '  ');
    this.service.deleteSentence(this.nextSentence);
    this.nextSentence = null;
    this.onMerge.emit();
  }
}
