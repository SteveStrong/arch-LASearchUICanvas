import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinerComponent } from '../joiner.component';

describe('JoinerComponent', () => {
  let component: JoinerComponent;
  let fixture: ComponentFixture<JoinerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
