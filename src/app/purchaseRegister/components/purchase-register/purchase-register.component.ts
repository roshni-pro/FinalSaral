import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PurchaseregisterService } from 'app/shared/services/purchaseregister.service';
import { from } from 'rxjs';
import * as moment from 'moment';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { WarehouseService } from 'app/shared/services/warehouse.service';



@Component({
  selector: 'app-purchase-register',
  templateUrl: './purchase-register.component.html',
  styleUrls: ['./purchase-register.component.scss']
})
export class PurchaseRegisterComponent implements OnInit {
  isInvalid: boolean;
  // registerList: any;
  expandedRows: {} = {};
  @Input() expand: {};
  preport: any;
  inputModel: any
  searchModel: any;
  exportData: any
  cols: any[];
  totalRecords: number;
  pageSize: number;
  selectedRow: any;
  isDetails: boolean;
  selectedRowDetails: any;
  loading: boolean;
  warehouseList: any[];
  selectedwarehousesList: any;
  blocked=false;


  constructor(private purchaseregisterService: PurchaseregisterService,private messageService: MessageService,private WarehouseServices: WarehouseService, private exportService: ExportServiceService, private router: Router
  ) { this.searchModel = {} }

  ngOnInit() {
    this.selectedwarehousesList = [];
    this.WarehouseServices.getWarehouseCommon().subscribe(result => {
      this.warehouseList = result;

      if (this.warehouseList && this.warehouseList.length > 0) {
        this.selectedwarehousesList = this.warehouseList.filter(x => { return x.Selected == true })
      }
    })
    this.cols = [
      // { header: 'Edit' },
      { field: 'PurchaseOrderId', header: 'PurchaseOrderId' },
      { field: 'WarehouseName', header: 'WarehouseName' },
      { field: 'ItemMultiMRPId', header: 'ItemMultiMRPId' },
      { field: 'Status', header: 'Status' },
      { field: 'BuyerName', header: 'BuyerName' },
      { field: 'SupplierName', header: 'SupplierName' },
     // { field: 'Brand', header: 'Brand' },
     // { field: 'ItemId', header: 'ItemId' },
      { field: 'Quadrant', header: 'Quadrant' },
      { field: 'ItemName', header: 'ItemName' },
      { field: 'MRP', header: 'MRP' },
      //{ field: 'TotalTaxPercentage', header: 'TotaltaxPercentage' },
      { field: 'invoicedate', header: 'Invoicedate' },
      // { field: 'GRDate1', header: 'GRDate1' },
      // { field: 'gr1Qty', header: 'gr1Qty' },
      // { field: 'GRDate2', header: 'GRDate2' },
      // { field: 'gr2Qty', header: 'gr2Qty' },
      // { field: 'GRDate3', header: 'GRDate3' },
      // { field: 'gr3Qty', header: 'gr3Qty' },
      // { field: 'GRDate4', header: 'GRDate4' },
      // { field: 'gr4Qty', header: 'gr4Qty' },
      // { field: 'GRDate5', header: 'GRDate5' },
      // { field: 'gr5Qty', header: 'gr5Qty' },
      // { field: 'ir1Qty', header: 'ir1Qty' },
      // { field: 'ir2Qty', header: 'ir2Qty' },
      // { field: 'ir3Qty', header: 'ir3Qty' },
      // { field: 'ir4Qty', header: 'ir4Qty' },
      // { field: 'ir5Qty', header: 'ir5Qty' },
      { field: 'GrTotalQty', header: 'Gr_TotalQty' },
      { field: 'IRTotalQty', header: 'IR_TotalQty' },
      { field: 'GrIrDiff', header: 'Gr_Ir_Diff' },
      { field: 'GRAmount', header: 'GR_Amount' },
      { field: 'IrAmount', header: 'Ir_Amount' },
      { field: 'TaxAmount1', header: 'GstAmountIr1' },
      { field: 'TaxAmount2', header: 'GstAmountIr2' },
      { field: 'TaxAmount3', header: 'GstAmountIr3' },
      { field: 'TaxAmount4', header: 'GstAmountIr4' },
      { field: 'TaxAmount5', header: 'GstAmountIr5' },
      { field: 'POFreightCharges', header: 'POFreightCharges' },
      // { field: 'gstAmnt', header: 'GST_Amount' },

    ];

  }

  load(event) {
    // this.loading = true;
    var FromDate = this.searchModel.FromDate ? moment(this.searchModel.FromDate).format('YYYY-MM-DD') : null
    var ToDate = this.searchModel.ToDate ? moment(this.searchModel.ToDate).format('YYYY-MM-DD') : null

  }

  search(searchModel) {
    let warehouseIdsModel = searchModel.warehouseid;
    
    if(warehouseIdsModel==undefined){
      this.messageService.add({ severity: 'error', summary: 'Please Select Warehouse!!', detail: '' });
      return;
    }
    let whouse = [];
    searchModel.warehouseid.forEach(element => {
      whouse.push(element.value);
    });
    searchModel.warehouseid = whouse;

    
    var FromDate = this.searchModel.FromDate ? moment(this.searchModel.FromDate).format('YYYY-MM-DD') : null
    var ToDate = this.searchModel.ToDate ? moment(this.searchModel.ToDate).format('YYYY-MM-DD') : null

    //yaha pe warehouseids mil jayegi
    //searchModel.warehouseid // yaha
    
   var datatoPost={
    from:FromDate,
    to:ToDate,
    warehouseid:searchModel.warehouseid
    };
    this.blocked=true;
    this.purchaseregisterService.GetPurchaseRegistorData(datatoPost).subscribe(res => {

      searchModel.warehouseid = warehouseIdsModel;
      this.preport = res;
      console.log(res);
      
      this.blocked=false;
    });
    
  }
  export() {
    this.exportService.exportAsExcelFile(this.preport, 'PurchaseRegistorData');
  }

}
