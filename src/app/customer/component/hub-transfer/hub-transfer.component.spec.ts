import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HubTransferComponent } from './hub-transfer.component';

describe('HubTransferComponent', () => {
  let component: HubTransferComponent;
  let fixture: ComponentFixture<HubTransferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HubTransferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HubTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
