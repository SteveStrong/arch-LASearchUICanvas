import { BDDTestResult, BDDTestResultGroup, Matcher } from '../matchers';
import { ModelBase } from '../../shared';

describe('BDDTestResult', () => {
    it('should create an instance', () => {
        const modelBase = new BDDTestResult();
        expect(modelBase).toBeTruthy();
        expect(modelBase.isUnknown).toEqual(true);
    });

    it('should test isSuccess && isFailure', () => {
        const modelBase = new BDDTestResult({
            result: true
        });
        expect(modelBase.isSuccess).toBeTruthy();
        expect(modelBase.isFailure).toBeFalsy();
    });

    it('should test setTitle', () => {
        const modelBase = new BDDTestResult({
            title: 'old title'
        });
        expect(modelBase.title).toEqual('old title');
        modelBase.setTitle('New title');
        expect(modelBase.title).toEqual('New title');
    });

    it('should test backgroundColor', () => {
        const modelBase = new BDDTestResult({
            result: true
        });
        let color = modelBase.backgroundColor();
        expect(color).toEqual('lightgreen');

        modelBase.result = false;
        color = modelBase.backgroundColor();
        expect(color).toEqual('lightsalmon');
    });
});

describe('BDDTestResultGroup', () => {
    it('should create an instance', () => {
        const modelBase = new BDDTestResultGroup();
        expect(modelBase).toBeTruthy();
    });

    it('should test heading and setTitle', () => {
        const modelBase = new BDDTestResultGroup({
            name: 'Dave'
        });

        expect(modelBase.heading).toEqual('Dave');
        modelBase.setTitle('old title');
        expect(modelBase.title).toEqual('old title');
        expect(modelBase.heading).toEqual(modelBase.title);

        modelBase.setTitle('New title');
        expect(modelBase.title).toEqual('New title');
        expect(modelBase.heading).toEqual(modelBase.title);
    });

    it('should test addNote', () => {
        const modelBase = new BDDTestResultGroup();
        modelBase.addNote('note');
        expect(modelBase.notes.length).toEqual(1);
    });

    it('should test addResult', () => {
        const modelBase = new BDDTestResultGroup();
        const success = new BDDTestResult({ result: true });
        const failure = new BDDTestResult({ result: false });

        modelBase.addResult(success);
        modelBase.addResult(failure);
        expect(modelBase.successCount).toEqual(1);
        expect(modelBase.failureCount).toEqual(1);
        expect(modelBase.total).toEqual(2);
    });
});

describe('Matcher', () => {
    it('should create an instance', () => {
        const modelBase = new Matcher(new BDDTestResultGroup());
        expect(modelBase).toBeTruthy();
    });

    it('should create an instance', () => {
        const { group, match } = Matcher.testStart('hello');
        expect(group).toBeTruthy();
        expect(match).toBeTruthy();
    });

    it('should test expect', () => {
        const { group, match } = Matcher.testStart('hello');
        const result = match.expect(new ModelBase());

        expect(match.myType).toEqual(result.myType);
    });

    xit('should test setTitle and getTitle', () => {
        const modelBase = new Matcher(new BDDTestResultGroup());
        modelBase.setTitle('New title');
        expect(modelBase.getTitle()).toEqual('New title');
    });

    it('should test toContain', () => {
        const { group, match } = Matcher.testStart('hello');
        match.expect('hello').toContain('hello');
        expect(group.total).toBe(1);
        expect(group.firstResult().isSuccess).toBeTruthy();
    });

    it('should test toContain again', () => {
        const { group, match } = Matcher.testStart('hello');
        match.expect('hello').toContain('goodbye');
        expect(group.total).toBe(1);
        expect(group.firstResult().isFailure).toBeTruthy();
    });

    it('should test report count', () => {
        const { group, match } = Matcher.testStart('hello');
        match.expect('hello').report(new ModelBase());
        expect(group.total).toBe(1);
    });

    it('should test toContain count', () => {
        const { group, match } = Matcher.testStart('hello');
        match.expect('hello').toContain('goodbye');
        match.expect('hello').toContain('hello');
        expect(group.total).toBe(2);

    });

    it('should test toContainEncoded', () => {
        const { group, match } = Matcher.testStart('hello');
        const data = encodeURI('hell ooo')
        match.expect(data).toContainEncoded('hell ooo');
        expect(group.firstResult().isSuccess).toBeTruthy();
    });

    it('should test expectSomethingInPayload', () => {
        const { group, match } = Matcher.testStart('hello');

        match.expectSomethingInPayload(['hellooo']);
        expect(group.firstResult().isSuccess).toBeTruthy();
    });

    it('should test expectEmptyPayload', () => {
        const { group, match } = Matcher.testStart('hello');

        match.expectEmptyPayload([]);
        expect(group.firstResult().isSuccess).toBeTruthy();
    });

    it('should test toBeFalsy', () => {
        const { group, match } = Matcher.testStart('hello');

        match.expect(false).toBeFalsy();
        expect(group.firstResult().isSuccess).toBeTruthy();
    });

    it('should test toBeTruthy', () => {
        const { group, match } = Matcher.testStart('hello');

        match.expect(true).toBeTruthy();
        expect(group.firstResult().isSuccess).toBeTruthy();
    });

});
