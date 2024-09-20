import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostreportComponent } from './costreport.component';

describe('CostreportComponent', () => {
  let component: CostreportComponent;
  let fixture: ComponentFixture<CostreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
