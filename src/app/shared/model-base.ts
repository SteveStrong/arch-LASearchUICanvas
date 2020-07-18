

export class ModelBase {
    constructor(properties?: any) {
        if (properties) {
            this.override(properties);
        }
    }

    override(data: any) {
        Object.keys(data).forEach(key => {
            this[key] = data[key];
        });
    }
    get myType(): string {
        const comp: any = this.constructor;
        return comp.name;
    }
}



export class Topic<T> {
    
}
export class BroadcastTopic {

    constructor() {}
}

