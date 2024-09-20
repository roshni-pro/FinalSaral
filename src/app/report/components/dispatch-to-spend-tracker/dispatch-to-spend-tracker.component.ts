import { Component, OnInit } from '@angular/core';
import { DispatchToSpendTrackerService } from 'app/report/services/dispatch-to-spend-tracker.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import * as moment from 'moment';

@Component({
  selector: 'app-dispatch-to-spend-tracker',
  templateUrl: './dispatch-to-spend-tracker.component.html',
  styleUrls: ['./dispatch-to-spend-tracker.component.scss']
})
export class DispatchToSpendTrackerComponent implements OnInit {
  selectedHub: any[] = [];
  selectedCluster:any[] = [];
  selectedPerson:any[] = [];
  hubList:any;
  dateList:any;
  selectedDateType:any;
  maxDateValue: any;
  minDateValue: any;
  minDate:any;
  selectedHubId: any[];
  selectedClusterId: any[];
  selectedPersonId: any[];
  selOrderDate:any;
  selDispatchDate:any;
  clusterList:any;
  personList: any;
  curDateVal: Date;
  ApiResponselist:any;
  blocked:boolean=false;
  constructor(private Api_service:DispatchToSpendTrackerService, private exportService: ExportServiceService) {

    this.dateList = [
      {dateName: 'Ordered Date', dateCode: '0'},
      {dateName: 'Dispatch Date', dateCode: '1'},
    ]

   }

  ngOnInit() {
    this.curDateVal = new Date();
    this.getHubList();
  }

  getHubList(){
    this.Api_service.getMultiHubList().subscribe(res => {
      //console.log(res);
      this.hubList = res;
    })
  }

  getClusterList(hubDetails){
    this.clusterList = [];
    this.selectedCluster = [];
    this.selectedHubId = [];
    this.personList = [];
    this.selectedPerson = [];
    this.selectedClusterId = [];

    if (hubDetails.length > 0) {
      this.selectedHubId = hubDetails.map(function (e) {
        return e.WarehouseId ? e.WarehouseId : e
      })
    }

    this.Api_service.getClusterList(this.selectedHubId).subscribe(res => {
      //console.log(res);
      this.clusterList = res;
    })

  }

  getCustomerList(clusterDetails){
    this.personList = [];
    this.selectedPerson = [];
    this.selectedClusterId = [];

    if (clusterDetails.length > 0) {  
      this.selectedClusterId = clusterDetails.map(function (e) {
        return e.ClusterId ? e.ClusterId : e
      })
    }
    const payload={
      'ClusterIds' : this.selectedClusterId
    }
    this.Api_service.getPersonList(payload).subscribe(res => {
      //console.log(res);
      this.personList = res;
    })
  }

  orderDateBol:boolean;
  dispatchDateBol:boolean;
  getSelectedDate(selDate){
    this.selOrderDate = null;
    this.selDispatchDate = null;
    var resultDate = selDate.dateCode
    if(resultDate == 0){
      this.orderDateBol = true;
      this.dispatchDateBol = false;
    }else if(resultDate == 1){
      this.orderDateBol = false;
      this.dispatchDateBol = true;
    }
  }


  dateForOrderDate(event){
    var startDate = this.selOrderDate[0];
   
    if(this.selOrderDate[1] != null){
      var endDate = this.selOrderDate[1];
    }

    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

    if(diffDays > 30){
      alert("You Can't Select More Than 30 Days");
      this.selOrderDate = null;
    }else{
      this.selOrderDate;
    }

    // if(event != undefined){
  
    // this.maxDateValue = event;
    // var maxDate = moment(event).format('MM/DD/YYYY')
    // this.minDateValue = event;
    // this.minDateValue.setDate(this.maxDateValue.getDate() - 30);
    // var minDate = moment(this.minDateValue).format('MM/DD/YYYY')
    // this.selOrderDate = maxDate+' - '+minDate
    //console.log(this.selOrderDate);
   // } 
  }

