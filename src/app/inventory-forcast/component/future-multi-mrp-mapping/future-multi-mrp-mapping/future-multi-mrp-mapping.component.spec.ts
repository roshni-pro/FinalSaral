import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FutureMultiMrpMappingComponent } from './future-multi-mrp-mapping.component';

describe('FutureMultiMrpMappingComponent', () => {
  let component: FutureMultiMrpMappingComponent;
  let fixture: ComponentFixture<FutureMultiMrpMappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FutureMultiMrpMappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FutureMultiMrpMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
