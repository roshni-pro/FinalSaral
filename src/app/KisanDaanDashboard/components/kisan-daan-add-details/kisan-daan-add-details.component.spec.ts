import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KisanDaanAddDetailsComponent } from './kisan-daan-add-details.component';

describe('KisanDaanAddDetailsComponent', () => {
  let component: KisanDaanAddDetailsComponent;
  let fixture: ComponentFixture<KisanDaanAddDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KisanDaanAddDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KisanDaanAddDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
