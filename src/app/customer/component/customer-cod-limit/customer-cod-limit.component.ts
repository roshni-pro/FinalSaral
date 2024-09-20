import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'app/shared/services/customer.service';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-customer-cod-limit',
  templateUrl: './customer-cod-limit.component.html',
  styleUrls: ['./customer-cod-limit.component.scss']
})
export class CustomerCodLimitComponent implements OnInit {
warehouselistData:any;
customerList:any;
selWarehouse:any;
selCustomer:any;
searchKey:any;
blocked:boolean;
ItemPerPage:any;
PageNo:any;
TotalRecord:number;
CustomerCodRecord:any;
codLimitVal:any;
selectedList:any[];
displayHistroy: boolean = false;
entity: any;
getLocalWareId:any;

  constructor(private wareService:WarehouseService,private custService:CustomerService,private exportService: ExportServiceService,private confirmationService: ConfirmationService) { 
    this.customerList = [
      {custName : 'All Customer', code: 'All'},
      {custName : 'Potential Defaulter', code: 'Potential Defaulter'},
      {custName : 'COD Limit', code: 'COD Limit'},
    ]

    this.entity = "CODLimitCustomer"
  }

  ngOnInit() {
    this.getWarehouseList();
    this.selectedList = [];
    this.getLocalWareId = localStorage.getItem('Warehouseid')
  }

  getWarehouseList(){
    this.wareService.GetAllWarehouse().subscribe(
      (res) => {
        this.warehouselistData = res;
        if(this.getLocalWareId == 0){
          this.selWarehouse = this.warehouselistData.filter(x => x.WarehouseId == 1)[0];
          this.selCustomer = this.customerList.filter(x => x.code == 'All')[0];
        }else{
          this.selWarehouse = this.warehouselistData.filter(x => x.WarehouseId == this.getLocalWareId)[0];
          this.selCustomer = this.customerList.filter(x => x.code == 'All')[0];
        }

        const payload = {
          'Skip' : this.PageNo || 1,
          'Take' : this.ItemPerPage || 10,
          'WarehouseId' : this.selWarehouse.WarehouseId,
          'Type' : this.selCustomer.code,
          'Keyward' : this.searchKey ? this.searchKey : '',
        }

      this.blocked = true;
      this.custService.getCustCodLimitData(payload).subscribe(
        (res) => {
          console.log(res);
          this.CustomerCodRecord = res.CODLimitCustomer;
          this.TotalRecord = res.TotalCount;
          this.blocked = false;
        },
        (err) => {
          alert(err.error.ErrorMessage);
          this.blocked = false;
        }
      )

      },
      (err) => {
        alert(err.error.ErrorMessage);
      }
      )
  }
  
  searchData(){
    if(this.selWarehouse == undefined){
      alert('Please Select Warehouse')
    }else if(this.selCustomer == undefined){
      alert('Please Select Customer Type')
    }else{
      this.load(null);
    }
  }

  finalWarehouseId:Number;
  finalCustomerId:any;
  load(event) {
    this.selectedList = [];
    debugger;
    if(event){
      var Last = event.first ? event.first + event.rows : 10
      this.ItemPerPage = event.rows
      this.PageNo = Last / event.rows
    }else{
      this.PageNo = null;
    }
    
    if(this.selWarehouse != undefined){
      this.finalWarehouseId = this.selWarehouse.WarehouseId
    }

    if(this.selCustomer != undefined){
      this.finalCustomerId = this.selCustomer.code
    }

    const payload = {
      'Skip' : this.PageNo || 1,
      'Take' : this.ItemPerPage || 10,
      'WarehouseId' : this.finalWarehouseId ? this.finalWarehouseId : '',
      'Type' : this.finalCustomerId ? this.finalCustomerId : '',
      'Keyward' : this.searchKey ? this.searchKey : '',
    }

    if(this.finalWarehouseId != undefined && this.finalCustomerId != undefined){
      this.blocked = true;
      this.custService.getCustCodLimitData(payload).subscribe(
        (res) => {
          console.log(res);
          this.CustomerCodRecord = res.CODLimitCustomer;
          this.TotalRecord = res.TotalCount;
          this.blocked = false;
        },
        (err) => {
          alert(err.error.ErrorMessage);
          this.blocked = false;
        }
      )
    }
  }

