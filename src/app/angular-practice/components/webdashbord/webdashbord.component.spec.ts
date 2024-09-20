import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebdashbordComponent } from './webdashbord.component';

describe('WebdashbordComponent', () => {
  let component: WebdashbordComponent;
  let fixture: ComponentFixture<WebdashbordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebdashbordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebdashbordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
