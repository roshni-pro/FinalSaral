import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddinternaltransferitemComponent } from './addinternaltransferitem.component';

describe('AddinternaltransferitemComponent', () => {
  let component: AddinternaltransferitemComponent;
  let fixture: ComponentFixture<AddinternaltransferitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddinternaltransferitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddinternaltransferitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
