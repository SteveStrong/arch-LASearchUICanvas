import { Component, OnInit, Input } from '@angular/core';

import { LaParagraph } from '../models';
import { EmitterService } from '../shared/emitter.service';


@Component({
  selector: 'app-paragraph',
  templateUrl: './paragraph.component.html'
})
export class ParagraphComponent implements OnInit {
  selected = false;
  @Input() userCanEdit = true;

  @Input() paragraph: LaParagraph;
  @Input() filter = '';

  constructor() { }

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
