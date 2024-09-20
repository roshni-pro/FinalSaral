import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BuyerForecastUploadComponent } from './buyer-forecast-upload.component';


describe('BuyerForecastUploadComponent', () => {
  let component: BuyerForecastUploadComponent;
  let fixture: ComponentFixture<BuyerForecastUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyerForecastUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerForecastUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
