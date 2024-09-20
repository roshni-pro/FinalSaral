import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EwayPageComponent } from './eway-page.component';

describe('EwayPageComponent', () => {
  let component: EwayPageComponent;
  let fixture: ComponentFixture<EwayPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EwayPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EwayPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
