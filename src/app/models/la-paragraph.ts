import { LaAtom } from './la-atom';
import { LaSentence  } from './la-sentence';
import { LaStats } from './la-stats';


export class LaParagraph extends LaAtom {
  caseNumber: string;
  paragraphNumber: string;
  histogram: any = undefined;

  id: number;

  private lookup = {};
  sentences: Array<LaSentence> = new Array<LaSentence>();

  constructor(properties?: any) {
    super(properties);

    // tslint:disable-next-line: radix
    this.id = parseInt(this.paragraphNumber);
  }

  clearSentences() {
    this.sentences = new Array<LaSentence>();
    this.lookup = {};
    this.histogram = undefined;
  }

  sortSentences() {
    this.sentences = this.sentences.sort((a, b) => {
      return a.id - b.id;
    });
    return this.sentences;
  }

  get context() {
    if (this.sentences?.length > 0) {
      return this.sentences[0].context;
    }
    return '';
  }

  get label() {
    return `${this.caseNumber}: P${this.paragraphNumber}`;
  }

  isCompleteArgument(): number {
    const dict = this.sentenceHistogram();
    if ( this.isReasoningArgument() === 0 ) { return 0; }
    if ( this.isEvidenceArgument() === 0 ) { return 0; }
    return this.isFinding();
  }

  isFinding(): number {
    const dict = this.sentenceHistogram();
    return dict.FindingSentence ? 1000 : 0;
  }

  isReasoningArgument(): number {
    const dict = this.sentenceHistogram();
    if ( !this.isFinding() ) { return 0; }
    if ( dict.ReasoningSentence ) {
      return 1100;
    }
    return 0;
  }

  isEvidenceArgument(): number {
    const dict = this.sentenceHistogram();
    if ( !this.isFinding() ) { return 0; }
    if ( dict.EvidenceSentence ) {
      return 1010;
    }
    return 0;
  }

  isLoneSentence(): number {
    const dict = this.sentenceHistogram();
    if ( Object.keys(dict).length === 1 && dict.Sentence ) {
      return -1000;
    }
    return 0;
  }

  completeArgumentScore() {
    const dict = this.sentenceHistogram();
    let score = dict.EvidenceSentence;
    score += dict.ReasoningSentence;

    return score;
  }

  get pointValue() {
    const complete = this.isCompleteArgument();
    const reasoned = this.isReasoningArgument();
    const evidence = this.isEvidenceArgument();
    const finding = this.isFinding();
    const lone = this.isLoneSentence();
    const count = this.weightedCount / 10;
    const total = complete + reasoned + evidence + finding + lone + count;
    return total;
  }

  get weightedCount() {
    let total = 0;
    const dict = this.sentenceHistogram();
    for (const [key, value] of Object.entries(dict)) {
      total += value;
    }
    return total;
  }

  compare(other: LaParagraph): number {
    const score = this.pointValue - other.pointValue;

    return score;
  }

  get score() {
    const total = this.pointValue;
    const count = this.weightedCount;

    return `${total}::${count}`;
  }

  sentenceHistogram(): { [key: string]: number; } {
    if ( this.histogram != undefined) {
      return this.histogram;
    }
    this.histogram = {};
    this.sentences.forEach(item => {
      if ( !this.histogram[item.rhetClass]) {
        this.histogram[item.rhetClass] = 0;
      }
      this.histogram[item.rhetClass] += 1;
    });
    return this.histogram;
  }

  computeStats() {

    const hist: any = this.sentenceHistogram();

    let list: Array<any> = new Array<any>();
    Object.keys(hist).forEach(key => {
      list.push({
        name: key,
        value: hist[key]
      });
    });

    list = list.sort((a, b) => b.value - a.value);
    return list;
  }

  firstSentence() {
    return this.sentences[0];
  }

  lastSentence() {
    return this.sentences[this.sentences.length - 1];
  }

  isSection(): Boolean {
    if (this.hasSentences()) {
      return this.firstSentence().isSection;
    }
    return false;
  }

  hasSentences() {
    return this.sortSentences && this.sentences.length > 0;
  }

  addSentence(obj: LaSentence) {
    const num = obj.sentenceNumber;
    this.lookup[num] = obj;
    this.sentences.push(obj);
    this.histogram = undefined;
    return obj;
  }

  deleteSentence(obj: LaSentence) {
    const index = this.sentences.indexOf(obj);
    if (index > -1) {
      this.sentences.splice(index, 1);
    }
    
    this.lookup = {};
    this.renumSentences();
  }

  renumSentences() {
    let id = 1;
    this.sortSentences();
    this.sentences.forEach(item => {
      item.renumberTo(id);
      this.lookup[item.sentenceNumber] = item;
      id++;
    });
    return this.sentences;
  }
}
