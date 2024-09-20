import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DboySignedDesignSlipComponent } from './dboy-signed-design-slip.component';

describe('DboySignedDesignSlipComponent', () => {
  let component: DboySignedDesignSlipComponent;
  let fixture: ComponentFixture<DboySignedDesignSlipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DboySignedDesignSlipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DboySignedDesignSlipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
