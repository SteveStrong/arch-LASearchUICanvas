import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecisionBadgeComponent } from '../decision-badge.component';

describe('DecisionBadgeComponent', () => {
  let component: DecisionBadgeComponent;
  let fixture: ComponentFixture<DecisionBadgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecisionBadgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecisionBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
