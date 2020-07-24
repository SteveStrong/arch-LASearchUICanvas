import { Component, OnInit, Input } from '@angular/core';
import { EmitterService, Toast } from '../shared';

import { LegalCaseService } from '../models/legal-case.service';
import { LaDecisionNode, LaSentence } from '../models';

@Component({
  selector: 'app-decision-badge',
  templateUrl: './decision-badge.component.html',
  styleUrls: ['./decision-badge.component.css']
})
export class DecisionBadgeComponent implements OnInit {
  @Input() sentence: LaSentence;


  constructor(private service: LegalCaseService) {}

  ngOnInit() {
  }

  getDecisionBadges() {
    const keys = this.sentence ? this.sentence.getDecisionKeys() : [];
    if ( keys.length > 0 ) {
      const decisions = this.service.resolveDecisionKeys(keys);
      return decisions.map(item => {
        return item.sentTag();
      });
    }

    return keys;
  }

}
