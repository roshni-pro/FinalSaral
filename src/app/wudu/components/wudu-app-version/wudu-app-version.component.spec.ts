import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WuduAppVersionComponent } from './wudu-app-version.component';

describe('WuduAppVersionComponent', () => {
  let component: WuduAppVersionComponent;
  let fixture: ComponentFixture<WuduAppVersionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WuduAppVersionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WuduAppVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
