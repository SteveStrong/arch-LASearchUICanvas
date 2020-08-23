import { foModelBase, foBroadcastTopic } from '../shared';
import { LaSentence } from './la-sentence';



export class SearchResult extends foModelBase {
    _index: any;
    _type: any;
    _id: any;
    _score: any;

    isSelected: boolean = false;
    innerHTML: string;
    sentence: LaSentence;

    constructor(properties?: any) {
        super(properties);

        this.sentence = new LaSentence(properties._source);
        // tslint:disable-next-line: no-string-literal
        delete this['_source'];
    }

    get rawText() {
        return this.sentence.text;
    }

    get formatedScore() {
        const data = Math.round(100 * this._score) / 100;
        return data;
    }

    get IDLabel() {
        return `No: ${this.sentence.caseNumber}  P:${this.sentence.paragraphNumber}  S:${this.sentence.sentenceNumber}`;
    }

    get CaseAndScore() {
        return `${this.CaseNoLabel},  ${this.SearchScoreLabel}`;
    }

    get CaseNoLabel() {
        return `Case No. ${this.sentence.caseNumber}`;
    }
    get SearchScoreLabel() {
        return `Search Score ${this.formatedScore}`;
    }

 
}
