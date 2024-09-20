import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerProfileDc } from 'app/customer/interface/customer-profile-dc';
import { CustomerProfileSearchDC } from 'app/customer/interface/customer-profile-search-dc';
import { CustomerProfileService } from 'app/customer/services/customer-profile.service';
import { environment } from 'environments/environment';
import { event } from 'jquery';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-customer-detail-list',
  templateUrl: './customer-detail-list.component.html',
  styleUrls: ['./customer-detail-list.component.scss']
})
export class CustomerDetailListComponent implements OnInit {
  // searchdata : any;
  warehouseList : any;
  clusterList : any;
  blocked : boolean = false;
  // customerProfileList : any;
  customerProfileSearchDC : CustomerProfileSearchDC;
  customerProfileList : CustomerProfileDc[];
  skip : number= 0;
  take : number = 10;
  totalcount : number = 0;
  WarehouseId : number;
  selectedCluster : any;
  isTelleyCaller : boolean = false;
  constructor(private _customerProfileService : CustomerProfileService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) { //this.searchdata={};
    this.customerProfileSearchDC=
    {
      ClusterId : [],
      Keyword : '',
      skip : this.skip,
      take : this.take,
      WarehouseId : null
    }
  }

  ngOnInit() {
    this.getwarehouseList();
    this.getTellyCallerData();
  }
  getTellyCallerData()
  {
      this._customerProfileService.istellyCaller().subscribe(x=>
        {
          this.isTelleyCaller = x;
        })
  }
  getwarehouseList()
  {
    this.blocked = true;
    this._customerProfileService.getAllWarehouseNew().subscribe(x => {
      this.warehouseList = x;
      this.blocked = false;
      console.log('x:', x);
    });
  }
  getClusterlist(WarehouseId) {
    // debugger;
    this.customerProfileSearchDC.ClusterId = [];
    this.selectedCluster = null;
    this.blocked = true;
    this.customerProfileSearchDC.WarehouseId = WarehouseId.value;
    this._customerProfileService.getAllCluster(WarehouseId.value).subscribe(y => {
      this.clusterList = y;
      this.blocked = false;
      console.log('y:', y);
    });
  }
  onSearch()
  {
    this.customerProfileSearchDC.ClusterId = [];
    this.selectedCluster.forEach(element => {
      this.customerProfileSearchDC.ClusterId.push(element.ClusterId);
    });
    this.customerProfileSearchDC;
    if(this.customerProfileSearchDC.WarehouseId <= 0 && this.customerProfileSearchDC.ClusterId.length <= 0)
    {
      alert('Please Select Warehouse And Cluster Both!!');
    }else if(this.customerProfileSearchDC.WarehouseId <= 0)
    {
      alert('Please Select Warehouse!!');
    }else if(this.customerProfileSearchDC.ClusterId.length <= 0){
      alert('Please Select Clusters!!');
    }
    // debugger;
   this.load(event);
  }
  onExport()
  {
    this.blocked = true;
    this._customerProfileService.export(this.customerProfileSearchDC).subscribe(x=>
      {
        if(x != null)
        {
          window.open(environment.apiURL + x);
        }else{
          alert("Data is not found!!");
        }
        this.blocked = false;
      });
    
  }
  onExportAll()
  {
    this.blocked = true;
    this._customerProfileService.exportAll(this.customerProfileSearchDC).subscribe(x=>
      {
        if(x != null)
        {
          window.open(environment.apiURL + x);
        }else{
          alert("Data is not found!!");
        }
        this.blocked = false;
      });
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
  load(event) {
// debugger;
    // var Last = event.first ? event.first + event.rows : 20;
    // this.customerProfileSearchDC.skip = event.rows ? Last / event.rows : 0;
    this.customerProfileSearchDC.skip = event.first ? event.first : 0;
    this.customerProfileSearchDC.take = event.rows ? event.rows : 20;
    if(this.customerProfileSearchDC.WarehouseId > 0 && this.customerProfileSearchDC.ClusterId.length > 0)
    {
    this.blocked = true;
    this._customerProfileService.getProfilingList(this.customerProfileSearchDC).subscribe(x=>
      {
        // debugger;
        this.customerProfileList = x.customerProfileDcs;
        this.totalcount = x.totalRecords;
        this.blocked = false;
      })
    }
  }
  isView : boolean = false;
  customerData : any;
  onClickView(cust)
  {
    this.customerData = cust;
    this.isView = true;
    // this.router.navigateByUrl('layout/customer/customerProfile/' + cust.Id);
  }
  onCloseProfile()
  {
    this.isView = false;
    this.onSearch();
  }
  isOpenTellyCallerPopup : boolean = false;
  OrderId : any;
  onClickTellyCaller(cust)
  {
    this.OrderId = null;
    this.isOpenTellyCallerPopup = true;
  }
  onGetotp(OrderId)
  {
    if(OrderId.length > 0)
    {
      this.blocked = true;
      this._customerProfileService.getDigitalOtp(OrderId).subscribe(res=>
        {
          this.blocked = false;
          this.isOpenTellyCallerPopup = false;
          if(res.Status)
          {
            alert(res.Message);
          }
          else{
            alert(res.Message);
          }
        });
    }
  }

}
