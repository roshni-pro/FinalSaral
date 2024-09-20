import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebviewappComponent } from './webviewapp.component';

describe('WebviewappComponent', () => {
  let component: WebviewappComponent;
  let fixture: ComponentFixture<WebviewappComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebviewappComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebviewappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
