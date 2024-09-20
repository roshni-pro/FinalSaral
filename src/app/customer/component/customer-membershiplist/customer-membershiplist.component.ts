import { Component, OnInit, ViewChild } from '@angular/core';
import { PickerService } from 'app/shared/services/picker/picker.service';
import { Table } from 'primeng/table';
import { CustomerService } from 'app/shared/services/customer.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-customer-membershiplist',
  templateUrl: './customer-membershiplist.component.html',
  styleUrls: ['./customer-membershiplist.component.scss']
})
export class CustomerMembershiplistComponent implements OnInit {
  @ViewChild(Table, { static: false }) dataTableComponent: Table;
  data: any;
  blocked: boolean;
  warehouseList: any;
  custMemberShiplist:any[];
  totalRecords: number;
  ExportMemberShiplist:any[];

  constructor(private pickerservice: PickerService,private messageService: MessageService,
    private customerservice: CustomerService,private exportService: ExportServiceService) {
    this.data = {};
   }

  ngOnInit() {
    this.data.WarehouseId='';
    this.data.Active = '';
    this.totalRecords = null;
    this.blocked = true;
    this.pickerservice.GetAllWarehouse().subscribe(x => {
      this.warehouseList = x;
      this.blocked = false;
    });
    var datToPost= {
      Warehouseid: 0,
      IsActive: null,
      Skip: 0,
      Take: 10,
    }
    this.getmemberShiplist(datToPost);
  }

  getmemberShiplist(datToPost){
    this.blocked = true;
    this.customerservice.GetCustomerMembershiplist(datToPost).subscribe(result => {
      this.blocked = false;
      if (result.totalRecords > 0) {      
        this.custMemberShiplist = result.customerMembershiplist; 
        this.totalRecords = result.totalRecords;    
      }else{
        this.custMemberShiplist = [];
        this.totalRecords = 0;
        this.messageService.add({ severity: 'error', summary: 'No Records Found!', detail: '' });
      }
    })
  }

  load(event)
  {
    var datToPost= {
      Warehouseid: this.data.WarehouseId,
      IsActive:  this.data.Active,
      Skip: event.first,
      Take: event.rows ,
    }
    this.getmemberShiplist(datToPost);
  }

  allCustomer() {
    this.data = {};
    this.dataTableComponent.reset();
  }

  search(data){
    if (data.WarehouseId || data.Active) {
      var datToPost= {
        Warehouseid: data.WarehouseId,
        IsActive:  data.Active,
        Skip: 0,
        Take: 10,
      }
      this.getmemberShiplist(datToPost);
    }else{
      this.messageService.add({ severity: 'error', summary: 'Please Select atleast One feild', detail: '' });
    }
  }

  exportMemberShiplist(){
    var datToPost= {
      Warehouseid: this.data.WarehouseId,
      IsActive: this.data.Active,
      Skip: 0,
      Take:  this.totalRecords,
    }
    this.blocked = true;
    this.customerservice.GetCustomerMembershiplist(datToPost).subscribe(result => {
      this.blocked = false;
      if (result.totalRecords > 0) {      
        this.ExportMemberShiplist = result.customerMembershiplist; 
        let exportsheet=[];
        this.ExportMemberShiplist.forEach(element => {
          exportsheet.push(
            {
              MemberShipName:element.MemberShipName,
              Skcode:element.Skcode,
              ShopName:element.ShopName,
              StartDate:element.StartDate,
              EndDate:element.EndDate,
              IsActive:element.IsActive
          })
        });
        this.exportService.exportAsExcelFile(exportsheet, 'customerMembershiplist');
      }
    })
  }

}
