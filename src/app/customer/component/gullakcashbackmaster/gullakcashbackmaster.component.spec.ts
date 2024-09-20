import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GullakcashbackmasterComponent } from './gullakcashbackmaster.component';

describe('GullakcashbackmasterComponent', () => {
  let component: GullakcashbackmasterComponent;
  let fixture: ComponentFixture<GullakcashbackmasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GullakcashbackmasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GullakcashbackmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
