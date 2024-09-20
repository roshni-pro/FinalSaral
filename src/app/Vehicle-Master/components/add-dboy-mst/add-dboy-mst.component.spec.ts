import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDboyMstComponent } from './add-dboy-mst.component';

describe('AddDboyMstComponent', () => {
  let component: AddDboyMstComponent;
  let fixture: ComponentFixture<AddDboyMstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDboyMstComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDboyMstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
