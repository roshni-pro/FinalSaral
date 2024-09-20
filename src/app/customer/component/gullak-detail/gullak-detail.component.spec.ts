import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GullakDetailComponent } from './gullak-detail.component';

describe('GullakDetailComponent', () => {
  let component: GullakDetailComponent;
  let fixture: ComponentFixture<GullakDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GullakDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GullakDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
