import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'app/shared/services/shopping-cart.service';
import { CallssmsService } from 'app/shared/services/callssms.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';

@Component({
  selector: 'app-address-update-req',
  templateUrl: './address-update-req.component.html',
  styleUrls: ['./address-update-req.component.scss']
})
export class AddressUpdateReqComponent implements OnInit {
  masterwarehouseList: any[];
  isOpenPopup: boolean = false;
  filterdata: any;
  PageList: any;
  totalRecords: number;
  ItemPerPage: number;
  PageNo: number;
  Status: number;
  updateData: any;
  IsDisabled: boolean;
  IsUpdateBtn: boolean;
  constructor(private _Service: ShoppingCartService, private CallssmsService: CallssmsService, private exportService: ExportServiceService,) {
    this.filterdata = {};
    this.updateData = {};
  }

  ngOnInit() {
    this.filterdata.status = -1;
    this.getWarehouse();
  }
  load(event) {
    var Last = event.first ? event.first + event.rows : 10
    this.ItemPerPage = event.rows
    this.PageNo = Last / event.rows

    this.filterdata.Skip = this.PageNo;
    this.filterdata.Take = this.ItemPerPage;
    if (this.filterdata.WarehouseId > 0) {
      this.CallssmsService.getAddressUpdateRequestList(this.filterdata).subscribe(result => {
        this.PageList = result.result;
        this.totalRecords = result.totalcount;
      });
    }
  }
  getWarehouse() {
    this._Service.GetAllWarehouse().subscribe(result => {
      this.masterwarehouseList = result;
    });
  }
  Search() {
    if (this.filterdata.WarehouseId == undefined || this.filterdata.WarehouseId == undefined) {
      alert("Please Select Warehouse")
      return
    }
    this.CallssmsService.getAddressUpdateRequestList(this.filterdata).subscribe(result => {
      this.PageList = result.result;
      this.totalRecords = result.totalcount;
    });
  }
  EditAddress(data) {
    this.updateData.Id = data.Id;
    this.updateData.Status = data.Status;
    this.updateData = data;
    if (data.Status == 2 || data.Status == 1) {
      this.IsDisabled = true;
      this.IsUpdateBtn = false;
    }
    else {
      this.IsDisabled = false;
      this.IsUpdateBtn = true;
    }
    this.isOpenPopup = true;
  }
  Update() {
    this.CallssmsService.updateAddressUpdateRequest(this.updateData.Id, this.updateData.Status).subscribe(res => {
        this.isOpenPopup = false;
        this.Search();
    })
    console.log(this.updateData)
  }
  Export() {
    if (this.filterdata.FromDate == null || !this.filterdata.FromDate == undefined) {
      alert("Please select From Date!");
      return;
    }
    if (this.filterdata.ToDate == null || !this.filterdata.ToDate == undefined) {
      alert("Please select To Date!");
      return;
    }
    this.filterdata.Skip = 0;
    this.filterdata.Take = 0;
    this.CallssmsService.ExportAddressUpdateRequest(this.filterdata).subscribe(res => {
      let exportdata=[];
      res.result.forEach(element => {
        exportdata.push({
          CustomerId:element.CustomerId,
          WarehouseId:element.WarehouseId,
          WarehouseName:element.WarehouseName,
          SkCode:element.SkCode,
          ShopName:element.ShopName,
          Address:element.Address,
          CurrentLat:element.CurrentLat,
          CurrentLng:element.CurrentLng,
          UpdateedAddress:element.UpdateedAddress,
          UpdatedLat:element.UpdatedLat,
          UpdatedLng:element.UpdatedLng,
          RequestBy:element.RequestBy,
          UpdatedBy:element.UpdatedBy,
          CreatedDate:element.CreatedDate,
          UpdatedDate:element.UpdatedDate,
          status:element.status
        });
      });
      this.exportService.exportAsExcelFile(exportdata, 'AddressUpdateRequestData');
    });
  }
}
