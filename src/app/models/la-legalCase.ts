import { LaAtom } from './la-atom';
import { LaParagraph } from './la-paragraph';
import { LaSentence } from './la-sentence';
import { LaUser } from './la-user';

import { LaDecisionNode, LaDecisionRoot } from './la-decisionNode';
import { LaUploadedCase, LaCaseCoreInfo } from './la-caseDirectoryItem';
import { getLocaleDateTimeFormat } from '@angular/common';

import { Tools } from '../shared';

export class LaLegalCase extends LaAtom {
  caseInfo: LaCaseCoreInfo;
  caseNumber: string;
  text = '';

  private paragraphLookup = {};
  paragraphs: Array<LaParagraph> = new Array<LaParagraph>();

  private sentenceLookup = {};
  sentences: Array<LaSentence> = new Array<LaSentence>();

  private decisionLookup = {};
  decisionRoot: LaDecisionRoot;

  constructor(properties?: any) {
    super(properties);
  }

  addSentence(item: LaSentence): LaSentence {
    this.sentences.push(item);
    return item;
  }

  findOrCreateParagraph(name: string) {
    let result = this.paragraphLookup[name];
    if (!result) {
      result = new LaParagraph({
        caseNumber: this.caseNumber,
        paragraphNumber: name
      });
      this.paragraphs.push(result);
      this.paragraphLookup[name] = result;
    }
    return result;
  }

  createParagraphs(list: Array<LaSentence>) {
    this.sentences = list;

    list.forEach(item => {
      const paraNum = item.paragraphNumber;
      const paragraph = this.findOrCreateParagraph(paraNum);
      paragraph.addSentence(item);

      this.sentenceLookup[item.sentID] = item;
    });
    this.paragraphs = this.paragraphs.sort((a, b) => {
      return a.id - b.id;
    });

    this.paragraphs.forEach(para => {
      para.sortSentences();
    });
    return this.paragraphs;
  }

  findParagraph(previous: LaSentence): LaParagraph {
    const paraNum = previous.paragraphNumber;
    const next = this.findOrCreateParagraph(paraNum);
    return next;
  }

  getNextSentence(previous: LaSentence): LaSentence {
    const key = previous.sentID;
    const id = previous.id + 1;
    const target = `${previous.caseNumber}P${previous.paragraphNumber}S${id}`;
    const next = this.sentences.find(item => item.sentID == target);
    return next;
  }

  // maybe do a soft delete
  deleteSentence(obj: LaSentence) {
    const index = this.sentences.indexOf(obj);
    if (index > -1) {
      this.sentences.splice(index, 1);
    }

    const paraNum = obj.paragraphNumber;
    const paragraph = this.findOrCreateParagraph(paraNum);
    paragraph.deleteSentence(obj);
  }


  splitText(text: string, subText: string) {
    let length = subText.length;
    let start = text.indexOf(subText);

    // try to make adjustment for poor selection
    if (start < 3) {
      length += start;
      start = 0;
    }

    const end = start + length;

    const first = text.substring(0, start);
    const last = text.substring(end);

    return { first, last };
  }

  splitSentence(sentence, subText: string, rhetClass: string): LaParagraph {
    const name = sentence.paragraphNumber;
    const paragraph = this.paragraphLookup[name] as LaParagraph;
    const caseNumber = sentence.caseNumber;

    sentence.clearPrediction();

    if (sentence.text === subText || subText === '') {
      sentence.rhetClass = rhetClass;
      return paragraph;
    }

    const ogText = sentence.text;
    const ogRhetClass = sentence.rhetClass;

    // we have the split
    const { first, last } = this.splitText(ogText, subText);

    const id = sentence.id;
    if (first) {
      sentence.text = first;

      const insert = new LaSentence({
        text: subText,
        caseNumber,
        paragraphNumber: name,
        rhetClass,
        id: id + 0.1
      });
      paragraph.addSentence(insert);
    } else {
      sentence.text = subText;
      sentence.rhetClass = rhetClass;
    }

    if (last) {
      const tail = new LaSentence({
        text: last,
        caseNumber,
        paragraphNumber: name,
        rhetClass: ogRhetClass,
        id: id + 0.2
      });
      paragraph.addSentence(tail);
    }

    paragraph.renumSentences();
    this.refreshSentences();
    return paragraph;
  }

  refreshSentences() {
    const refresh = new Array<LaSentence>();
    this.paragraphs.forEach(para => {
      para.sentences.forEach(sent => {
        refresh.push(sent);
      });
    });

    this.paragraphs.forEach(para => {
      para.clearSentences();
    });
    this.createParagraphs(refresh);
  }

  resolveSentenceKeys(list): Array<LaSentence> {
    const result = new Array<LaSentence>();
    list &&
      list.forEach(item => {
        const found = this.sentenceLookup[item];
        if (found) {
          result.push(found);
        }
      });
    return result;
  }

  resolveDecisionKeys(list): Array<LaDecisionNode> {
    const result = new Array<LaDecisionNode>();
    list &&
      list.forEach(item => {
        const found = this.decisionLookup[item];
        if (found) {
          result.push(found);
        }
      });
    return result;
  }

  attachDecisionRoot(root: LaDecisionRoot) {
    this.decisionLookup = {};
    this.attachDecision(root);
    this.decisionRoot = root;
  }

  private attachDecision(decision: LaDecisionNode) {
    this.decisionLookup[decision.ruleID] = decision;
    decision.subNodes &&
      decision.subNodes.forEach(item => {
        this.attachDecision(item);
      });
  }

  private getDateTime() {
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    let dateTime = date + ' ' + time;
    dateTime = today.toISOString(); // .split('T')[0]
    return dateTime;
  }

  setCaseInfo(props) {
    this.caseInfo = new LaCaseCoreInfo(props);
  }

  createCaseCoreInfo(props: any, pattern?: string) {
    let info = new LaCaseCoreInfo({
      guidKey: Tools.generateUUID(),
      name: this.caseNumber,
      extension: '.json',
      version: '0000',
      owner: 'yourname@email.com',
      keywords: '',
      lastChange: this.getDateTime()
    });
    info = Object.assign(info, props);
    info.fileName = info.computeFileName(pattern);
    return info;
  }

  getCaseInfo(props: any, pattern: string= '') {
    if ( !this.caseInfo ) {
      this.caseInfo = this.createCaseCoreInfo(props, pattern);
    }
    return this.caseInfo;
  }

  asJson() {
    
    // remove predictions from sentences
    const hash = [];
    this.sentences.forEach(item => {
      hash.push({ s: item, p: item.predictions });
      delete item.predictions;
    });


    const result = {
      caseNumber: this.caseNumber,
      caseInfo: this.getCaseInfo({}),
      ruleTree: this.decisionRoot.asJson(),
      sentences: this.sentences,
      text: this.text
    };

    // recover reference
    hash.forEach(item => {
      item.s.predictions = item.p;
    });

    return result;
  }

  asUploadedCase(user: LaUser, workspace: string, pattern: string): LaUploadedCase {
    
    // push the author into the case body
    this.caseInfo = Object.assign(this.caseInfo, {
      owner: user ? user.username : 'unknown',
      workspace: workspace ? workspace : 'development',
      lastChange: this.getDateTime()
    });
    
    const model = this.asJson();
    const uploadedCase = new LaUploadedCase(model.caseInfo);
    uploadedCase.fileName = model.caseInfo.computeFileName(pattern);
    uploadedCase.data = JSON.stringify(model);

    return uploadedCase;
  }
}
