import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkingCapitalComponent } from './working-capital.component';

describe('WorkingCaptialComponent', () => {
  let component: WorkingCapitalComponent;
  let fixture: ComponentFixture<WorkingCapitalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkingCapitalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkingCapitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
