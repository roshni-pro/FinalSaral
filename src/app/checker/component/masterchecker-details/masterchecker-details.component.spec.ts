import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MastercheckerDetailsComponent } from './masterchecker-details.component';

describe('MastercheckerDetailsComponent', () => {
  let component: MastercheckerDetailsComponent;
  let fixture: ComponentFixture<MastercheckerDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MastercheckerDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MastercheckerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
