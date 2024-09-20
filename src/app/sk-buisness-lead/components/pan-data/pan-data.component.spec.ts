import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanDataComponent } from './pan-data.component';

describe('PanDataComponent', () => {
  let component: PanDataComponent;
  let fixture: ComponentFixture<PanDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
