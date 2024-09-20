import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GullakComponent } from './gullak.component';

describe('GullakComponent', () => {
  let component: GullakComponent;
  let fixture: ComponentFixture<GullakComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GullakComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GullakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
