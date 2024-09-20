import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CityService } from 'app/shared/services/city.service';
import { CustomerService } from 'app/shared/services/customer.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { PepolePilotService } from 'app/shared/services/pepole-pilot.service';
import { PickerService } from 'app/shared/services/picker/picker.service';
import { VehicleService } from 'app/shared/services/vehicle.service';
import { environment } from 'environments/environment';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';
import { AgentcomissionsetcitywiseService } from 'app/shared/services/agentcomissionsetcitywise.service';


@Component({
  selector: 'app-damagestock-item',
  templateUrl: './damagestock-item.component.html',
  styleUrls: ['./damagestock-item.component.scss']
})
export class DamagestockItemComponent implements OnInit {

  cols: any[];
  colmns:any[];
  dataAdd: any;
  blocked: boolean;
  file: any;
  baseURL: any;
  totalRecords: number;
  cityList: any[];
  getDataList: any;
  isItemdetail: boolean;
  IshowAdd: boolean = true;
  IshowEdit: boolean = true;
  @Input() Id: any;
  isInvalid: boolean = false;
  isdetails :boolean = false;
  regions:any[];
  hubs:any[];
  hubval:any[];
  statusval:string;
  pageNum: number = 1;
  search:any[];
  CurrentDate: any;
  IsDisabled: boolean = false;
  DamageorderDetails:any;
  BuyerIds: any;
  selectedBuyer: any;
  exportData:any;
  constructor(private agentcomission: AgentcomissionsetcitywiseService,private _service: VehicleService, private router: Router, private customerService: CustomerService, private route: ActivatedRoute, private exportService: ExportServiceService, private cityService: CityService, private messageService: MessageService, private datepipe: DatePipe, private pickerservice: PickerService) 
  {
    this.dataAdd = {}; this.baseURL = environment.apiURL;
    this.CurrentDate = moment(new Date()).format('MM/DD/YYYY');
  }
  
  ngOnInit() {
  
    this.cols = [
      { field: 'ItemMultiMRPId', header: 'ItemIdMultiMrpId' },
      { field: 'WarehouseName', header: 'Warehouse Name' },
      { field: 'ItemNumber', header: 'Item Number' },
      { field:'ItemName', header: 'Item Name' },
      { field: 'ABCClassification', header: 'ABC Classification' },
      { field: 'UnitPrice', header: 'Unit Price' },
      { field: 'ReasonToTransfer', header: 'Reason To Transfer' },
      { field: 'DamageInventory', header: 'Damage Inventory' },
      { field: 'CreatedDate', header: 'Created' }, 
      { field: 'Action', header: 'History' },
    ];
    this.colmns = [
      { field: 'ItemName', header: 'Item Name' },
      { field:'ABCClassification', header: 'ABC Classification' },
      { field: 'DamageInventory', header: 'Damage Inventory' },
      { field: 'InwordQty', header: 'Inword Qty' },
      { field: 'OutwordQty', header: 'Outword Qty' },
      { field: 'OdOrPoId', header: 'OdOrPoId' },
      { field: 'ReasonToTransfer', header: 'Reason to Transfer' }, 
      { field: 'WarehouseName', header: 'WareHouse Name' },
      { field: 'UserName', header: 'Edit By' }, 
      { field: 'CreatedDate', header: 'Date' },
    ];
    this.IsDisabled = false;
    this.IshowAdd = true;
    this.IshowEdit = false;
    this.Id = Number(this.route.snapshot.paramMap.get("Id"));
    this.cityService.GetAllWarehouse().subscribe(result => {
      this.cityList = result;
      console.log('-------', result);
    })
    if (this.Id != 0) {

      this._service.GetStockListById(this.Id).subscribe(res => {
        this.dataAdd = res;
        this.IsDisabled = true;
        this.dataAdd.WarehouseId = res.WarehouseId;
        this.dataAdd.Cityid = res.CityId;
        this.getHubVal(res.CityId)
        this.IshowAdd = false;
        this.IshowEdit = true;
        console.log('this.dataAdd',this.dataAdd);
      });
    }

  }

  getHubVal(id) {
    this.hubval = id;
    console.log('hub',this.hubval);
  }
  
    Search() {
    this.onPanelHide();
    this.cityService.GetStockData(this.BuyerIds).subscribe(x => {
     console.log('searchdata',x);
      this.search = x.damagest;
      this.totalRecords = x.total_count;
    })
  }
  Detail(i,itemno,warehouseid) {
    this.getDataList = null;
    this.isItemdetail = true;
    this.blocked = true;

    this.pickerservice.GetOrderHistory(i,itemno,warehouseid,this.pageNum).subscribe(x => {

      this.getDataList = x;
      this.DamageorderDetails=x.ordermaster;
      this.blocked = false;      
      console.log('this.getDataList',this.getDataList);
      this.isdetails = true;
      console.log('isdetails',this.isdetails)
    });
  }
  onPanelHide() {
    this.BuyerIds = []
    console.log("this.selectedWH");
    console.log(this.selectedBuyer);
    for (var i in this.selectedBuyer) {
      this.BuyerIds.push(this.selectedBuyer[i].WarehouseId)
    }
  }
  export()
  {   debugger;
    console.log('this.BuyerIds',this.BuyerIds);
    
      this.agentcomission.exportStockwise(this.BuyerIds).subscribe(result => { 
        console.log(result)
      this.exportData =  result ;
      this.exportService.exportAsExcelFile(this.exportData.ordermasterHistory, 'StockData'); 
    })
  }

}