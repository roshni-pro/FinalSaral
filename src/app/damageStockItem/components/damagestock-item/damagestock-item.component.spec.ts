import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DamagestockItemComponent } from './damagestock-item.component';

describe('DamagestockItemComponent', () => {
  let component: DamagestockItemComponent;
  let fixture: ComponentFixture<DamagestockItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DamagestockItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DamagestockItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
