import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DamagestockComponent } from './damagestock.component';

describe('DamagestockComponent', () => {
  let component: DamagestockComponent;
  let fixture: ComponentFixture<DamagestockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DamagestockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DamagestockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
