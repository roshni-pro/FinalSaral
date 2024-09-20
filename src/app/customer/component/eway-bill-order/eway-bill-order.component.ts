import { Component, OnInit, Input } from '@angular/core';
import { CityService } from 'app/shared/services/city.service';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import { EwayBillOrderService } from 'app/shared/services/eway-bill-order.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { FileUploadModule } from 'primeng/fileupload';
import { paginatorEwayBillNumber } from 'app/shared/interface/paginator-ewayBillNumber';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import * as moment from 'moment';

@Component({
  selector: 'app-eway-bill-order',
  templateUrl: './eway-bill-order.component.html',
  styleUrls: ['./eway-bill-order.component.scss']
})
export class EwayBillOrderComponent implements OnInit {
  data: any;
  cityList: any;
  warehouseList: any;
  cols: any;
  EwayBillNumber: any;
  public imagePath;
  EwayBillFileUrls: any;
  isSearch: boolean;
  isTable: boolean;
  loading: boolean;
  totalRecords: number;
  blocked: boolean;
  isDisabled: boolean;
  isResultFalse: boolean;
  file: any;
  filename: any;
  IsExtension: boolean;
  paginator: paginatorEwayBillNumber;
  pageSize: number;
  results: any;
  exportList: any;
  orderlist: any[];
  status: any;
  @Input() OrderDispatchedMasterId: any;


  constructor(private ewayBillOrderService: EwayBillOrderService, private cityService: CityService,
    private warehouseService: WarehouseService, private exportService: ExportServiceService, private messageService: MessageService, private confirmationService: ConfirmationService) {
    this.data = {}
  }

  ngOnInit() {
    this.data.status = "";
    this.IsExtension = true;
    this.isResultFalse = true;
    this.isDisabled = false;
    this.EwayBillNumber = null;
    this.pageSize = 5;
    this.paginator = {
      Skip: 0,
      Take: this.pageSize,
      Cityid: null,
      orderId: null,
      SkCode: "",
      active: true,
      status: "",
      Warehouseid: null,
      FromDate: null,
      ToDate: null
    }

    this.cityService.GetAllCity().subscribe(result => {
      this.cityList = result;
    })

    this.initialize();

  }


  private initialize() {
    if (this.paginator.Cityid != null) {
      this.loading = true;
      this.ewayBillOrderService.GetEwaybillOrder(this.paginator).subscribe(result => {
        this.results = result;
        this.orderlist = this.results.ordermaster;
        this.totalRecords = this.results.total_count;
      });
      this.loading = false;
    }
  }

  toggleSearch() {
    if (this.isSearch == true) {
      this.isSearch = false;
    } else {
      if (this.isTable == true) {
        this.isTable = false;
      }
      this.isSearch = true;
    }
  }

  uploader() {
    let formData = new FormData();
    formData.append('file', this.file[0])
    this.blocked = true;
    // formData.append('value', this.OBLatestVersion)
    this.ewayBillOrderService.UploadDoc(formData).subscribe(result => {
      this.blocked = false;
      if (result) {
        this.EwayBillFileUrls = result;
        this.messageService.add({ severity: 'success', summary: 'Uploaded Successfully!', detail: '' });
        this.IsExtension = true;;
      }
    })

  }


  upload(file: File[]) {
    this.file = file;
    this.IsExtension = false;
    var reader = new FileReader();
    this.imagePath = file;
    reader.readAsDataURL(file[0]);
    (success) => {
      alert("image uploaded successfully")
    };
  }

  getWarehosues(ID) {
    this.data.WarehouseId = "";
    this.data.StartDate = "";
    this.data.EndDate = "";

    this.warehouseService.GetAllCityId(ID).subscribe(result => {
      this.warehouseList = result;
    })

  }

  //get List
  getEwaybillList(data) {
    data.Start = moment(data.StartDate).format('YYYY/MM/DD');
    data.end = moment(data.EndDate).format('YYYY/MM/DD');
    this.paginator.Cityid = data.cityId;
    this.paginator.Warehouseid = data.WarehouseId;
    this.paginator.orderId = data.OrderId;
    this.paginator.SkCode = data.SkCode;
    this.paginator.status = data.status;
    this.paginator.FromDate = data.Start;
    this.paginator.ToDate = data.end;
    this.blocked = true;
    this.ewayBillOrderService.GetEwaybillOrder(this.paginator).subscribe(result => {
      
      this.blocked = false;
      this.isResultFalse = false;
      this.results = result;
      this.orderlist = this.results.ordermaster;
      this.exportList = this.results.Ewayorderlist;
      this.totalRecords = this.results.total_count;
    })
  }

