import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppHomeTileComponent } from './apphome-tile.component';



describe('AppHomeComponent', () => {
  let component: AppHomeTileComponent;
  let fixture: ComponentFixture<AppHomeTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppHomeTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppHomeTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
