import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesAppBeatEditComponent } from './sales-app-beat-edit.component';

describe('SalesAppBeatEditComponent', () => {
  let component: SalesAppBeatEditComponent;
  let fixture: ComponentFixture<SalesAppBeatEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesAppBeatEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesAppBeatEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
