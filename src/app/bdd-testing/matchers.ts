import { Observable, of, Subject } from 'rxjs';
import { ModelBase, IResponse } from '../shared';

export class BDDTestResult extends ModelBase {
    expect: any;
    given: any;
    op: string;
    result: boolean;
    title: string;

    owner: BDDTestResultGroup;
    constructor(properties?: any) {
        super(properties);
    }

    get isSuccess() {
        return this.result === true;
    }

    get isFailure() {
        return this.result === false;
    }

    get isUnknown() {
        return this.result == null;
    }

    backgroundColor() {
        let result = 'almond';
        if (this.isSuccess) {
            result = 'lightgreen';
        } else if (this.isFailure) {
            result = 'lightsalmon';
        }
        return result;
    }
    setTitle(title: string) {
        this.title = title;
        return this;
    }
}

export class BDDTestResultGroup extends ModelBase {
    name: string;
    title: string;
    notes: Array<string> = new Array<string>();
    tests: Array<BDDTestResult> = new Array<BDDTestResult>();

    constructor(properties?: any) {
        super(properties);
    }

    get heading() {
        return this.title ? this.title : this.name;
    }

    setTitle(title: string) {
        this.title = title;
        return this;
    }

    addNote(obj: string) {
        this.notes.push(obj);
    }

    addResult(obj: BDDTestResult) {
        this.tests.push(obj);
    }

    firstResult() {
        return this.tests[0];
    }

    get total() {
        return this.tests.length;
    }

    get successCount() {
        return this.tests.filter(item => item.isSuccess).length;
    }

    get failureCount() {
        return this.tests.filter(item => item.isFailure).length;
    }
}

export class Matcher {
    constructor(group: BDDTestResultGroup) {
        this.group = group;
    }

    static testResultGroup: Subject<BDDTestResultGroup> = new Subject<BDDTestResultGroup>();

    private group: BDDTestResultGroup;
    private source: any;
    private result: BDDTestResult;

    public static testStart(name: string) {
        const group = new BDDTestResultGroup({
            name: name
        });

        const match = new Matcher(group);

        return { group, match };
    }

    public static testComplete(group: BDDTestResultGroup) {
        Matcher.testResultGroup.next(group);
    }

    public expect(obj: any): Matcher {
        const match = new Matcher(this.group);
        match.setSource(obj);
        return match;
    }

    public setSource(obj: any) {
        this.source = obj;
        return this;
    }

    get myType(): string {
        const comp: any = this.constructor;
        return comp.name;
    }

    public setTitle(title: string) {
        this.result && this.result.setTitle(title);
        return this;
    }

    public getTitle(): string {
        return (this.result && this.result.title) || '';
    }

    public report(obj: any) {
        const text = `${this.source}`;

        this.result = new BDDTestResult({
            given: obj,
            op: this.report.name
        });
        this.group.addResult(this.result);
        return this;
    }

    public toContain(given: string) {
        const text = `${this.source}`;

        this.result = new BDDTestResult({
            expect: text,
            given: given,
            op: this.toContain.name,
            result: text.includes(given)
        });
        this.group.addResult(this.result);
        return this;
    }

    public toContainEncoded(given: string) {
        const text = `${this.source}`;

        this.result = new BDDTestResult({
            expect: text,
            given: given,
            op: this.toContain.name,
            result: text.includes(encodeURI(given))
        });
        this.group.addResult(this.result);
        return this;
    }

    public expectNoErrors(obj: IResponse<any>): Matcher {
        const match = new Matcher(this.group);
        match.setSource(obj);

        const result = obj == null ? true : obj.hasError;
        let data = {
            expect: obj,
            op: this.expectNoErrors.name,
            result: true,
            title: ''
        };

        if (result && obj != null) {
            data = {
                expect: obj,
                op: this.expectNoErrors.name,
                result: false,
                title: obj.message
            };
        }

        this.result = new BDDTestResult(data);
        this.group.addResult(this.result);

        return match;
    }

    public expectErrors(obj: IResponse<any>): Matcher {
        const match = new Matcher(this.group);
        match.setSource(obj);

        this.result = new BDDTestResult({
            expect: obj,
            op: this.expectErrors.name,
            result: obj.hasError,
            title: obj.message
        });
        this.group.addResult(this.result);

        return match;
    }

    public expectSomethingInPayload(obj: Array<any>): Matcher {
        const match = new Matcher(this.group);
        match.setSource(obj);

        this.result = new BDDTestResult({
            expect: obj,
            op: this.expectSomethingInPayload.name,
            result: obj && obj.length > 0 ? true : false
        });
        this.group.addResult(this.result);

        return match;
    }

    public expectEmptyPayload(obj: Array<any>): Matcher {
        const match = new Matcher(this.group);
        match.setSource(obj);

        this.result = new BDDTestResult({
            expect: obj,
            op: this.expectEmptyPayload.name,
            result: obj && obj.length === 0 ? true : false
        });
        this.group.addResult(this.result);

        return match;
    }

    public toBeFalsy() {
        this.result = new BDDTestResult({
            expect: this.source,
            op: this.toBeFalsy.name,
            result: !this.source ? true : false
        });
        this.group.addResult(this.result);
        return this;
    }

    public toBeTruthy() {
        this.result = new BDDTestResult({
            expect: this.source,
            op: this.toBeTruthy.name,
            result: this.source ? true : false
        });
        this.group.addResult(this.result);
        return this;
    }
}
