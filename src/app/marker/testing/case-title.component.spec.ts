import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseTitleComponent } from '../case-title.component';

describe('CaseTitleComponent', () => {
  let component: CaseTitleComponent;
  let fixture: ComponentFixture<CaseTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
