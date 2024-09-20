import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuisnessInfoComponent } from './buisness-info.component';

describe('BuisnessInfoComponent', () => {
  let component: BuisnessInfoComponent;
  let fixture: ComponentFixture<BuisnessInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuisnessInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuisnessInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
