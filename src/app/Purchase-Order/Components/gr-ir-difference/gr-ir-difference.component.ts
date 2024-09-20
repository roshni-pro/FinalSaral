import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { PurchaseOrderService } from 'app/shared/services/purchase-order.service';
import { Table } from 'primeng/table';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-gr-ir-difference',
  templateUrl: './gr-ir-difference.component.html',
  styleUrls: ['./gr-ir-difference.component.scss'],
  providers: [DatePipe]
})
export class GrIrDifferenceComponent implements OnInit {


  grirlist: any[];

  searchModel: any;
  isSearch: any;
 
  grDiffMorethan0 : string;

  exportFilenameDatetime : any;
  cols: any[];


  myDate = new Date();







  constructor(public purchaseOrderService: PurchaseOrderService , private datePipe: DatePipe) { this.searchModel = {}; }

  ngOnInit() {


    this.cols = [
      { field: 'PurchaseOrderId', header: 'PO-ID' , grDiffMorethan0: '' },
      { field: 'WarehouseName', header: 'WH Name ', grDiffMorethan0: ''  },
      { field: 'Status', header: 'Status' , grDiffMorethan0: '' },
      { field: 'BuyerName', header: 'BuyerName' , grDiffMorethan0: '' },
      { field: 'SupplierName', header: 'Supplier Name', grDiffMorethan0: ''  },
      { field: 'ItemMultiMRPId', header: 'ItemMultiMRPId' , grDiffMorethan0: ''  },
      { field: 'ItemName', header: '  Item  Name  ' , grDiffMorethan0: '' },
      { field: 'gr1Qty', header: 'gr1Qty' , grDiffMorethan0: '' },     
      { field: 'gr2Qty', header: 'gr2Qty' , grDiffMorethan0: '' },      
      { field: 'gr3Qty', header: 'gr3Qty' , grDiffMorethan0: '' },      
      { field: 'gr4Qty', header: 'gr4Qty' , grDiffMorethan0: '' },
      { field: 'gr5Qty', header: 'gr5Qty' , grDiffMorethan0: '' },
      { field: 'ir1Qty', header: 'ir1Qty' , grDiffMorethan0: '' },
      { field: 'ir2Qty', header: 'ir2Qty' , grDiffMorethan0: '' },
      { field: 'ir3Qty', header: 'ir3Qty' , grDiffMorethan0: '' },
      { field: 'ir4Qty', header: 'ir4Qty' , grDiffMorethan0: '' },      
      { field: 'ir5Qty', header: 'ir5Qty', grDiffMorethan0: ''  },
      { field: 'GrTotalQty', header: 'GrTotalQty'  , grDiffMorethan0: '' },
      { field: 'IRTotalQty', header: 'IRTotalQty' , grDiffMorethan0: '' },
      { field: 'GrIrDiff', header: 'Gr Ir Diffrence'  , grDiffMorethan0: '' },
      { field: 'GRAmount', header: 'GRAmount' , grDiffMorethan0: '' },
      { field: 'IrAmount', header: 'IrAmount' , grDiffMorethan0: '' },
      { field: 'DiffGrIr', header: 'Difference(GR-Ir) Amount' , grDiffMorethan0: '' },
      { field: 'GRcomment', header: 'WrongGRcomment' , grDiffMorethan0: '' },
      { field: 'PaymentTerms', header: 'PaymentTerms' , grDiffMorethan0: '' },
      { field: 'PODate', header: 'PODate' , grDiffMorethan0: '' },
      { field: 'GRDate', header: 'GRDate' , grDiffMorethan0: '' },
      { field: 'InvoiceDate', header: 'InvoiceDate' , grDiffMorethan0: '' },
    ];

  }


  load(event) {
    // this.loading = true;
    var FromDate = this.searchModel.FromDate ? moment(this.searchModel.FromDate).format('YYYY-MM-DD') : null
    var ToDate = this.searchModel.ToDate ? moment(this.searchModel.ToDate).format('YYYY-MM-DD') : null




  }

  search(searchModel) {

    var FromDate = this.searchModel.FromDate ? moment(this.searchModel.FromDate).format('YYYY-MM-DD') : null
    var ToDate = this.searchModel.ToDate ? moment(this.searchModel.ToDate).format('YYYY-MM-DD') : null

    this.purchaseOrderService.Getirgrdiffrence(FromDate, ToDate).subscribe(res => {
      console.log(this.searchModel.FromDate);
      console.log(res)
      this.grirlist = res;
      console.log(this.grirlist)
      

      this.grirlist.forEach(function (value) {
        
        if (value.GrIrDiff > 0) {

          value.grDiffMorethan0 = 'Golden';



        }

      });

       
    })
    this.exportFilenameDatetime = "GR-IR Diffrence:" + this.datePipe.transform(this.myDate, 'dd/MM/yyyy h:mm:ss a');

  }

  



}





