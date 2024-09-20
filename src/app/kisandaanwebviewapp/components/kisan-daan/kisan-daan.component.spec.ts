import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KisanDaanComponent } from './kisan-daan.component';

describe('KisanDaanComponent', () => {
  let component: KisanDaanComponent;
  let fixture: ComponentFixture<KisanDaanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KisanDaanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KisanDaanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
