import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerProfileService } from 'app/customer/services/customer-profile.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.scss']
})
export class CustomerProfileComponent implements OnInit {
 @Input() customerData: any;
customerId : number;
blocked : boolean = false;
selectedTab : any;
custCategoryList : any;
custCompanyList : any;
custBrandList : any;
purchaseList : any;
IsActive : boolean;
callList : any;
visitList : any;
callandHistorySummaryDc : any;
isOpenCallHistorySummary : boolean = false;
@Output() isdetailsclose = new EventEmitter<boolean>();
isTelleyCaller : boolean = false;
  constructor( private router: Router,private activateRoute: ActivatedRoute,
    private _customerProfileService : CustomerProfileService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.customerData;
    console.log('customerData',this.customerData);
    
    this.getCallAndVisitHistoryDataGet();
    this.getTellyCallerData();
    // debugger;
    // this.activateRoute.paramMap.subscribe(params => {
      
    //   this.customerId = Number(params.get('custId'));
    //   if (this.customerId && this.customerId > 0) {
    //     this.blocked = true;
    //       this.blocked = false;
    //   } else {
    //     this.customerId = 0;
    //   }
    // })
  }
  getTellyCallerData()
  {
    this.blocked =true;
      this._customerProfileService.istellyCaller().subscribe(x=>
        {
          this.isTelleyCaller = x;
          this.blocked = false;
        })
  }
  getCallAndVisitHistoryDataGet()
  {
    // this.customerData.CustomerId = 70385;
    this.blocked = true;
    this._customerProfileService.callAndVisitHistoryDataGet(this.customerData.CustomerId).subscribe(x=>{
      this.callList = x.CallData;
      this.visitList = x.VisitData;
      // debugger;
      this.blocked = false;
    })
  }
  onTabChange(event) { //
    // debugger;
    console.log(event);
    if (event.index == 0) {
      this.selectedTab = 'Profile';
    } else if (event.index == 1) {
      this.selectedTab = 'Purchase';
    }
    else if (event.index == 2) {
      this.selectedTab = 'Back';
      this.onBack();
    }
  }
  onActionChange(event) { //
    // debugger;
    console.log(event);
    if (event.index == 0) {
      this.selectedTab = 'Calls';
    } else if (event.index == 1) {
      this.selectedTab = 'Visit';
    }
  }
  onClickView(data)
  {
    this.isOpenCallHistorySummary = false;
    // data.Id = 1;
    this.blocked = true;
    this._customerProfileService.callandVisitHistorySummaryGet(data.Id).subscribe(x=>{
      this.callandHistorySummaryDc = x;
      this.isOpenCallHistorySummary = true;
      this.blocked = false;
    })
  }
  onBack(){
    this.isdetailsclose.emit();
  }
  IsPhysicalVisit(rowdata) {
    // debugger;
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        if(rowdata.CheckOutReasonId > 0)
        {
        this.blocked = true;
        // this.Id = rowdata.Id;
        this._customerProfileService.isPhysiclVisit(rowdata.CheckOutReasonId, rowdata.IsPhysicalVisit).subscribe(result => {
          this.blocked = false;
          if (result) {                           
            this.messageService.add({ severity: 'success', summary: 'Your Request for Physically Visited is Activated Successfully!', detail: '' });         
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error!', detail: '' });
          }
        });
      }else{
        this.blocked = true;
        // this.Id = rowdata.Id;
        this._customerProfileService.customerProfilingInsertPhysicalVisit(rowdata.CustomerId).subscribe(result => {
          this.blocked = false;
          if (result) {                           
            this.messageService.add({ severity: 'success', summary: 'Your Request for Physically Visited is Activated Successfully!', detail: '' });         
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error!', detail: '' });
          }
        });
      }
      },
      reject: () => {
        rowdata.IsPhysicalVisit = !rowdata.IsPhysicalVisit;
        this.messageService.add({ severity: 'error', summary: 'Your Request for Physically Visit Process is Canceled!', detail: '' });
      }
    });
  }
}
