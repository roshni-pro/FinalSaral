import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaylaterTabComponent } from './paylater-tab.component';

describe('PaylaterTabComponent', () => {
  let component: PaylaterTabComponent;
  let fixture: ComponentFixture<PaylaterTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaylaterTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaylaterTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
