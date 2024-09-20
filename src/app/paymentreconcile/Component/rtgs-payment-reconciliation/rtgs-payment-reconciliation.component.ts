import { Component, OnInit } from '@angular/core';
import { PaymentreconcileService } from 'app/shared/services/paymentreconcile.service';
// import { MessageService } from 'primeng/api';
// import * as XLSX from 'xlsx';

@Component({
  selector: 'app-rtgs-payment-reconciliation',
  templateUrl: './rtgs-payment-reconciliation.component.html',
  styleUrls: ['./rtgs-payment-reconciliation.component.scss']
})
export class RTGSPaymentReconciliationComponent implements OnInit {

  keyword: string = '';
  allWarehouses: any[] = [];
  selectedWarehouse: any[] = [];
  statusOption: any[] = [
    { label: "Success", value: "Success" },
    { label: "Deviation", value: "Deviation" }
  ];
  selectedStatus: any;

  startDate: Date;
  endDate: Date;

  take: number;
  skip: number;

  paymentList: any[] = [];
  PopDetails: boolean = false;

  paymentReconcilationlist: any[] = [];
  subVANTransactionList: any[] = [];

  totalRecords: number = 0;
  blocked:boolean=false;
  warehouseIDs: any[] = [];
  constructor(private apiService: PaymentreconcileService) {
    this.getWarehouses();
    console.log(this.allWarehouses, this.warehouseIDs);

  }

  ngOnInit() {

  }

  getWarehouses() {
    this.apiService.getWarehouseList().subscribe(
      (res) => {
        // debugger;
        console.log(res);
        if (res.length > 0) {
          this.allWarehouses = res;
          // alert("warehouse");
        } else {
          alert("warehouse list is empty")
          this.allWarehouses = [];
        }
      },
      (err) => {
        this.allWarehouses = [];
        alert("Error - Cannot GET Warehouse List")
        console.log(err);
      },
    );
  }

  load(event) {
    // debugger;
    var Last = event.first ? event.first + event.rows : 10;
    this.skip = Last / event.rows;
    this.take = event.rows;

    var body = {
      keytype: this.keyword,
      WarehouseIds: [0],
      skip: this.skip,
      take: this.take,
      StartDate: this.startDate,
      EndDate: this.endDate
    }

    console.log(body);

    this.apiService.GetRTGSpaymentReconcilationlist(body).subscribe(
      (res) => {
        console.log("GetRTGSpaymentReconcilationlist", res);
        if (res.length > 0) {

          this.paymentReconcilationlist = res;
          this.totalRecords = res[0].TotalCount;
        } else {
          this.paymentReconcilationlist = [];
        }
      },
      (err) => {
        this.paymentReconcilationlist = [];
        console.log(err);
      }
    )
  }


  searchResult() {

    this.keyword = this.keyword.trim();

    if (this.keyword == '' && this.selectedWarehouse.length < 1 && this.startDate == undefined && this.endDate == undefined) {
      alert("Please fill any of the input field before click on search");
    } else {
      this.totalRecords = 0;
      //  warehouseIDs: number[] = [];
      this.paymentReconcilationlist = [];
      this.warehouseIDs = [];

      if (this.selectedWarehouse.length < 1) {
        this.allWarehouses.forEach(element => {
          this.warehouseIDs.push(element.WarehouseId);
        });
      } else {
        this.selectedWarehouse.forEach(element => {
          this.warehouseIDs.push(element.WarehouseId);
        });
      }

      // this.selectedWarehouse.forEach(element => {
      //   warehouseIDs.push(element.WarehouseId);
      // });

      if (this.startDate == undefined) {
        this.startDate = null;
      }
      if (this.endDate == undefined) {
        this.endDate = null;
      }

      let body = {
        keytype: this.keyword,
        WarehouseIds: this.warehouseIDs,
        skip: 1,
        take: 10,
        StartDate: this.startDate,
        EndDate: this.endDate
      }

      this.apiService.GetRTGSpaymentReconcilationlist(body).subscribe(
        (res) => {
          console.log("GetRTGSpaymentReconcilationlist", res);
          if (res.length > 0) {
            this.paymentReconcilationlist = res;
            this.totalRecords = res[0].TotalCount;
          } else {
            this.paymentReconcilationlist = [];
          }
        },
        (err) => {
          this.paymentReconcilationlist = [];
          console.log(err);
        }
      )
    }


  }


  getSubVANTransactionList(id) {
    this.apiService.GetSubVANTransactionList(id).subscribe(
      (res) => {
        console.log("GetSubVANTransactionList", res);
        if (res.length > 0) {
          this.subVANTransactionList = res;
        } else {
          this.subVANTransactionList = [];
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }



  detailPop(data) {   
    this.blocked=true; 
    // this.detailsData = data;
    this.subVANTransactionList=[];
    console.log(data);
    this.PopDetails = true;
    this.getSubVANTransactionList(data);
    this.blocked=false;
  }

  onUpload(event, uploadCustom) {
    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    const files = event.files[0];
    console.log(files);

    let file = new FormData();
    file.append("file", files)
    this.apiService.VANPaymantUploadFile(file).subscribe(
      (res) => {
        // console.log(res);
        alert(res);
        window.location.reload();
        // if (res = true) {
        //   alert("Successfully done")
        //   console.log(res);
        //   window.location.reload();
        // }
        // else {
        //   alert("Some error in input data, please check ")
        //   console.log(res);
        // }
      },
      (err) => {

      });
  }
}