  dateForDispatchDate(event){
    var startDate = this.selDispatchDate[0];
   
    if(this.selDispatchDate[1] != null){
      var endDate = this.selDispatchDate[1];
    }

    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

    if(diffDays > 30){
      alert("You Can't Select More Than 30 Days");
      this.selDispatchDate = null;
    }else{
      this.selDispatchDate;
    }
  
      // this.maxDateValue = event;
      // var maxDate = moment(event).format('MM/DD/YYYY')
      // this.minDateValue = event;
      // this.minDateValue.setDate(this.maxDateValue.getDate() - 30);
      // var minDate = moment(this.minDateValue).format('MM/DD/YYYY')
      // this.selDispatchDate = maxDate +' - '+ minDate
      // console.log(this.selDispatchDate);
  }


  startDate:any;
  endDate:any;
  dateType:any
  getExportReport(){
    this.startDate = null;
    this.endDate = null;
    if (this.selectedPerson.length > 0) {  
      this.selectedPersonId = this.selectedPerson.map(function (e) {
        return e.ExecutiveId ? e.ExecutiveId : e
      })
    }

    if(this.selectedDateType != undefined){
      this.dateType = this.selectedDateType.dateCode
    }
   
    if(this.selectedHub.length > 0){
      // if(this.selectedCluster.length > 0){
      //   if(this.selectedPersonId != undefined){
          if(this.dateType != undefined){ 
            if((this.selOrderDate != undefined) || (this.selDispatchDate != undefined)){
          
              if(this.dateType == 0){
                if((this.selOrderDate[1] == null)){
                  alert('Please Select End Date')
                  return false;
                }
              }else if(this.dateType == 1){
                if((this.selDispatchDate[1] == null)){
                  alert('Please Select End Date')
                  return false;
                }
              }
               
              if(this.dateType == 0){
                this.startDate = moment(this.selOrderDate[0]).format('MM/DD/YYYY')
                this.endDate = moment(this.selOrderDate[1]).format('MM/DD/YYYY')
              }
          
              if(this.dateType == 1){
                this.startDate = moment(this.selDispatchDate[0]).format('MM/DD/YYYY')
                this.endDate = moment(this.selDispatchDate[1]).format('MM/DD/YYYY')
              }
          
              const payload={
                'WarehouseIds' : this.selectedHubId,
                'ClusterIds' : this.selectedClusterId ? this.selectedClusterId : [],
                'SalesPersoneIds' : this.selectedPersonId ? this.selectedPersonId : [],
                'DateType' : parseInt(this.dateType),
                'StartDate' : this.startDate,
                'EndDate' : this.endDate
              }
           this.blocked = true;
              this.Api_service.getDispatchToSpendTrackerList(payload).subscribe(res => {
                console.log(res);
                this.ApiResponselist = res;
            
                if(this.ApiResponselist.length > 0){
                  var result = this.ApiResponselist.map(function(a) {
                    return {
                      'WarehouseName': a.WarehouseName,
                      'Cluster': a.Cluster,
                      'SalesPerson': a.SalesPerson,
                      'OrderBy': a.OrderBy,
                      'Skcode': a.Skcode,
                      'CategoryName': a.CategoryName,
                      'SubcategoryName': a.SubcategoryName,
                      'Brand': a.Brand,
                      'itemname': a.itemname,
                      'orderid': a.orderid,
                      'OrderDate': a.OrderDate,
                      'RTDDate': a.RTDDate,
                      'DeliveredDate': a.DeliveredDate,
                      'OrderToDeliveryHrs': a.OrderToDeliveryHrs,
                      'BookingValue': a.BookingValue,
                      'Bookingqty': a.Bookingqty,
                      'DispatchValue': a.DispatchValue,
                      'Dispatchqty': a.Dispatchqty,
                      'CancelValue': a.CancelValue,
                      'CancelQty': a.CancelQty,
                      'CancelRemarks': a.CancelRemarks,
                      'BillDiscountAmount': a.BillDiscountAmount,
                      'FreebiesValue': a.FreebiesValue,
                      'WalletAmount': a.WalletAmount,
                      'CustomerName': a.CustomerName,
                      'Address': a.Address,
                     };
                   });
                  this.exportService.exportAsExcelFile(result, 'DispatchToSpendTracker');
                }else{
                  alert('No Record Found')
                }
              })
              this.blocked = false;
            }else{
              alert('Please Select Date')
            }
          }else{
            alert('Please Select Date Type')
          }
      //   }else{
      //     alert('Please Select Sales Person')
      //   }
      // }else{
      //   alert('Please Select Cluster')
      // }
    }else{
      alert('Please Select Hub')
    }
  }

}
