import { Component, OnInit } from '@angular/core';
import { EmitterService, Toast } from '../shared';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TOPIC_TextSearch, TOPIC_FilterSearch } from '../models';


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
      textSearch: [''],
      onlyFindings: [false]
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
    if (this.searchForm.invalid) {
      return;
    } else if (text !== '') {
      if (onlyFindings === true) {
        Toast.info(`searching for ${text}`, 'Findings Only');
        EmitterService.broadcastCommand(this, TOPIC_FilterSearch, [text]);
      } else {
        Toast.info(`searching for ${text}`);
        EmitterService.broadcastCommand(this, TOPIC_TextSearch, [text]);
      }

    }
  }
}
