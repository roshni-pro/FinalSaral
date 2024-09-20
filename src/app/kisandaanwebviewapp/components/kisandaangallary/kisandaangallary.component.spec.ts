import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KisandaangallaryComponent } from './kisandaangallary.component';

describe('KisandaangallaryComponent', () => {
  let component: KisandaangallaryComponent;
  let fixture: ComponentFixture<KisandaangallaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KisandaangallaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KisandaangallaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
