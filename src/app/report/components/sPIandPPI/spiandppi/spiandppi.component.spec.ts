import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpiandppiComponent } from './spiandppi.component';

describe('SpiandppiComponent', () => {
  let component: SpiandppiComponent;
  let fixture: ComponentFixture<SpiandppiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpiandppiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpiandppiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
