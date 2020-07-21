import { foModelBase } from '../shared';
import { LaSentence } from './la-sentence';

export class LaShortSentence extends foModelBase {
    sentID: string;
    text: string;
    rhetClass: string;

    id: number;
    caseNumber: string;
    paragraphNumber: string;
    sentenceNumber: string;
    sectionType: string;

    constructor(properties?: any) {
        super(properties);
        this.override(properties);
    }


}

export class SearchResult extends foModelBase {
    _index: any;
    _type: any;
    _id: any;
    _score: any;

    sentence: LaShortSentence;

    constructor(properties?: any) {
        super(properties);

        this.sentence = new LaShortSentence(properties._source);
        // tslint:disable-next-line: no-string-literal
        delete this['_source'];
    }

    get formatedScore() {
        const data = Math.round(100 * this._score) / 100;
        return `${data}`;
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

    bold(name: string) {
        return `<b class="boldhighlight">${name}</b>`;
    }



    replaceSplitJoin(text: string, x: string, y: string) {
        const temp = text.split(x);
        const result = temp.join(y);
        return result;
    }

    replaceBold(text: string, name: string) {
        return this.replaceSplitJoin(text, name, this.bold(name));
    }

    textMarkup(listOfWords: Array<string>): string {
        let text = `&nbsp; &nbsp; ${this.sentence.text}`;
        listOfWords.forEach(word => {
            text = this.replaceBold(text, word);
        });

        return text;
    }
}