  load(event, data) {
    this.paginator.Skip = event.first;
    this.paginator.Take = event.rows;
    this.paginator.Cityid = data.cityId;
    this.paginator.Warehouseid = data.WarehouseId;
    this.paginator.status = data.status;
    this.paginator.FromDate = data.Start;
    this.paginator.ToDate = data.end;
    this.blocked = true;
    if (this.paginator.Cityid != null) {
      this.ewayBillOrderService.GetEwaybillOrder(this.paginator).subscribe(result => {
        this.blocked = false;
        this.results = result;
        this.orderlist = this.results.ordermaster;
        this.totalRecords = this.results.total_count;
      })
    }
    else {
      this.blocked = false;
      // return this.paginator;
    }
    //this.getEwaybillList(this.paginator);
  }

  //Update Eway Bill Order
  updateEwayOrder(updatedata) {
    
    var Id = [];
    if (updatedata.EwayBillNumber == null || updatedata.EwayBillNumber == '') {
      this.messageService.add({ severity: 'error', summary: 'Please Enter Ewaybill Number!', detail: '' });
      return false;
    }

    if(updatedata.EwayBillNumber.length < 4){
      this.messageService.add({ severity: 'error', summary: 'Please Enter Minimum 4 Digit Ewaybill Number!', detail: '' });
      return false;
    }
    else {
      if (updatedata.OrderId > 0 && updatedata.OrderDispatchedMasterId > 0) {
        this.confirmationService.confirm({
          message: 'Eway bill number cannot be changed after updating.Are you sure you want to update Eway bill number?',
          header: 'Update Confirmation',
          icon: 'pi pi-info-circle',
          accept: () => {
            var dataToPost = {
              OrderDispatchedMasterId: updatedata.OrderDispatchedMasterId,
              EwayBillNumber: updatedata.EwayBillNumber,
              OrderId: updatedata.OrderId,
              EwayBillFileUrl: this.filename,
              // TransDocNo: updatedata.TransDocNo,
              // TransName: updatedata.TransDocNo,
              // VehNo: updatedata.TransDocNo,
              // Distance: updatedata.Distance,
              // TransMode: updatedata.TransMode,
              // TransId: updatedata.TransId,
              // VehType:updatedata.VehType,
            }
            Id.push(dataToPost);
            this.blocked = true;
            this.ewayBillOrderService.GetEwaybillUpdate(dataToPost).subscribe(result => {
              
              this.blocked = false;
              this.results = result;
              if (result) 
              {              

                this.isDisabled = true;
                this.messageService.add({ severity: 'success', summary: this.results, detail: '' });

              }
              else 
              {
                this.blocked = false;
                this.messageService.add({ severity: 'success', summary: 'Something Went wrong.EwayBill not Updated!', detail: '' });
              }
            });
          }
        });
      }
    }

  }

  //Export Eway Bill Order
  exportOrder() {
    var _export = []
    if(this.orderlist && this.orderlist.length > 0){
    this.data.Start = moment(this.data.StartDate).format('YYYY/MM/DD');
    this.data.end = moment(this.data.EndDate).format('YYYY/MM/DD');
    this.paginator.Cityid = this.data.cityId;
    this.paginator.Warehouseid = this.data.WarehouseId;
    this.paginator.orderId = this.data.OrderId;
    this.paginator.SkCode = this.data.SkCode;
    this.paginator.status = this.data.status;
    this.paginator.FromDate = this.data.Start;
    this.paginator.ToDate = this.data.end;
    this.paginator.Take = this.totalRecords;
    this.blocked = true;
    this.ewayBillOrderService.GetEwaybillOrder(this.paginator).subscribe(result => {
      
      this.blocked = false;
      this.isResultFalse = false;
      this.results = result;
      this.exportList = this.results.ordermaster;
      this.totalRecords = this.results.total_count;
      for (var i in this.exportList) {
        debugger;
        var selectedFields = {
          OrderId: this.exportList[i].OrderId,
          SalesPerson: this.exportList[i].SalesPerson,
          Skcode: this.exportList[i].Skcode,
          OrderAmount: (this.exportList[i].GrossAmount + this.exportList[i].WalletAmount + this.exportList[i].BillDiscountAmount),
          EwayBillNumber: this.exportList[i].EwayBillNumber,
          Status : this.exportList[i].Status
        }
        _export.push(selectedFields);
      }
      if(this.exportList && this.exportList.length > 0)
      {
        this.exportService.exportAsExcelFile(_export, 'EwayBillOrder');
      }else{
        alert('No Data Found!');
      }    
    })
    }
    else{
      alert('No Data Found!');
    }  
  }

  spaceValidator(data, pageData) {
    
    this.orderlist.filter(f => f.OrderId == pageData.OrderId)[0].EwayBillNumber = data.split(' ').join('');
  }



  spaceValidatorVehNo(data, pageData) {

    this.orderlist.filter(f => f.OrderId == pageData.OrderId)[0].VehNo = data.split(' ').join('');
  }

}
