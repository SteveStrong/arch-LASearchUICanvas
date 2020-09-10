import { Component, OnInit } from '@angular/core';
import { EmitterService, Toast } from '../shared';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TOPIC_AdvancedQuery } from '../models';


@Component({
  selector: 'app-search-advanced',
  templateUrl: './search-advanced.component.html',
  styleUrls: ['./search-advanced.component.scss']
})
export class SearchAdvancedComponent implements OnInit {
  searchForm: FormGroup;
  submitted = false;


  constructor(private formBuilder: FormBuilder) { }


  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      includeany: [''],
      includeall: [''],
      exactphrase: [''],
      excludeall: [''],
      findingSentence: [false],
      evidenceSentence: [false],
      legalRuleSentence: [false],
      reasoningSentence: [false],
      citationSentence: [false]
    });

    EmitterService.processCommands(this);
  }

  get f() {
    return this.searchForm.controls;
  }


  doSearch() {
    this.submitted = true;
    const includeall = this.f.includeall.value;
    const includeany = this.f.includeany.value;
    const exactphrase = this.f.exactphrase.value;
    const excludeall = this.f.excludeall.value;
    const findingSentence = this.f.findingSentence.value;
    const evidenceSentence = this.f.evidenceSentence.value;
    const legalRuleSentence = this.f.legalRuleSentence.value;
    const reasoningSentence = this.f.reasoningSentence.value;
    const citationSentence = this.f.citationSentence.value;

    // stop here if form is invalid
    if (!this.searchForm.invalid) {

      const rhetRule = [];
      if (findingSentence) {
        rhetRule.push('FindingSentence');
      }
      if (evidenceSentence) {
        rhetRule.push('EvidenceSentence');
      }
      if (legalRuleSentence) {
        rhetRule.push('LegalRuleSentence');
      }
      if (reasoningSentence) {
        rhetRule.push('ReasoningSentence');
      }
      if (citationSentence) {
        rhetRule.push('CitationSentence');
      }
      const query = {
        rhetRule,
        includeall,
        includeany,
        exactphrase,
        excludeall,
      };
      
      Toast.info(`advanced search`);
      EmitterService.broadcastCommand(this, TOPIC_AdvancedQuery, [query]);
    }
  }
}
