import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerkisanwebviewComponent } from './customerkisanwebview.component';

describe('CustomerkisanwebviewComponent', () => {
  let component: CustomerkisanwebviewComponent;
  let fixture: ComponentFixture<CustomerkisanwebviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerkisanwebviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerkisanwebviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
