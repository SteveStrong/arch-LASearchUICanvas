import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeekcontextComponent } from '../peekcontext.component';

describe('PeekcontextComponent', () => {
  let component: PeekcontextComponent;
  let fixture: ComponentFixture<PeekcontextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeekcontextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeekcontextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
