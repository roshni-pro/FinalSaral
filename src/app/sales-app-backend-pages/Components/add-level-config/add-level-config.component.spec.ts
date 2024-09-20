import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLevelConfigComponent } from './add-level-config.component';

describe('AddLevelConfigComponent', () => {
  let component: AddLevelConfigComponent;
  let fixture: ComponentFixture<AddLevelConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLevelConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLevelConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
