import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkBuisnessLeadComponent } from './sk-buisness-lead.component';

describe('SkBuisnessLeadComponent', () => {
  let component: SkBuisnessLeadComponent;
  let fixture: ComponentFixture<SkBuisnessLeadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkBuisnessLeadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkBuisnessLeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
