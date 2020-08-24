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
  @Input() legalCase: LaLegalCase;

  // do not show attribute count in read only mode

  sub: any;

  constructor(private service: LegalCaseService) { }


  getFilteredParagraphs() {
    return this.legalCase.paragraphs;
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
  }

  ngOnDestroy() {
    this.sub && this.sub.unsubscribe();
  }
}
