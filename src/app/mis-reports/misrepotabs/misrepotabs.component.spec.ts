import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisrepotabsComponent } from './misrepotabs.component';

describe('MisrepotabsComponent', () => {
  let component: MisrepotabsComponent;
  let fixture: ComponentFixture<MisrepotabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisrepotabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisrepotabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
