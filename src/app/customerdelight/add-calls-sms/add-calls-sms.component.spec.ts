import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCallsSmsComponent } from './add-calls-sms.component';

describe('AddCallsSmsComponent', () => {
  let component: AddCallsSmsComponent;
  let fixture: ComponentFixture<AddCallsSmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCallsSmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCallsSmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
