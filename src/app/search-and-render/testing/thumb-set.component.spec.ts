import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThumbSetComponent } from '../thumb-set.component';

describe('ThumbSetComponent', () => {
  let component: ThumbSetComponent;
  let fixture: ComponentFixture<ThumbSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThumbSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThumbSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
