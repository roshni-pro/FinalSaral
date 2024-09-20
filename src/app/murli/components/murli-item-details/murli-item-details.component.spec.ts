import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MurliItemDetailsComponent } from './murli-item-details.component';

describe('MurliItemDetailsComponent', () => {
  let component: MurliItemDetailsComponent;
  let fixture: ComponentFixture<MurliItemDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MurliItemDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MurliItemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
