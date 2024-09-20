import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TkOnskAppdataComponent } from './tk-onsk-appdata.component';

describe('TkOnskAppdataComponent', () => {
  let component: TkOnskAppdataComponent;
  let fixture: ComponentFixture<TkOnskAppdataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TkOnskAppdataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TkOnskAppdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
