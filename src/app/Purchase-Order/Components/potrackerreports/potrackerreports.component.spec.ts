import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PotrackerreportsComponent } from './potrackerreports.component';

describe('PotrackerreportsComponent', () => {
  let component: PotrackerreportsComponent;
  let fixture: ComponentFixture<PotrackerreportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PotrackerreportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PotrackerreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
