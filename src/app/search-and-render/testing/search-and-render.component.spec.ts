import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchAndRenderComponent } from './search-and-render.component';

describe('SearchAndRenderComponent', () => {
  let component: SearchAndRenderComponent;
  let fixture: ComponentFixture<SearchAndRenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchAndRenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchAndRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
