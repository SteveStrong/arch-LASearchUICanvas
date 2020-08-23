import { LaAtom } from './la-atom';
import { LaAttributionRelation } from './la-attributionRelation';

import { LaDecisionNode } from './la-decisionNode';


export class LaSentence extends LaAtom {
  sentID: string;
  text: string;
  rhetClass: string;
  labeler: string;
  isSection: boolean;

  id: number;
  caseNumber: string;
  paragraphNumber: string;
  sentenceNumber: string;
  sectionType: string;
  context: string;

  rhetClassPredict: string;
  predictions: any;

  attributions: Array<LaAttributionRelation>;
  private ruleConditions: Array<string>;

  constructor(properties?: any) {
    const attributions = properties.attributions;
    delete properties.attributions;

    super(properties);


    this.sentID && this.decomposeID(this.sentID);
    if (this.sentenceNumber) {
      // tslint:disable-next-line: radix
      this.id = parseInt(this.sentenceNumber);
    }

    attributions && attributions.forEach(item => {
      const obj = new LaAttributionRelation();
      this.addAttributionRelation(obj);
      obj.override(item);
    });

    this.deleteEmptyAttributions();
  }

  decomposeID(sentID: string): LaSentence {
    let data = sentID.split('P');
    this.caseNumber = data[0];

    data = data[1].split('S');
    this.paragraphNumber = data[0];
    this.sentenceNumber = data[1];
    return this;
  }

  computeID(): LaSentence {
    this.sentID = `${this.caseNumber}P${this.paragraphNumber}S${this.sentenceNumber}`;
    return this;
  }

  sentTag(): string {
    return `P:${this.paragraphNumber} S:${this.sentenceNumber}`;
  }
  renumberTo(num: number): LaSentence {
    this.id = num;
    this.sentenceNumber = num.toString();
    return this.computeID();
  }

  deleteEmptyAttributions() {
    const list = this.attributions && this.attributions.splice(0);
    this.attributions = list && list.filter(item => {
      return item.isSaveWorthy();
    });
    return this.attributions;
  }

  get rhetLabel(): string {
    let value = this.rhetClass || '';
    if (value === 'Sentence') { return 'Other'; }
    value = value.replace('Sentence', '');
    return value;
  }

  cleanAttributions() {
    let found = false;
    this.attributions && this.attributions.forEach(item => {
      if (item.type.indexOf('Sentence') > 0) {
        found = true;
        item.type = item.type.replace('Sentence', '');
      }
    });
    return found;
  }

  isUnclassified() {
    return !this.rhetClass || this.rhetClass === 'Sentence';
  }

  hasClassification() {
    return this.rhetClass && this.rhetClass !== 'Sentence';
  }

  bold(name: string) {
    return `<b>${name}</b>`;
  }

  replaceBold(text: string, name: string) {
    return text.replace(name, this.bold(name));
  }

  textMarkup(): string {
    let text = '&nbsp; &nbsp;' + this.text;
    if (this.hasAttributionRelation()) {
      this.attributions.forEach(attribute => {
        text = this.replaceBold(text, attribute.cue);
        text = this.replaceBold(text, attribute.object);
        text = this.replaceBold(text, attribute.subject);
      });
    }
    return text;
  }

  getRhetClass(): string {
    if (this.isSection) {
      return 'section';
    }
    return this.rhetClass || 'Sentence';
  }

  getRhetClassPrediction(): string {
    return this.rhetClassPredict || 'Sentence';
  }

  clearPrediction() {
    this.predictions = undefined;
    this.rhetClassPredict = undefined;
  }

  hasPredictions() {
    return this.predictions !== undefined;
  }

  getPredictions() {
    return this.predictions;
  }

  hasLabeledClass(classification: string) {
    return this.rhetClass === classification;
  }

  hasPredictedClass(classification: string) {
    return this.rhetClassPredict === classification;
  }

  get predictedValue() {
    const value = this.predictions[0].value;
    return value;
  }

  capturePredictionData(item) {
    this.rhetClassPredict = item.classification;
    const keys = Object.keys(item.predictions);

    const list = [];
    keys.forEach(key => {
      const data = 10000 * parseFloat(item.predictions[key]);
      const obj = {
        name: key,
        value: Math.round(data) / 100
      };
      list.push(obj);
    });

    this.predictions = list.sort((a, b) => b.value - a.value);
    return this.predictions;
  }

  applyForcedPrediction(rhetClass: string, labeler: string) {
      this.rhetClass = rhetClass;
      this.labeler = labeler;
    }

  applyPredictionIfUnclassified(threshold: number, labeler: string) {
    if (this.isUnclassified() && this.hasPredictions()) {
      const best = this.predictions[0];
      if (best.value >= threshold) {
        this.applyForcedPrediction(best.name, labeler);
      }
    }
  }

  applyPredictionOfTypeIfUnclassified(threshold: number, name: string, labeler: string) {
    if (this.isUnclassified() && this.hasPredictions()) {
      const best = this.predictions[0];
      if (best.name === name && best.value >= threshold) {
        this.applyForcedPrediction(best.name, labeler);
      }
    }
  }

  isFindingSentence() {
    return this.getRhetClass().includes('Finding');
  }

  polarityColor() {
    const result = this.getFindingAttribution();
    if (result) {
      return result.polarityColor;
    }
    return 'white';
  }

  getFindingAttribution() {
    if (this.hasAttributionRelation()) {
      const result = this.attributions.filter(x => x.type.includes('Finding'));
      return result && result[0];
    }
  }

  hasAttributionRelation() {
    return this.attributions && this.attributions.length > 0;
  }

  getCurrentAttributionRelation() {
    return this.attributions && this.attributions[0];
  }

  addAttributionRelation(obj: LaAttributionRelation) {
    if (!this.hasAttributionRelation()) {
      this.attributions = new Array<LaAttributionRelation>();
    }
    this.attributions.push(obj);
    return this;
  }

  removeAttributionRelation(obj: LaAttributionRelation) {
    if (!this.hasAttributionRelation()) {
      return;
    }
    const index = this.attributions.indexOf(obj);
    if (index > -1) {
      this.attributions.splice(index, 1);
    }
    return this;
  }

  isLikelyCitation() {
    if (this.getRhetClass().includes('Citation')) {
      return true;
    }
  }

  mergeTextFrom(sentence: LaSentence, extra: string = ' ') {
    this.text += `${extra}${sentence.text}`;
    return this;
  }


  hasDecision(decision: LaDecisionNode): boolean {
    if (this.ruleConditions) {
      const key = decision.ruleID;
      const index = this.ruleConditions.indexOf(key);
      return index >= 0;
    }
    return false;
  }


  getDecisionKeys(): Array<string> {
    if (!this.ruleConditions) {
      return new Array<string>();
    }
    return this.ruleConditions;
  }

  addDecision(decision: LaDecisionNode): LaSentence {
    if (!this.ruleConditions) {
      this.ruleConditions = new Array<string>();
    }

    const key = decision.ruleID;
    const index = this.ruleConditions.indexOf(key);
    if (index === -1) {
      this.ruleConditions.push(key);
    }
    return this;
  }

  removeDecision(decision: LaDecisionNode): LaSentence {
    if (this.ruleConditions) {
      const key = decision.ruleID;
      const index = this.ruleConditions.indexOf(key);
      if (index > -1) {
        this.ruleConditions.splice(index, 1);
      }
    }
    return this;
  }

}
