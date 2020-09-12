import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentSetComponent } from '../document-set.component';

describe('DocumentSetComponent', () => {
  let component: DocumentSetComponent;
  let fixture: ComponentFixture<DocumentSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
