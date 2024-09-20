import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdddpotComponent } from './adddpot.component';

describe('AdddpotComponent', () => {
  let component: AdddpotComponent;
  let fixture: ComponentFixture<AdddpotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdddpotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdddpotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
