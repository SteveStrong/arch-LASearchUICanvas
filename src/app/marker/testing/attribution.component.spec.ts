import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributeEditorComponent } from '../attributeEditorcomponent';

describe('AttributionComponent', () => {
  let component: AttributeEditorComponent;
  let fixture: ComponentFixture<AttributeEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttributeEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttributeEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
