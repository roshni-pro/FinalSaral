import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MastercheckerComponent } from './masterchecker.component';

describe('MastercheckerComponent', () => {
  let component: MastercheckerComponent;
  let fixture: ComponentFixture<MastercheckerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MastercheckerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MastercheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
