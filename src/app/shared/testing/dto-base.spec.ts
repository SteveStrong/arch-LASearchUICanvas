import { DTOBase } from '..';

describe('DTOBase', () => {
    it('should create an instance', () => {
        const base = new DTOBase();
        expect(base).toBeTruthy();
    });

    it('override ', () => {
        //reason for newAttr is to allow us to pass all linting rules.
        const newAttr = 'xxx';
        const base = new DTOBase({ [newAttr]: 'steve' });
        expect(base[newAttr]).toBeTruthy();
    });

    it('my type', () => {
        const base = new DTOBase();
        expect(base.myType).toBeTruthy();
    });

    it('my type', () => {
        const base = new DTOBase();
        const type = base.myType;
        expect(type).toBeTruthy();
    });

    it('my type == DTOBase', () => {
        const base = new DTOBase();
        const type = base.myType;
        expect(type).toEqual('DTOBase');
    });
});
