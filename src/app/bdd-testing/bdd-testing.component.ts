import { Component, OnInit } from '@angular/core';

import { AppHttpService } from '../shared/foHttp.service';

import { environment } from '../../environments/environment';
import { RandomNames } from './generator';
import { Matcher, BDDTestResultGroup } from './matchers';
import { FuncAny, User } from '../shared';
import { QueryResultService } from '../home-page/query-result.service';

const user = new User({
    firstName: 'Public',
    roles: ['PUBLIC']
});

@Component({
    selector: 'app-bdd-testing',
    templateUrl: './bdd-testing.component.html',
    styleUrls: ['./bdd-testing.component.scss']
})
export class BddTestingComponent implements OnInit {
    results: Array<BDDTestResultGroup> = new Array<BDDTestResultGroup>();

    constructor(private httpService: AppHttpService, private qrService: QueryResultService) {}

    doRunScenario(done?: FuncAny): void {
        environment.featureflags.useMockData = true;
        const runList = [this.scenarioDoTextSearch];

        Matcher.testResultGroup.subscribe(item => {
            this.results.push(item);
        });

        runList.forEach(func => {
            const { group, match } = Matcher.testStart(`${func.name}`);
            func.call(this, group, match, () => {
                Matcher.testComplete(group);
            });
        });
        done && done();
    }

    ngOnInit(): void {
        this.doRunScenario();
    }

    scenarioDoTextSearch(g: BDDTestResultGroup, m: Matcher, done?: () => void) {
        g.setTitle('Query a search by text');

        const query = 'coffee';

        this.verifySearchTextURL(g, m, query, () => {
            this.searchText(g, m, query, done);
        });
    }



    scenarioDoSearchNextPage(g: BDDTestResultGroup, m: Matcher, done?: () => void) {
        g.setTitle('Next page of search');

        const query = 'coffee';

        this.verifySearchTextURL(g, m, query, () => {
            //this.searchNextPage(g, m, query, done);
        });
    }

    verifySearchTextURL(g: BDDTestResultGroup, m: Matcher, queryText: string, done?: () => void) {
        const api = this.qrService.TEXT_QUERY_URL_OPTIONS(queryText).api;
        const url = this.httpService.createServiceUrl(this.qrService.TEXT_QUERY_URL_OPTIONS(queryText));

        m.expect(url)
            .toContain(environment.baseURL)
            .setTitle(`It matches injected url:: ${environment.baseURL}`);
        m.expect(url)
            .toContain(environment.rootAPIPath)
            .setTitle(`has the root API path:: ${environment.rootAPIPath}`);
        m.expect(url)
            .toContain(environment.APIVersion)
            .setTitle(`has the right version:: ${environment.APIVersion}`);
        m.expect(url)
            .toContain(api)
            .setTitle(`has the api call:: ${api}`);

        done && done();
    }



    searchText(g: BDDTestResultGroup, m: Matcher, queryText: string, done?: () => void) {
        m.report(queryText).setTitle(`query text is ${queryText}`);

        const subject = this.qrService.searchText$(queryText, user);

        const s1 = subject.subscribe(({ error, payload }) => {
            m.expectNoErrors(error);
            m.expectSomethingInPayload(payload);
            s1.unsubscribe();

            done && done();
        });
    }


}
