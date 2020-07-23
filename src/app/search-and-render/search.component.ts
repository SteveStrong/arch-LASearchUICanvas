import { Component, OnInit } from '@angular/core';
import { Toast, EmitterService } from '../shared';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QueryResultService } from './query-result.service';


@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
    defaultImage = '../../assets/images/noimage.jpg';
    file: File;
    filter: string;
    searchForm: FormGroup;
    submitted = false;


    constructor(private formBuilder: FormBuilder, private service: QueryResultService) {}

    ngOnInit(): void {
        this.searchForm = this.formBuilder.group({
            textSearch: ['Vietnam of people  threatened ']
        });
        // EmitterService.registerTopic<ChangedPersona>(this, nameOf<ChangedPersona>(ChangedPersona), ({ user }) => {
        //     this.user = user;
        // });

        EmitterService.registerCommand(this, 'FILTER_VALUES_CHANGED', filter => {
            this.filter = filter;
            this.doSearch();
        });

        EmitterService.processCommands(this);
    }

    get f() {
        return this.searchForm.controls;
    }

    onFileOpen(e: any) {
        const file = e.target.files[0];
        this.onOpenOrImport(file);
    }

    onOpenOrImport(file: File) {
        const reader = new FileReader();
        reader.onerror = event => {
            Toast.error('fail...', JSON.stringify(event.target));
        };
        reader.onload = event => {
            if (event && event.target) {
                this.defaultImage = event.target.result as string;
            }
        };
        this.file = file;
        reader.readAsDataURL(this.file);
    }

    doSearch() {
        this.submitted = true;
        const text = this.f.textSearch.value;

        // stop here if form is invalid
        if (this.searchForm.invalid) {
            return;
        }
        else if ( text !== '') {
            const s1 = this.service.searchText$(text).subscribe(payload => {
                s1.unsubscribe();
            });
        }
    }
}
