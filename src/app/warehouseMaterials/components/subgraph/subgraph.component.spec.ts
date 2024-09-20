import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubgraphComponent } from './subgraph.component';

describe('SubgraphComponent', () => {
  let component: SubgraphComponent;
  let fixture: ComponentFixture<SubgraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubgraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubgraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
