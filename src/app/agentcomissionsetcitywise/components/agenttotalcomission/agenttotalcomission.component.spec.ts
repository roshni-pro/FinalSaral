import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgenttotalcomissionComponent } from './agenttotalcomission.component';

describe('AgenttotalcomissionComponent', () => {
  let component: AgenttotalcomissionComponent;
  let fixture: ComponentFixture<AgenttotalcomissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgenttotalcomissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgenttotalcomissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
