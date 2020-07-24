import { Component, OnInit, Input, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Toast, EmitterService, iPayloadWrapper } from '../shared';

import { LaLegalCase, LaCaseCoreInfo } from '../models';

/// very smart forms from data
// https://juristr.com/blog/2017/10/demystify-dynamic-angular-forms/
// https://mdbootstrap.com/docs/angular/forms/inputs/

// https://getbootstrap.com/docs/4.0/components/forms/


@Component({
  selector: 'app-case-title',
  templateUrl: './case-title.component.html',
  styleUrls: ['./case-title.component.scss']
})
export class CaseTitleComponent implements OnInit, OnDestroy, OnChanges {
  @Input() caseInfo: LaCaseCoreInfo;
  panelOpenState = false;

  caseInfoForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

  resetCaseInfo(caseInfo) {
    this.caseInfoForm = this.formBuilder.group({
      fileName: [caseInfo.fileName],
      version: [caseInfo.version],
      title: [caseInfo.title],
      description: [caseInfo.description],
      notes: [caseInfo.notes],
      keywords: [caseInfo.keywords],
      owner: [caseInfo.owner],
      name: [caseInfo.name],
      extension: [caseInfo.extension],
      lastChange: [caseInfo.lastChange],

      folder: [caseInfo.folder],
      guidKey: [caseInfo.guidKey]
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
        const change = changes[propName];
        this.resetCaseInfo(change.currentValue);
    }
 }

  ngOnInit() {
    this.resetCaseInfo(this.caseInfo);
  }

    // convenience getter for easy access to form fields
    get f() {
      return this.caseInfoForm.controls;
    }

    onSubmit() {
      const result = {
        fileName: this.f.fileName.value,
        version: this.f.version.value,
        title: this.f.title.value,
        description: this.f.description.value,
        notes: this.f.notes.value,
        keywords: this.f.keywords.value,
        owner: this.f.owner.value,
        name: this.f.name.value,
        extension: this.f.extension.value,
        lastChange: this.f.lastChange.value,

        folder: this.f.folder.value,
        guidKey: this.f.guidKey.value,
      };
      // const msg = JSON.stringify(result, undefined, 3);
      // Toast.success('captured ', msg);
      this.caseInfo.override(result);

      this.panelOpenState = false;
      EmitterService.broadcastCommand(this, 'SetDirty');
    }

    ngOnDestroy() {
      this.caseInfoForm = null;
      this.caseInfo = null;
    }

}
