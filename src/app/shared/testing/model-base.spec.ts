import { ModelBase } from '..';
import { BroadcastTopic } from '../model-base';

describe('ModelBase', () => {
    it('should create an instance', () => {
        const modelBase = new ModelBase();
        expect(modelBase).toBeTruthy();
    });

    it('override ', () => {
        //reason for newAttr is to allow us to pass all linting rules.
        const newAttr = 'xxx';
        const modelBase = new ModelBase({ [newAttr]: 'steve' });
        expect(modelBase[newAttr]).toBeTruthy();
    });

    it('my type', () => {
        const modelBase = new ModelBase();
        expect(modelBase.myType).toBeTruthy();
    });

    it('my type', () => {
        const modelBase = new ModelBase();
        const type = modelBase.myType;
        expect(type).toBeTruthy();
    });

    it('my type == ModelBase', () => {
        const modelBase = new ModelBase();
        const type = modelBase.myType;
        expect(type).toEqual('ModelBase');
    });
});

describe('BroadcastTopic', () => {
    it('should create an instance', () => {
        const topic = new BroadcastTopic();
        expect(topic).toBeTruthy();
    });
});
