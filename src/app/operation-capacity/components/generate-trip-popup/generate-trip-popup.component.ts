import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GenerateTripParam } from 'app/operation-capacity/interface/generate-trip-paramDC';
import { DeliveryDashboardService } from 'app/operation-capacity/services/delivery-dashboard.service';
import { LoaderService } from 'app/shared/services/loader.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-generate-trip-popup',
  templateUrl: './generate-trip-popup.component.html',
  styleUrls: ['./generate-trip-popup.component.scss']
})
export class GenerateTripPopupComponent implements OnInit {
  selectedTripType: any;
  tripTypeText: string;
  isOpen: boolean = false;
  @Input() data: any;
  @Output() isdetailsclose = new EventEmitter<any>();
  @Output() closeGenerateTripPopup = new EventEmitter();
  CustomerId: any;
  isInValid: boolean = false;
  skcodeList: any;
  blocked: boolean = false;
  tripType: any;
  generateTripParamDC: GenerateTripParam;
  constructor(private deliveryDashboardService: DeliveryDashboardService
    , private loaderService: LoaderService
    , private messageService: MessageService) 
    { this.tripType = {}; }

  ngOnInit() {
    this.CustomerId = null;
    this.selectedTripType = null;
  }
  OpenTrip(tripType) {
    debugger
    this.isInValid = false;
    this.tripType;
    this.CustomerId = null;
    this.selectedTripType = tripType;
    if (this.selectedTripType == 'City') {
      this.isOpen = false;
      // this.isdetailsclose.emit(this.selectedTripType);
    } else if (this.selectedTripType == 'Damage'||this.selectedTripType == 'NonSellable'  ) {
      this.isOpen = false;
    } 
    
    else {
      if (this.selectedTripType == 'SKP Owner') {
        this.tripTypeText = 'SKP Orders'
      } else if (this.selectedTripType == 'KPP') {
        this.tripTypeText = 'KPP Orders'
      }
      this.isOpen = true;
      this.blocked = true;
      this.deliveryDashboardService.searchSKP_KPP_OwnerList(this.data.warehouseId, this.selectedTripType).subscribe(x => {
        this.skcodeList = x;
        this.blocked = false;
      })
    }
  }
  createTripNew() {
    debugger
    if (((this.selectedTripType == 'SKP Owner' || this.selectedTripType == 'KPP') && (this.CustomerId > 0 && this.selectedTripType != null)) || (this.selectedTripType == 'City' || this.selectedTripType == 'Damage'||this.selectedTripType == 'NonSellable'))
     {
      // TriptypeEnum City = 0,      SKP = 1,      KPP = 2,      Damage_Expiry = 3 
      if (this.selectedTripType == 'City') { this.selectedTripType = 0; }
      if (this.selectedTripType == 'SKP Owner') { this.selectedTripType = 1; }
      if (this.selectedTripType == 'KPP') { this.selectedTripType = 2; }
      if (this.selectedTripType == 'Damage') { this.selectedTripType = 3; }      
      if (this.selectedTripType == 'NonSellable') { this.selectedTripType = 4; }
      
      if (this.selectedTripType > 0) {
        this.loaderService.loading(true);
        this.generateTripParamDC = {
          CustomerId: this.CustomerId,
          TripType: this.selectedTripType,
          WarehouseId: this.data.warehouseId
        }
        this.deliveryDashboardService.generateNonLastMileTrip(this.generateTripParamDC).subscribe(x => {

          this.loaderService.loading(false);
          let utilityResult = x;
          console.log('city trip result: ', utilityResult);
          if (!utilityResult.IsSuceess) {
            this.messageService.add({ key: 'main', severity: 'info', summary: 'error', detail: utilityResult.ErrorMessage });
          }
          else {
            this.messageService.add({ key: 'main', severity: 'info', summary: 'success', detail: utilityResult.SuccessMessage });
            this.closeGenerateTripPopup.emit();
          }


        })
      } else {
        if (this.data.warehouseId) {
          this.loaderService.loading(true);
          this.deliveryDashboardService.IsRunningUtility(this.data.warehouseId).subscribe(x => {

            let utilityResult = x;
            console.log('city trip result: ', utilityResult);
            if (!utilityResult.IsSuceess) {
              this.messageService.add({ key: 'main', severity: 'info', summary: 'error', detail: utilityResult.ErrorMessage });
            }
            else {
              this.messageService.add({ key: 'main', severity: 'info', summary: 'success', detail: utilityResult.SuccessMessage });
              this.closeGenerateTripPopup.emit();
            }
            this.loaderService.loading(false);
          });
        } else {
          this.messageService.add({ key: 'main', severity: 'info', summary: 'error', detail: 'Please select Warehouse!!' });
        }
      }
    } else {
      this.isInValid = true;
    }
  }

  cancel() {
    this.closeGenerateTripPopup.emit();
  }
}
