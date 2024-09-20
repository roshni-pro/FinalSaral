import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedispatchorderapprovalComponent } from './redispatchorderapproval.component';

describe('RedispatchorderapprovalComponent', () => {
  let component: RedispatchorderapprovalComponent;
  let fixture: ComponentFixture<RedispatchorderapprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedispatchorderapprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedispatchorderapprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
