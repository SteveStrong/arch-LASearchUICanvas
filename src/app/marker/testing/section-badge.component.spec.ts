import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionBadgeComponent } from '../section-badge.component';

describe('SectionBadgeComponent', () => {
  let component: SectionBadgeComponent;
  let fixture: ComponentFixture<SectionBadgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionBadgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
