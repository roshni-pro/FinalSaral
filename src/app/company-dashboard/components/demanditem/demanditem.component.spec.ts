import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemanditemComponent } from './demanditem.component';

describe('DemanditemComponent', () => {
  let component: DemanditemComponent;
  let fixture: ComponentFixture<DemanditemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemanditemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemanditemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
