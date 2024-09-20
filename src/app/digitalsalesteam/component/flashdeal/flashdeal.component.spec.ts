import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashdealComponent } from './flashdeal.component';

describe('FlashdealComponent', () => {
  let component: FlashdealComponent;
  let fixture: ComponentFixture<FlashdealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlashdealComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashdealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
