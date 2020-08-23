import { Component, OnInit } from '@angular/core';
import { EmitterService, Toast } from '../shared';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TOPIC_TextSearch, TOPIC_FilterSearch } from '../models';



@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
    searchForm: FormGroup;
    submitted = false;
    onlyFindings = true;


    constructor(private formBuilder: FormBuilder) {}

    ngOnInit(): void {
        this.searchForm = this.formBuilder.group({
            textSearch: ['vietnam ']
        });

        EmitterService.processCommands(this);
    }

    get f() {
        return this.searchForm.controls;
    }


    doSearch() {
        this.submitted = true;
        const text = this.f.textSearch.value;

        // stop here if form is invalid
        if (this.searchForm.invalid) {
            return;
        } else if (text !== '') {
            Toast.info('searching for', text);
            if (this.onlyFindings) {
                EmitterService.broadcastCommand(this, TOPIC_FilterSearch, [text]);
            } else {
                EmitterService.broadcastCommand(this, TOPIC_TextSearch, [text]);
            }

        }
    }
}
