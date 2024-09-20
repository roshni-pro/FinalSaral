import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PocverificationComponent } from './pocverification.component';

describe('PocverificationComponent', () => {
  let component: PocverificationComponent;
  let fixture: ComponentFixture<PocverificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PocverificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PocverificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
