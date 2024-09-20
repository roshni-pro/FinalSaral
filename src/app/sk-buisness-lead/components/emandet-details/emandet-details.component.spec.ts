import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmandetDetailsComponent } from './emandet-details.component';

describe('EmandetDetailsComponent', () => {
  let component: EmandetDetailsComponent;
  let fixture: ComponentFixture<EmandetDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmandetDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmandetDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
