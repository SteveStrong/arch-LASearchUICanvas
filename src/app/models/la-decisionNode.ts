import { LaAtom } from './la-atom';
import { LaSentence } from './la-sentence';

export class LaDecisionNode extends LaAtom {
  label: string;
  ruleID: string;
  operation: string;
  polarity: string; // positive, undecided, negative
  stipulation: any;

  parent: LaDecisionNode;
  subNodes: Array<LaDecisionNode>;

  private sentenceLinks: Array<string>;

  constructor(properties?: any) {
    super(properties);
  }

  sentTag(): string {
    return `D:${this.ruleID}`;
  }

  hasChildren() {
    if (this.subNodes == null) { return false; }
    if (this.subNodes.length === 0) { return false; }
    return true;
  }

  hasOneChild() {
    if (this.subNodes == null) { return undefined; }
    if (this.subNodes.length === 1) { return this.subNodes[0]; }
    return undefined;
  }

  childCount() {
    if (this.subNodes == null) { return 0; }
    return this.subNodes.length;
  }

  // maybe a dictionary based on operator will be faster
  childANDs() {
    if (this.subNodes == null) { return []; }
    return this.subNodes.filter(item => item.operation !== 'OR' && item.operation !== 'REBUT');
  }

  childORs() {
    if (this.subNodes == null) { return []; }
    return this.subNodes.filter(item => item.operation === 'OR');
  }

  childREBUTs() {
    if (this.subNodes == null) { return []; }
    return this.subNodes.filter(item => item.operation === 'REBUT');
  }

  addChild(node: LaDecisionNode) {
    if (this.subNodes == null) {
      this.subNodes = new Array<LaDecisionNode>();
    }
    node.parent = this;
    this.subNodes.push(node);
    return this;
  }

  setStipulation(value) {
    this.stipulation = value;
  }

  stipulationClass() {
    if (this.stipulation === true) {
      return 'positive';
    }
    if (this.stipulation === false) {
      return 'negative';
    }
    return this.stipulation;
  }

  // maybe refactor into switch or case
  inversePolarityValue(value) {
    if (value === 'positive') {
      return 'negative';
    }
    if (value === 'negative') {
      return 'positive';
    }
    return value;
  }

  // is should be based on child values
  computeNodePolarity() {
    if (this.stipulation !== undefined) {
      return this.stipulationClass();
    }

    let result = this.polarityValue;
    if (!this.hasChildren()) {
      return result;
    }

    const child = this.hasOneChild();
    if (child) {
      result = child.computeNodePolarity();
      if (child.operation === 'REBUT') {
        return this.inversePolarityValue(result);
      }
      return result;
    }
    // now do the ands and ors
    const count = this.childCount();
    const theORS = this.childORs();

    // everything is a OR return the first true
    if (count === theORS.length) {

    }

    return result;
  }

  get polarityValue() {
    return this.polarity || 'undecided';
  }

  get polarityColor() {
    const result = this.computeNodePolarity();

    if (result === 'positive') {
      return `rgba(0,204,0,0.3)`;
    } else if (result === 'negative') {
      return `rgba(255,0,0,0.3)`;
    }
    return 'white';
  }

  set polarityValue(value) {
    this.polarity = value;
  }

  get myCount() {
    return this.subNodes && this.subNodes.length;
  }

  get parentCount() {
    return this.parent.myCount;
  }

  get memberId() {
    let id = 0;
    if (this.parent && this.parent.subNodes) {
      id = this.parent.subNodes.indexOf(this) + 1;
    }
    return id;
  }

  get memberLabel() {
    if (this.parent === undefined) {
      return '';
    }

    if (this.operation === undefined) {
      return '';
    }

    const pos = this.memberId;
    const count = this.parentCount;
    const op = this.operation || '';
    return `${op} [${pos} of ${count}]`;
  }

  hasSentence(sentence: LaSentence): boolean {
    if (this.sentenceLinks) {
      const key = sentence.sentID;
      const index = this.sentenceLinks.indexOf(key);
      return index >= 0;
    }
    return false;
  }

  getSentenceKeys(): Array<string> {
    if (!this.sentenceLinks) {
      return new Array<string>();
    }
    return this.sentenceLinks;
  }

  addSentence(sentence: LaSentence): LaDecisionNode {
    if (!this.sentenceLinks) {
      this.sentenceLinks = new Array<string>();
    }

    const key = sentence.sentID;
    const index = this.sentenceLinks.indexOf(key);
    if (index === -1) {
      this.sentenceLinks.push(key);
    }
    return this;
  }

  removeSentence(sentence: LaSentence): LaDecisionNode {
    if (this.sentenceLinks) {
      const key = sentence.sentID;
      const index = this.sentenceLinks.indexOf(key);
      if (index > -1) {
        this.sentenceLinks.splice(index, 1);
      }
    }
    return this;
  }


  asJson() {

    const nodes = this.subNodes && this.subNodes.map(child => {
      return child.asJson();
    });

    const result = {
      ruleID: this.ruleID,
      label: this.label,
      operation: this.operation,
      stipulation: this.stipulation,
      sentenceLinks: this.sentenceLinks,
      nodes
    };
    return result;
  }

}

export class LaDecisionRoot extends LaDecisionNode {
  constructor(properties?: any) {
    super(properties);
  }

  asJson() {
    return super.asJson();
  }

}
