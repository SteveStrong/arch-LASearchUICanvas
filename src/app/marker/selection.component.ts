import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { LaSentence } from '../models';
import { LaAttributionRelation } from '../models/la-attributionRelation';
import { EmitterService } from '../shared/emitter.service';

import { LegalCaseService } from '../models/legal-case.service';
import { PredictionService } from '../models/prediction.service';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html'
})
export class SelectionComponent implements OnInit {
  @Input() sentence: LaSentence;

  selectedText = '';

  constructor(
    private service: LegalCaseService,
    private predict: PredictionService) {
    }

  ngOnInit() {
    this.selectedText = this.getSelectedText();

    EmitterService.registerCommand(this, 'RefreshSelected', this.onRefreshSelected);
    EmitterService.processCommands(this);

  }

  getSelectedText() {
    let text = this.sentence.text;
    if (window.getSelection) {
      text = window.getSelection().toString();
    }
    return text !== '' ? text : this.sentence.text;
  }

  onRefreshSelected() {
    this.selectedText = this.getSelectedText();
  }

  doClose() {
    EmitterService.broadcastCommand(this, 'CloseAll');
  }

}
