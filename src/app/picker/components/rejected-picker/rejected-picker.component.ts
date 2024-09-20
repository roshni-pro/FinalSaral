import { Component, OnInit } from '@angular/core';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { PickerService } from 'app/shared/services/picker/picker.service';
import { debug } from 'console';
import { MessageService } from 'primeng/api';
import * as moment from 'moment';
@Component({
  selector: 'app-rejected-picker',
  templateUrl: './rejected-picker.component.html',
  styleUrls: ['./rejected-picker.component.scss']
})
export class RejectedPickerComponent implements OnInit {

  constructor(private pickerservice : PickerService,private exportservice:ExportServiceService,private msg:MessageService) { this.entity = "OrderPickerDetails";} 

  WareHouseList:any[]=[]
  blocked:boolean=false
  clusterList:any[]=[]
  selectedWareHouse:any[]=[]
  SelectedCluster:any[]=[]
  WareId:any
  ClustID:any
  PickerList:any[]=[]
  Totalcount:any
  skip:any;
  take:any;
  selectDate:any
  FromDate:any=null
  ToDate:any=null
  date1:any
  date2:any
  EnterPN:any
  Difference_In_Days:any
  ispopupIdDetail:boolean=false
  historypopup:boolean=false
  PickerID:number
  ClusterName:any
  CreatedDate:any
  Id:any
  WarehouseName:any
  createdby:any
  dboy:any
  pickerPerson:any
  Listres:any[]=[]
  Qty:any
  historyHide:boolean=false
  entity : any;

  ngOnInit() {
    this.GetWarehouse();
  }

  GetWarehouse() {
    this.pickerservice.GetAllWarehouseNew().subscribe(WareRes => { 
      this.WareHouseList = WareRes
    })
  }

  getClusterlist() {
    this.WareId = [];
    this.clusterList=[];
    this.SelectedCluster=[];
      this.selectedWareHouse.forEach(element => {
        this.WareId.push(element.value);
      });      
      this.pickerservice.GetAllClusterViaMultipleWareID(this.WareId).subscribe(ClusterRes => {
      this.clusterList = ClusterRes;  
    });
  }
  loadtoast:boolean=false;
  load(event)  {
   this.skip=event.first;
   this.take= event.rows;
   this.GetRejectedPickerList();    
  }
  GetRejectedPickerList()
  {
    debugger;
    this.WareId = [];
    this.selectedWareHouse.forEach(element => {
      this.WareId.push(element.value);
    }); 
    this.ClustID=[];
    this.SelectedCluster.forEach(element => {
      this.ClustID.push(element.ClusterId);
    });
    if((this.selectedWareHouse==undefined || this.selectedWareHouse.length==0) && this.loadtoast==true)
    {
      this.showError("Please Select WareHouse");
    }
    else if((this.SelectedCluster==undefined || this.SelectedCluster.length==0)&& this.loadtoast==true)
    {
      this.showError("Please Select Cluster");
    }   
    // else if(this.selectDate!=undefined)
    // {
    //   this.showError("select Date range within 31 days");
    // } 
    if(this.selectDate)
    {
      this.date1=this.selectDate[0];
      this.date2=this.selectDate[1];
      
      // var Difference_In_Time = date2.getTime() - date1.getTime();
      if(this.date2==undefined) this.showError("Please Select Two Date")
      var Difference_In_Time=this.date2.getTime()-this.date1.getTime()
      this.Difference_In_Days = Difference_In_Time / (1000 * 3600*24);
    }
    if(this.Difference_In_Days>31)
    {
      this.showError("please select two dates between 31 days");
    }
    if(this.Difference_In_Days<31)
    {
      if( this.selectDate != null)
      {
        this.FromDate=moment(this.selectDate[0]).format('MM/DD/YYYY');
        this.ToDate=moment(this.selectDate[1]).format('MM/DD/YYYY');
      }

      if (this.selectDate!=null && this.selectedWareHouse!=undefined && this.selectDate!=undefined && this.SelectedCluster!= null && this.SelectedCluster!= undefined )
      {
        const payload =
        {
          "warehouselist":this.WareId,
          "clusterId": this.ClustID,
          "fromDate":this.FromDate,
          "toDate":this.ToDate,
          "keyword":this.EnterPN,
          "skip":this.skip,
          "take":this.take,
          "IsCount":false
        }
        this.blocked=true;
        this.pickerservice.GetRejectedPickerList(payload).subscribe(PickerRes=>
        {
          this.blocked=false;
          this.PickerList=PickerRes.RejectedPickerList
          console.log(this.PickerList);          
          this.Totalcount=PickerRes.Totalcount
        })
      } 
    }
    if(this.selectDate==null && this.selectedWareHouse.length>0 && this.selectedWareHouse!=undefined && this.selectDate==undefined && this.SelectedCluster!= null && this.SelectedCluster!= undefined)
    {
      const payload =
      {
        "warehouselist":this.WareId,
        "clusterId": this.ClustID,
        "fromDate":null,
        "toDate":null,
        "keyword":this.EnterPN,
        "skip":this.skip,
        "take":this.take,
        "IsCount":false
      }
      

    //local chalana padegaa phir API  chalegii
    this.blocked=true;
      this.pickerservice.GetRejectedPickerList(payload).subscribe(PickerRes=>
      {    
        this.blocked=false;
        this.PickerList=PickerRes.RejectedPickerList
        this.Totalcount=PickerRes.Totalcount
        console.log(this.PickerList); 
      });
    }
    this.loadtoast=true;
  }

