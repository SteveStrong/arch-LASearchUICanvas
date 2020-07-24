import { Component, OnInit, Input } from '@angular/core';

import { LaSentence, LaParagraph } from '../models';

import { LegalCaseService } from '../models/legal-case.service';

@Component({
  selector: 'app-peekcontext',
  templateUrl: './peekcontext.component.html'
})
export class PeekcontextComponent implements OnInit {
  @Input() userCanEdit = true;

  @Input() sentence: LaSentence;
  context: LaParagraph;

  constructor(
    private service: LegalCaseService) {
    }

  ngOnInit() {
    this.context = this.service.findParagraph(this.sentence);
  }

}