  inputEnable:boolean;
  checkedBoolStatus:boolean;
  selCustId:Number;
  changeCustCodLimit(e,details) {
    console.log(details);
    this.checkedBoolStatus = e.checked;
    this.selCustId = details.CustomerId;
    
    // if(this.checkedBoolStatus == true){
    //   this.inputEnable = true;
    // }else{
    //   this.inputEnable = false;
    // }
  }

  getCodeVal:number;
  getCodLimitVal(value: number){
    this.getCodeVal = value;
  }

  omit_special_char_and_text(event)
  {   
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  decimalFilter(event: any) {
    const reg = /^-?\d*(\.\d{0,2})?$/;
    let input = event.target.value + String.fromCharCode(event.charCode);
 
    if (!reg.test(input)) {
        event.preventDefault();
    }
 }

  SaveBulkRecord(){
    if(this.selectedList.length > 0){
      
      var result = this.selectedList.map(function(a) {
        return {
          'CustomerId': a.CustomerId,
          'IsCustomCODLimit': a.IsCustomCODLimit,
          'CODLimit': a.CODLimit,
         };
       });


      var codLimitSet = this.selectedList.filter(x => x.CODLimit == 0)
      var blankCodLimitSet = this.selectedList.filter(x => x.CODLimit == null)
      var minCodLimitSet = this.selectedList.filter(x => x.CODLimit < (-1))

      if(codLimitSet.length > 0 || minCodLimitSet.length > 0 || blankCodLimitSet.length > 0){
        alert('COD limit Can Not Be 0 And Not Be Blank And Not Less Than By -1')
        return false;
      }

      // console.log(result);return;
      this.confirmationService.confirm({
        message: 'Are you sure that you want to perform this action ?',
        accept: () => {

          this.blocked = true; 
          this.custService.updateCodCustLimit(result).subscribe(
            (res) => {
              console.log(res);
              if(res == true){
                alert('COD limit Is Updated')
              }
              this.load(null);
              this.blocked = false;
            },
            (err) => {
              alert(err.error.ErrorMessage)
              this.blocked = false;
            }
          )
        }
      });
    }else{
      alert('Please Select CheckBox')
    }
  }

  histroyData: any;
  viewHistory(d){
    this.histroyData = d;
    this.displayHistroy = true;
  }

  downloadExport(){

    if(this.selWarehouse == undefined){
      alert('Please Select Warehouse')
      return false;
    }else{
      this.finalWarehouseId = this.selWarehouse.WarehouseId
    }

    if(this.selCustomer == undefined){
      alert('Please Select Customer Type')
      return false;
    }else{
      this.finalCustomerId = this.selCustomer.code
    }

    const payload = {
      'WarehouseId' : this.finalWarehouseId ? this.finalWarehouseId : '',
      'Type' : this.finalCustomerId ? this.finalCustomerId : '',
      'Keyward' : this.searchKey ? this.searchKey : '',
    }

    this.custService.exportCodCustLimit(payload).subscribe(res => {
      console.log(res);
      var totalRecord = res.CODLimitCustomer;
      if(totalRecord != null){
      var result = totalRecord.map(function(a) {
        return {
          'Skcode': a.Skcode,
          'ShopName': a.ShopName,
          'WarehouseName': a.WarehouseName,
          'Mobile': a.Mobile,
          'Name': a.Name,
          'CODLimit': a.CODLimit,
          'IsCustomCODLimit': a.IsCustomCODLimit,
          '3 Month Cancellation %': a.Last90DaysCancelPercent +'%',
          '3 Month Redispatch % /Orders': a.Last90DaysRedispatchCount +'% /'+a.Last90DaysTotalCount,
          'UpdatedBy': a.UpdatedBy,
         };
       });
      this.exportService.exportAsExcelFile(result, 'CustomerCODLimit');
      }else{
        alert('Data Not Found!!');
      }
    })
    
  }

 
}
