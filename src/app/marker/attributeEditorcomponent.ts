import { Component, OnInit, Input, TemplateRef } from '@angular/core';

import { LaSentence } from '../models';
import { LaAttributionRelation } from '../models/la-attributionRelation';
import { EmitterService } from '../shared/emitter.service';

import { LegalCaseService } from '../models/legal-case.service';
import { PredictionService } from '../models/prediction.service';

@Component({
  selector: 'app-attributeEditor',
  templateUrl: './attributeEditor.component.html'
})
export class AttributeEditorComponent implements OnInit {




  constructor(
    private lService: LegalCaseService,
    private predict: PredictionService) {
    }
  @Input() sentence: LaSentence;
  attribution: LaAttributionRelation;



  // code for cue

  private _editCueText = false;

  // code for subject

  private _editSubjectText = false;

  // code for object

  private _editObjectText = false;


  getSentenceRoles(): string[] {
    const roles = this.lService.getSentenceRoles();
    roles.shift();
    return roles;
  }

  getAttributionRoles(): string[] {
    const roles = this.lService.getAttributionRoles();
    return roles;
  }

  getPolarityValues(): string[] {
    const roles = this.lService.getPolarityValues();
    return roles;
  }

  ngOnInit() {
    if ( this.sentence.hasAttributionRelation()) {
      this.attribution = this.sentence.getCurrentAttributionRelation();
    } else {
      this.attributionAdd();
    }
  }

  canShowPolarity(obj) {
    this.setCurrentAttribution(obj);
    return this.attribution.type == 'Finding';
  }

  deleteItem(obj) {
    this.lService.markAsDirty();
    this.sentence.removeAttributionRelation(obj);
    this.attribution = this.sentence.getCurrentAttributionRelation();
  }


  canEditAttribution() {
    return this.sentence.hasClassification();
  }

  attributionAdd() {
    this.lService.markAsDirty();
    this.attribution = new LaAttributionRelation();
    this.attribution.setTypeFromSentence(this.sentence.getRhetClass());
    this.sentence.addAttributionRelation(this.attribution);
  }

  getSelectedText() {
      let text = '';
      if (window.getSelection) {
        text = window.getSelection().toString();
      }
      return text;
  }

  isCurrentAttribution(obj) {
    return this.attribution === obj;
  }

  setCurrentAttribution(obj) {
    this.attribution = obj;
  }

  itemClear(obj) {
    this.attribution = obj;
    this.attribution.clear();
  }

  selectSentenceType(obj, type: string): void {
    this.lService.markAsDirty();
    this.sentence = obj;
    this.sentence.rhetClass = type;
  }

  selectAttributionType(obj, type: string): void {
    this.lService.markAsDirty();
    this.attribution = obj;
    this.attribution.type = type;
    this.attribution.polarityValue = '';
  }

  selectPolarityValue(obj, value: string): void {
    this.lService.markAsDirty();
    this.attribution = obj;
    this.attribution.polarityValue = value;
  }

  doPredictSentence(sentence: LaSentence) {
    const text = sentence.text;
    this.predict.predictSentenceDetails(text).subscribe( item => {
      const result = item.classification as string;
      sentence.rhetClassPredict = result;
    });
    return true;
  }

  isUnclassified() {
    return this.sentence.isUnclassified();
  }
  readonlyCueText(obj) {
    if ( this.isCurrentAttribution(obj) ) {
      return !this._editCueText;
    }
    return true;
  }
  editCueText(obj) {
    if ( this.isCurrentAttribution(obj) ) {
      return this._editCueText;
    }
    return false;
  }
  editCue(obj) {
    this.attribution = obj;
    this._editCueText = true;
  }
  readCue(obj) {
    this.lService.markAsDirty();
    this.attribution = obj;
    this._editCueText = false;
  }

  itemCue(obj) {
    this.attribution = obj;
    this.attributionCue();
  }
  attributionCue() {
    this.lService.markAsDirty();
    this.attribution.cue = this.getSelectedText();
  }
  readonlySubjectText(obj) {
    if ( this.isCurrentAttribution(obj) ) {
      return !this._editSubjectText;
    }
    return true;
  }
  editSubjectText(obj) {
    if ( this.isCurrentAttribution(obj) ) {
      return this._editSubjectText;
    }
    return false;
  }
  editSubject(obj) {
    this.attribution = obj;
    this._editSubjectText = true;
  }
  readSubject(obj) {
    this.lService.markAsDirty();
    this.attribution = obj;
    this._editSubjectText = false;
  }

  itemSubject(obj) {
    this.attribution = obj;
    this.attributionSubject();
  }
  attributionSubject() {
    this.lService.markAsDirty();
    this.attribution.subject = this.getSelectedText();
  }
  readonlyObjectText(obj) {
    if ( this.isCurrentAttribution(obj) ) {
      return !this._editObjectText;
    }
    return true;
  }
  editObjectText(obj) {
    if ( this.isCurrentAttribution(obj) ) {
      return this._editObjectText;
    }
    return false;
  }

  editObject(obj) {
    this.attribution = obj;
    this._editObjectText = true;
  }
  readObject(obj) {
    this.lService.markAsDirty();
    this.attribution = obj;
    this._editObjectText = false;
  }

  itemObject(obj) {
    this.attribution = obj;
    this.attributionObject();
  }


  attributionObject() {
    this.lService.markAsDirty();
    this.attribution.object = this.getSelectedText();
  }


  attributionDone() {
    this.sentence.deleteEmptyAttributions();
    EmitterService.broadcastCommand(this, 'CloseAll');
    // this.lService.markAsDirty();
  }

  doClose() {
    this.sentence.deleteEmptyAttributions();
    EmitterService.broadcastCommand(this, 'CloseAll');
  }
}
