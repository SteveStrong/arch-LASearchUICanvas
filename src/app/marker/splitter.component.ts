import { Component, OnInit, Input } from '@angular/core';

import { LaSentence } from '../models';
import { EmitterService } from '../shared/emitter.service';


import { LegalCaseService } from '../models/legal-case.service';
import { PredictionService } from '../models/prediction.service';

@Component({
  selector: 'app-splitter',
  templateUrl: './splitter.component.html'
})
export class SplitterComponent implements OnInit {
  @Input() sentence: LaSentence;

  constructor(
    private lService: LegalCaseService,
    private predict: PredictionService) {
    }

  ngOnInit() {
    if (!this.sentence.hasPredictions()) {
      this.doPrediction();
    }
  }

  // https://javascript.info/selection-range

  getRange() {

    if (window.getSelection) {
      const obj = window.getSelection().getRangeAt(0);

      return obj;
    }

  }

  getSelectedText() {
    let text = this.sentence.text;
    if (window.getSelection) {
      text = window.getSelection().toString();
    }
    return text !== '' ? text : this.sentence.text;
  }

  doExtract(name) {
    const text = this.getSelectedText();

    this.lService.splitSentence(this.sentence, text, name);
  }

  doSplit(name) {
    this.doExtract(name);
    EmitterService.broadcastCommand(this, 'CloseAll');
  }

  doPrediction() {
    const text = this.getSelectedText();
    this.predict.predictSentenceDetails(text).subscribe( item => {
      this.sentence.capturePredictionData(item);
      this.sentence.applyPredictionIfUnclassified(this.predict.defaultThreshold, this.lService.currentUsername);
    });
    return true;
  }

}
