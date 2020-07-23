import { Component, OnInit, Input, AfterViewInit } from '@angular/core';

import { Matcher, BDDTestResultGroup, BDDTestResult } from './matchers';

@Component({
    selector: 'app-group',
    templateUrl: './group.component.html',
    styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
    @Input() group: BDDTestResultGroup;
    total: number ;
    successes: number;
    failures: number;

    constructor() {
    }

    ngOnInit(): void {
        this.update();
    }

    update(): void {

        this.total = this.group.total;
        this.successes = this.group.successCount;
        this.failures = this.group.failureCount;
    }
}
