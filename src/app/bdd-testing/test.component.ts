import { Component, OnInit, Input } from '@angular/core';

import { Matcher, BDDTestResultGroup, BDDTestResult } from './matchers';

@Component({
    selector: 'app-test',
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
    @Input() test: BDDTestResult;
    constructor() {}

    ngOnInit(): void {}

    backgroundColor() {
        return this.test.backgroundColor();
    }

    isFailure() {
        return this.test.isFailure;
    }
}
