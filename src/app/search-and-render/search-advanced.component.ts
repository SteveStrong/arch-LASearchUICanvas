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
      excludeany: [''],
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
    const text = this.f.textSearch.value;
    const onlyFindings = this.f.onlyFindings.value;

    // stop here if form is invalid
    if (!this.searchForm.invalid) {

      query = {

      }
      
      Toast.info(`advanced searching for ${text}`);
      EmitterService.broadcastCommand(this, TOPIC_AdvancedQuery, [query]);
    }
  }
}