  keyPress(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  ExportF()
  { 
    this.ClustID=[];
    this.SelectedCluster.forEach(element => {
      this.ClustID.push(element.ClusterId);
    });
    if(this.selectDate)
    {
      this.date1=this.selectDate[0];
      this.date2=this.selectDate[1];
      
      // var Difference_In_Time = date2.getTime() - date1.getTime();
      if(this.date2==undefined) this.showError("Please Select Two Date")
      var Difference_In_Time=this.date2.getTime()-this.date1.getTime()
      this.Difference_In_Days = Difference_In_Time / (1000 * 3600*24);
    }
    if(this.selectDate==undefined)
    {
      this.showError("please select date range");
    }
    if(this.Difference_In_Days>31)
    {
      this.showError("please two dates between 31 days")
    }
    if(this.Difference_In_Days<31)
    {
      if( this.selectDate != null)
      {
        this.FromDate=moment(this.selectDate[0]).format('MM/DD/YYYY');
        this.ToDate=moment(this.selectDate[1]).format('MM/DD/YYYY');
      }
      if (this.selectDate!=undefined) {
        if(this.EnterPN!=null && this.selectDate!=null && this.selectedWareHouse!=undefined && this.selectDate!=undefined && this.SelectedCluster!= null && this.SelectedCluster!= undefined  )
        {
          const payload =
          {
            "warehouselist":this.WareId,
            "clusterId": this.ClustID,
            "fromDate":this.FromDate,
            "toDate":this.ToDate,
            "keyword":this.EnterPN,
            "skip":this.skip,
            "take":this.take,
            "IsCount":true
          }
          this.blocked=true;
          this.pickerservice.GetRejectedPickerList(payload).subscribe(res=>
          {
            this.blocked=false;
            var exportData=[];
              for(var i=0; i<res.RejectedPickerList.length; i++){
                var json= {
                PickerNumber:res.RejectedPickerList[i].PickerNumber,
                PickerName:res.RejectedPickerList[i].PickerpersonName,
                WareHouseName:res.RejectedPickerList[i].WarehouseName,
                InventoryChecker:res.RejectedPickerList[i].InventorySupNAme,
                NoofOrders:res.RejectedPickerList[i].NoOfOrders,
                LineItemQuantity:res.RejectedPickerList[i].LineItemQuantity,
                OrderNumber:res.RejectedPickerList[i].OrderNumber,
                TotalOrderValue:res.RejectedPickerList[i].amt,
                CreatedDate:res.RejectedPickerList[i].CreatedDate,
                RejectDateTime:res.RejectedPickerList[i].RejectedDate,
                RejectBy:res.RejectedPickerList[i].RejectedBy
                // Remark:res.RejectedPickerList[i].Remark
              }              
              exportData.push(json);
            } 
                   
            this.exportservice.exportAsExcelFile(exportData," Collection Data") 
            // this.blocked=false;
          })
        }
      }
      if(this.EnterPN==undefined &&this.selectDate!=null && this.selectedWareHouse!=undefined && this.selectDate!=undefined && this.SelectedCluster!= null && this.SelectedCluster!= undefined ) {
        const payload =
        {
          "warehouselist":this.WareId,
          "clusterId": this.ClustID,
          "fromDate":this.FromDate,
          "toDate":this.ToDate,
          "keyword":null,
          "skip":this.skip,
          "take":this.take,
          "IsCount":true
        }
        this.blocked=true;
        this.pickerservice.GetRejectedPickerList(payload).subscribe(res=>
        {
          this.blocked=false;
          var exportData=[];
            for(var i=0; i<res.RejectedPickerList.length; i++){
              var json= {
                PickerNumber:res.RejectedPickerList[i].PickerNumber,
                PickerName:res.RejectedPickerList[i].PickerpersonName,
                WareHouseName:res.RejectedPickerList[i].WarehouseName,
                InventoryChecker:res.RejectedPickerList[i].InventorySupNAme,
                NoofOrders:res.RejectedPickerList[i].NoOfOrders,
                LineItemQuantity:res.RejectedPickerList[i].LineItemQuantity,
                OrderNumber:res.RejectedPickerList[i].OrderNumber,
                TotalOrderValue:res.RejectedPickerList[i].amt,
                CreatedDate:res.RejectedPickerList[i].CreatedDate,
                RejectDateTime:res.RejectedPickerList[i].RejectedDate,
                RejectBy:res.RejectedPickerList[i].RejectedBy
              // Remark:res.RejectedPickerList[i].Remark
            }              
            exportData.push(json);
          }        
          this.exportservice.exportAsExcelFile(exportData," Collection Data") 
          // this.blocked=false;
        })
      }
     }
  }

  openitem(i, e, wareID)
  {
    this.ispopupIdDetail=true
    this.PickerID=i.PickerNumber       
    this.blocked=true;
    this.pickerservice.rejectedPickerdetail(this.PickerID).subscribe(detailres=>
    {
      this.blocked=false;
      this.ClusterName=detailres[0].ClusterName
      this.CreatedDate=detailres[0].CreatedDate
      this.Id=detailres[0].Id
      this.WarehouseName=detailres[0].WarehouseName
      this.createdby=detailres[0].createdby
      this.dboy=detailres[0].dboy
      this.pickerPerson=detailres[0].pickerPerson
    })    
    this.blocked=true;
    this.pickerservice.rejectedPickerdetailList(this.PickerID).subscribe(Listres=>
    {
      this.blocked=false;
      this.Listres=Listres 
      console.log("Listres",this.Listres);      
    })
  }

  historyDetailid : number;
  openHistory(d,e)
  {

    this.historyDetailid  = d.id;
    this.historypopup=true
  }
  
  printV()
  {
    this.historyHide = true;  
  }

  showError(msg1:string){
    this.msg.add({severity:'error', summary: 'Error', detail:msg1});
  }
  showSuccess(msg1:string){
    this.msg.add({severity:'success', summary: 'Success', detail:msg1});
  }
}