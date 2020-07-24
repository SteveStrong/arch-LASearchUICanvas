import { Component, OnInit, Input } from '@angular/core';
import { Toast, EmitterService } from '../shared/emitter.service';

import { LaSentence } from '../models';

import { LegalCaseService } from '../models/legal-case.service';
import { PredictionService } from '../models/prediction.service';

@Component({
  selector: 'app-prediction',
  templateUrl: './prediction.component.html'
})
export class PredictionComponent implements OnInit {
  @Input() userCanEdit = true;
  hasCalled = false;
  showContext = false;
  predictionList: Array<any>;

  @Input() sentence: LaSentence;

  constructor(
    private lService: LegalCaseService,
    private pService: PredictionService) {
  }

  ngOnInit() {
    if ( this.sentence.hasPredictions() ) {
      this.predictionList = this.sentence.getPredictions();
    }
  }

  callPredict() {
      if (!this.sentence.hasPredictions()) {
        const sentence = this.sentence;
        const text = this.sentence.text;

        this.pService.predictSentenceDetails(text).subscribe(item => {
          this.predictionList = sentence.capturePredictionData(item);
        });
      }
  }

  doTogglePeak() {
    this.showContext = !this.showContext;
  }

  firstPrediction() {
    if ( this.predictionList ) {
      return [this.predictionList[0]];
    }
    return [];
  }

  restPredictions() {
    if ( this.predictionList ) {
      return this.predictionList.slice(1);
    }
    return [];
  }

  doAssertAll(item) {
    if ( this.userCanEdit) {
      this.sentence.applyForcedPrediction(item.name, this.lService.currentUsername);
      this.lService.applyPredictionForAll(item);
      EmitterService.broadcastCommand(this, 'RefreshDisplay');
    }
  }

  doAssertThis(item) {
    if ( this.userCanEdit) {
      this.sentence.applyForcedPrediction(item.name, this.lService.currentUsername);
      EmitterService.broadcastCommand(this, 'RefreshDisplay');
    }
  }

}
