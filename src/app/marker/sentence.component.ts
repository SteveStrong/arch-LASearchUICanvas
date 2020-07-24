import { Component, OnInit, Input } from '@angular/core';

import { LaSentence } from '../models';
import { EmitterService } from '../shared/emitter.service';


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


  constructor() {
  }

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



}
