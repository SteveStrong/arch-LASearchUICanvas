import { Component, OnInit, Input } from '@angular/core';
import { EmitterService, Toast } from '../shared';

import { LegalCaseService } from '../models/legal-case.service';
import { LaDecisionNode, LaSentence } from '../models';

@Component({
  selector: 'app-section-badge',
  templateUrl: './section-badge.component.html',
  styleUrls: ['./section-badge.component.scss']
})
export class SectionBadgeComponent implements OnInit {
  @Input() sentence: LaSentence;

  constructor(private service: LegalCaseService) {}

  ngOnInit() {
  }

  getSectionBadges() {
    // const keys = this.sentence ? this.sentence.getSectionBadges() : [];
    // return keys;
  }

}
