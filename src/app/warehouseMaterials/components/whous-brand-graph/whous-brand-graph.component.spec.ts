import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhousBrandGraphComponent } from './whous-brand-graph.component';

describe('WhousBrandGraphComponent', () => {
  let component: WhousBrandGraphComponent;
  let fixture: ComponentFixture<WhousBrandGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhousBrandGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhousBrandGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
